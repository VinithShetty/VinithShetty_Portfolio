import { motion } from "framer-motion";
import LiquidEther from "../ui/liquid-ether";
import RotatingText from '../ui/rotating-text';
import CircularText from "../ui/circular-text";
export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-32 pb-20 relative overflow-hidden bg-background">  
      {/* Liquid Ether background effect */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={20}
          cursorSize={120}
          resolution={0.5}
          autoDemo={true}
          autoSpeed={0.4}
          autoIntensity={2.0}
          autoResumeDelay={1500}
          autoRampDuration={0.8}
          style={{ width: '100%', height: '100%', opacity: 0.35 }}
        />
      </div>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 z-[1]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto w-full z-10"
      >
        <span className="block text-accent font-mono text-sm tracking-widest mb-6 uppercase">
          Vinith Shetty
        </span>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[9vw] leading-[0.85] font-black tracking-tighter text-foreground mb-8 w-full"
        >
          DIGITAL
          <br />
           <span
             className="text-6xl font-extrabold text-white tracking-wide"
             style={{ letterSpacing: '0.12em', fontFamily: 'Zen Dots, Montserrat, Poppins, Oswald, sans-serif' }}
           >
             <RotatingText
               texts={["Engineer", "Coding", "Thinking"]}
               mainClassName="inline"
               splitLevelClassName=""
               elementLevelClassName=""
               rotationInterval={2000}
               auto={true}
             />
           </span>
        </motion.h1>

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 mt-12">
          <p className="text-xl md:text-2xl text-muted-foreground max-w-xl font-light leading-relaxed">
            Crafting digital experiences with a focus on typography, 
            editorial layouts, and interactive storytelling.
          </p>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="#work" className="inline-flex items-center justify-center w-40 h-40 rounded-full border border-white/20 bg-background/80 hover:border-accent hover:bg-accent hover:text-background transition-all duration-300 text-sm font-medium tracking-wide relative overflow-hidden shadow-lg z-10">
              <span className="sr-only">VIEW WORK</span>
              <CircularText text="VIEW WORK • VIEW WORK • " spinDuration={12} onHover="speedUp" />
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-6 md:left-12 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-muted-foreground to-transparent" />
        <span className="text-xs text-muted-foreground font-mono rotate-180" style={{ writingMode: 'vertical-rl' }}>SCROLL TO EXPLORE</span>
      </motion.div>
    </section>
  );
}