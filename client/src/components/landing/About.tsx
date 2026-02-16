import { motion } from "framer-motion";
import profileImg from "../../assets/profile.png";

const stats = [
  { value: "08", label: "YEARS EXPERIENCE" },
  { value: "40+", label: "PROJECTS COMPLETED" },
  { value: "12", label: "AWARDS WON" },
  { value: "100%", label: "CLIENT SATISFACTION" }
];

export default function About() {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-secondary/20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-accent/10 translate-x-4 translate-y-4 rounded-sm" />
            <img 
              src={profileImg} 
              alt="Profile" 
              className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-700 rounded-sm relative z-10"
            />
          </motion.div>

          <div>
            <span className="text-accent font-mono text-sm tracking-widest mb-6 block uppercase">About Me</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 leading-tight">
              DESIGNING WITH <br />
              <span className="text-muted-foreground">PURPOSE & PASSION</span>
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground font-light mb-12">
              <p>
                I am a multidisciplinary digital designer focused on creating meaningful experiences through clean aesthetics and strategic thinking. My work bridges the gap between functional utility and emotional connection.
              </p>
              <p>
                With a background in both graphic design and frontend development, I approach every project with a holistic perspective, ensuring that the visual language speaks clearly while the interaction feels seamless.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-y-12 gap-x-8 border-t border-white/10 pt-12">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                >
                  <h4 className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</h4>
                  <p className="text-xs font-mono tracking-widest text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}