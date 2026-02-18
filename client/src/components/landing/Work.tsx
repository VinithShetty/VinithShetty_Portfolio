import { motion } from "framer-motion";
import project1 from "../../assets/project1.png";
import project2 from "../../assets/project2.png";
import project3 from "../../assets/project3.png";
import { Badge } from "@/components/ui/badge";


const projects = [
  {
    id: 1,
    title: "PEARL REALTY BRANDING",
    description: "A modern, cohesive brand identity for Pearl Realty, including logo, creative content ideas, and consistent audience engagement to elevate their professional image.",
    category: "Identity",
    image: project1,
    year: "2025",
    link: "https://www.instagram.com/_pearlrealty_/"
  },
  {
    id: 2,
    title: "ASB ENGINEERING WEBSITE",
    description: "A responsive website for ASB Engineering, focused on clear manufacturing service presentation and seamless user experience.",
    category: "Web Design",
    image: project2,
    year: "2025",
    link: "https://asbengineeringservices.com/"
  },
  {
    id: 3,
    title: "SHIROOR MUTH",
    description: "A digital presence for Shiroor Muth, blending tradition with modern web design to connect with a global audience.",
    category: "Web Design",
    image: project3,
    year: "2024",
    link: "https://shiroormatha.org/"
  }
];

export default function Work() {
  return (
    <section id="work" className="py-32 px-6 md:px-12 lg:px-24 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-20 border-b border-white/10 pb-8">
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter">
            SELECTED<br />WORK
          </h2>
          <span className="text-xl text-muted-foreground hidden md:block">(2024 — 2026)</span>
        </div>

        <div className="space-y-32">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="group cursor-pointer"
            >
              {project.link ? (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="block relative overflow-hidden mb-8 rounded-sm group">
                  <motion.div 
                    initial={{ scale: 1.2 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" 
                  />
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: 'circOut' }}
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-video object-cover"
                  />
                  {/* Overlay info on hover */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
                  >
                    <div className="text-center max-w-2xl mx-auto">
                      <h3 className="text-3xl md:text-4xl font-bold mb-2 text-accent" style={{ fontFamily: 'Syne, var(--font-display), sans-serif' }}>{project.title}</h3>
                      <p className="mb-4 text-base md:text-lg text-foreground font-light" style={{ fontFamily: 'Manrope, var(--font-sans), sans-serif' }}>
                        {project.description}
                      </p>
                      <div className="mb-2">
                        <span className="inline-block rounded-full px-4 py-1 border border-white/20 text-muted-foreground font-normal text-base bg-background/40" style={{ fontFamily: 'Manrope, var(--font-sans), sans-serif' }}>{project.category}</span>
                      </div>
                      <span className="text-lg font-mono text-muted-foreground">{project.year}</span>
                    </div>
                  </motion.div>
                </a>
              ) : (
                <div className="relative overflow-hidden mb-8 rounded-sm group">
                  <motion.div 
                    initial={{ scale: 1.2 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" 
                  />
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: 'circOut' }}
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-video object-cover"
                  />
                  {/* Overlay info on hover */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
                  >
                    <div className="text-center">
                      <h3 className="text-3xl md:text-4xl font-bold mb-2 text-accent" style={{ fontFamily: 'Syne, var(--font-display), sans-serif' }}>{project.title}</h3>
                      <div className="mb-2">
                        <span className="inline-block rounded-full px-4 py-1 border border-white/20 text-muted-foreground font-normal text-base bg-background/40" style={{ fontFamily: 'Manrope, var(--font-sans), sans-serif' }}>{project.category}</span>
                      </div>
                      <span className="text-lg font-mono text-muted-foreground">{project.year}</span>
                    </div>
                  </motion.div>
                </div>
              )}
              <div className="flex justify-between items-start border-t border-white/10 pt-6">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="flex gap-3">
                    <Badge variant="outline" className="rounded-full px-4 py-1 border-white/20 text-muted-foreground font-normal">
                      {project.category}
                    </Badge>
                  </div>
                </div>
                <span className="text-xl font-mono text-muted-foreground">{project.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}