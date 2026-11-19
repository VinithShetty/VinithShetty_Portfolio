import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  /** prefers-reduced-motion: render one still frame, no animation loop, no pointer response */
  reduced: boolean;
  /** weaker devices / phones: fewer particles, lower pixel ratio, no antialiasing */
  lite: boolean;
  onReady: () => void;
};

const INK = 0x131313;
const LIME = 0xcdfb56;

/**
 * Decorative hero visual: a network-sphere "model" (nodes + edges around a solid core), two thin orbit
 * rings and a depth field of particles. It sits BEHIND the hero HTML (pointer-events none, aria-hidden), so
 * the heading, copy and buttons stay normal, selectable DOM. It responds to the pointer (camera parallax,
 * layers at different depths) and to page scroll progress (the model turns as you read down the page) but
 * never controls scrolling. Rendering pauses when it is off-screen or the tab is hidden, the pixel ratio is
 * capped, and everything is disposed on unmount. If WebGL is unavailable the component renders nothing and
 * the static SVG rings in Hero.tsx remain.
 */
export default function HeroScene({ reduced, lite, onReady }: Props) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    // Probe quietly first: without WebGL we simply render nothing (no console noise) and the static SVG stays.
    const canvas = document.createElement("canvas");
    const attrs: WebGLContextAttributes = { antialias: !lite, alpha: true, powerPreference: "low-power" };
    const gl = (canvas.getContext("webgl2", attrs) || canvas.getContext("webgl", attrs)) as WebGL2RenderingContext | WebGLRenderingContext | null;
    if (!gl) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, context: gl, antialias: !lite, alpha: true, powerPreference: "low-power" });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lite ? 1.25 : 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.cssText = "display:block;width:100%;height:100%";
    el.appendChild(renderer.domElement);

    const disposables: { dispose(): void }[] = [];
    const own = <T extends { dispose(): void }>(o: T) => (disposables.push(o), o);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 60);
    camera.position.set(0, 0, 8);

    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(4, 5, 6);
    scene.add(key);
    const rim = new THREE.PointLight(LIME, 16, 12);
    rim.position.set(-3, -2, 3);
    scene.add(rim);

    // ---- model: network shell + solid core -------------------------------------------------------
    const model = new THREE.Group();
    scene.add(model);

    const shellGeo = own(new THREE.IcosahedronGeometry(1.7, 1));
    model.add(new THREE.LineSegments(own(new THREE.EdgesGeometry(shellGeo)), own(new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 0.32 }))));

    const position = shellGeo.getAttribute("position");
    const seen = new Set<string>();
    const verts: THREE.Vector3[] = [];
    for (let i = 0; i < position.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(position, i);
      const k = `${v.x.toFixed(3)},${v.y.toFixed(3)},${v.z.toFixed(3)}`;
      if (!seen.has(k)) { seen.add(k); verts.push(v); }
    }
    const nodeGeo = own(new THREE.SphereGeometry(0.034, 12, 12));
    const nodes = new THREE.InstancedMesh(nodeGeo, own(new THREE.MeshBasicMaterial({ color: INK })), verts.length);
    const accents = verts.filter((_, i) => i % 4 === 0);
    const accentNodes = new THREE.InstancedMesh(nodeGeo, own(new THREE.MeshBasicMaterial({ color: LIME })), accents.length);
    const m = new THREE.Matrix4();
    verts.forEach((v, i) => { m.makeTranslation(v.x, v.y, v.z); nodes.setMatrixAt(i, m); });
    accents.forEach((v, i) => { m.makeScale(1.7, 1.7, 1.7).setPosition(v.x * 1.002, v.y * 1.002, v.z * 1.002); accentNodes.setMatrixAt(i, m); });
    model.add(nodes, accentNodes);

    const coreGeo = own(new THREE.IcosahedronGeometry(0.8, 0));
    model.add(new THREE.Mesh(coreGeo, own(new THREE.MeshStandardMaterial({ color: INK, roughness: 0.32, metalness: 0.4, flatShading: true }))));
    const coreEdges = new THREE.LineSegments(own(new THREE.EdgesGeometry(coreGeo)), own(new THREE.LineBasicMaterial({ color: LIME })));
    coreEdges.scale.setScalar(1.012);
    model.add(coreEdges);

    // ---- orbit rings + a lime satellite ----------------------------------------------------------
    const ringMat = own(new THREE.MeshBasicMaterial({ color: INK, transparent: true, opacity: 0.22 }));
    const ringA = new THREE.Mesh(own(new THREE.TorusGeometry(2.25, 0.006, 6, 140)), ringMat);
    const ringB = new THREE.Mesh(own(new THREE.TorusGeometry(2.7, 0.006, 6, 160)), ringMat);
    ringA.rotation.set(Math.PI / 2.3, 0.2, 0);
    ringB.rotation.set(Math.PI / 3, -0.5, 0.4);
    const satellite = new THREE.Mesh(own(new THREE.SphereGeometry(0.09, 16, 16)), own(new THREE.MeshBasicMaterial({ color: LIME })));
    ringA.add(satellite);
    model.add(ringA, ringB);

    // ---- particle field: two layers so they parallax at different speeds ----------------------------
    const makeField = (count: number, r0: number, r1: number, size: number, color: number, opacity: number) => {
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = r0 + Math.random() * (r1 - r0);
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        arr.set([r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th), r * Math.cos(ph)], i * 3);
      }
      const g = own(new THREE.BufferGeometry());
      g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
      return new THREE.Points(g, own(new THREE.PointsMaterial({ color, size, transparent: true, opacity, sizeAttenuation: true })));
    };
    const farField = makeField(lite ? 110 : 260, 4, 9, 0.035, INK, 0.38);
    const nearField = makeField(lite ? 14 : 34, 3, 6, 0.06, LIME, 0.95);
    scene.add(farField, nearField);

    // ---- layout (reserve the host's size; no layout shift) -----------------------------------------
    let wide = true;
    const layout = () => {
      const w = Math.max(1, el.clientWidth);
      const h = Math.max(1, el.clientHeight);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const vh = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      const vw = vh * camera.aspect;
      wide = camera.aspect > 1.15;
      model.scale.setScalar(wide ? Math.min(1.35, vh / 4.2) : 0.62); // large on desktop: it frames the portrait
      model.position.set(wide ? vw * 0.22 : 0, wide ? -vh * 0.02 : -vh * 0.27, 0); // narrow screens: behind the portrait, below the text
    };

    // ---- pointer + scroll inputs (read in the loop; no React state) ----------------------------------
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    let maxScroll = 1;
    const measure = () => { maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight); };

    const clock = new THREE.Clock();
    const frame = () => {
      const t = clock.getElapsedTime();
      const sp = Math.min(1, window.scrollY / maxScroll);
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      model.rotation.y = t * 0.14 + sp * Math.PI * 1.6;
      model.rotation.x = Math.sin(t * 0.23) * 0.14 + sp * 0.9;
      ringA.rotation.z = t * 0.12;
      ringB.rotation.z = -t * 0.08;
      satellite.position.set(Math.cos(t * 0.7) * 2.25, Math.sin(t * 0.7) * 2.25, 0);
      farField.rotation.y = t * 0.012 + sp * 0.4;
      nearField.rotation.y = -t * 0.02 - sp * 0.9;

      camera.position.x = mouse.x * 0.55;
      camera.position.y = -mouse.y * 0.35;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };

    // ---- run control: only while visible, in a visible tab, and when motion is allowed ----------------
    let raf = 0;
    let inView = true;
    const loop = () => { frame(); raf = requestAnimationFrame(loop); };
    const sync = () => {
      const run = inView && !document.hidden && !reduced;
      if (run && !raf) { clock.start(); raf = requestAnimationFrame(loop); }
      if (!run && raf) { cancelAnimationFrame(raf); raf = 0; }
    };
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; sync(); });
    const ro = new ResizeObserver(() => { layout(); if (!raf) frame(); });
    const docRo = new ResizeObserver(measure);
    const lost = (e: Event) => { e.preventDefault(); inView = false; sync(); };

    layout();
    measure();
    frame(); // first frame immediately (also the only frame under reduced motion)
    onReady();
    io.observe(el);
    ro.observe(el);
    docRo.observe(document.body);
    document.addEventListener("visibilitychange", sync);
    renderer.domElement.addEventListener("webglcontextlost", lost);
    if (!reduced) window.addEventListener("pointermove", onPointer, { passive: true });
    sync();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect(); ro.disconnect(); docRo.disconnect();
      document.removeEventListener("visibilitychange", sync);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      window.removeEventListener("pointermove", onPointer);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [reduced, lite, onReady]);

  return <div ref={host} className="absolute inset-0" />;
}
