import { useEffect, useRef } from "react";
import About from "@/components/site/About";
import Certifications from "@/components/site/Certifications";
import Contact from "@/components/site/Contact";
import Education from "@/components/site/Education";
import Experience from "@/components/site/Experience";
import Focus from "@/components/site/Focus";
import Marquee from "@/components/site/Marquee";
import Projects from "@/components/site/Projects";
import Skills from "@/components/site/Skills";
import { refreshSoon, useScrollAnimations } from "@/lib/motion";

/**
 * Everything below the hero. Loaded as its own chunk (see pages/home.tsx), so the first paint only
 * needs the hero. Scroll animations are wired up here, once these sections exist in the DOM.
 */
export default function BelowFold({ onReady }: { onReady: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  useScrollAnimations(root, true); // sections start off-screen: wire up their animations when the browser is idle

  useEffect(() => {
    onReady();
    refreshSoon(); // section heights are final only now
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={root}>
      <Marquee />
      <About />
      <Focus />
      <Projects />
      <Experience />
      <Education />
      <Skills />
      <Certifications />
      <Contact />
    </div>
  );
}
