import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import About from "@/components/landing/About";
import Work from "@/components/landing/Work";
import Contact from "@/components/landing/Contact";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-background min-h-screen font-sans selection:bg-accent selection:text-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation (Simple) */}
      <nav className="fixed top-0 left-0 right-0 p-6 md:p-8 flex justify-between items-center z-40 mix-blend-difference text-white">
        <a href="#" className="text-xl font-bold tracking-tighter">VS.Design</a>
        <a href="#contact" className="hidden md:inline-block text-sm font-medium hover:text-accent transition-colors">
          AVAILABLE FOR FREELANCE
        </a>
      </nav>

      <main>
        <Hero />
        <Services />
        <About />
        <Work />
        <section id="contact">
          <Contact />
        </section>
      </main>
    </div>
  );
}