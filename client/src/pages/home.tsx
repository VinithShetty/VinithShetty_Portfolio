import { lazy, Suspense, useEffect, useState } from "react";
import Footer from "@/components/site/Footer";
import Hero from "@/components/site/Hero";
import Loader from "@/components/site/Loader";
import Navbar from "@/components/site/Navbar";
import ScrollProgress from "@/components/site/ScrollProgress";
import { whenGone } from "@/lib/loader";
import { initMagnetic } from "@/lib/magnetic";
import { scrollToId } from "@/lib/smooth-scroll";

// Everything below the hero is a separate chunk. Starting the import at module load means it
// downloads in parallel with the hero while the loading screen is up.
const loadBelowFold = () => import("@/components/site/BelowFold");
const BelowFold = lazy(loadBelowFold);
loadBelowFold();

export default function Home() {
  const [belowReady, setBelowReady] = useState(false);

  useEffect(() => initMagnetic(), []);

  // Deep links (/#projects): the sections are lazy-loaded, so jump once the loader has lifted.
  useEffect(() => {
    if (!belowReady) return;
    whenGone.then(() => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id) setTimeout(() => scrollToId(id), 150);
    });
  }, [belowReady]);

  return (
    <div>
      <Loader />
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper">
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar ready={belowReady} />
      <main>
        <Hero />
        <Suspense fallback={<div aria-hidden="true" style={{ minHeight: "100vh" }} />}>
          <BelowFold onReady={() => setBelowReady(true)} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
