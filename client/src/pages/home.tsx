import { useEffect, useRef } from "react";
import About from "@/components/site/About";
import Certifications from "@/components/site/Certifications";
import Contact from "@/components/site/Contact";
import Education from "@/components/site/Education";
import Experience from "@/components/site/Experience";
import Focus from "@/components/site/Focus";
import Footer from "@/components/site/Footer";
import Hero from "@/components/site/Hero";
import Marquee from "@/components/site/Marquee";
import Navbar from "@/components/site/Navbar";
import Projects from "@/components/site/Projects";
import Skills from "@/components/site/Skills";
import { useScrollAnimations } from "@/lib/motion";
import { initSmoothScroll } from "@/lib/smooth-scroll";

export default function Home() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => initSmoothScroll(), []);
  useScrollAnimations(root);

  return (
    <div ref={root}>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper">
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Focus />
        <Projects />
        <Experience />
        <Education />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
