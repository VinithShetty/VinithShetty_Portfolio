import { motion } from "framer-motion";
import project1 from "../../assets/project1.png";
import project2 from "../../assets/project2.png";
import project3 from "../../assets/project3.png";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    id: 1,
    title: "PEARL REALTY BRANDING",
    category: "Identity",
    image: project1,
    year: "2025",
    link: "https://www.instagram.com/_pearlrealty_/"
  },
  {
    id: 2,
    title: "ASB ENGINEERING WEBSITE",
    category: "Web Design",
    image: project2,
    year: "2025",
    link: "https://asbengineeringservices.com/"
  },
  {
    id: 3,
    title: "SHIROOR MUTH",
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
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="group cursor-pointer"
            >
              {project.link ? (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="block relative overflow-hidden mb-8 rounded-sm">
                  <motion.div 
                    initial={{ scale: 1.2 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" 
                  />
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    src={project.image} 
                    alt={project.title} 
                    className="w-full aspect-video object-cover"
                  />
                </a>
              ) : (
                <div className="relative overflow-hidden mb-8 rounded-sm">
                  <motion.div 
                    initial={{ scale: 1.2 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" 
                  />
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    src={project.image} 
                    alt={project.title} 
                    className="w-full aspect-video object-cover"
                  />
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