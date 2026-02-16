import { motion } from "framer-motion";
import { ArrowUpRight, Layout, Smartphone, PenTool, Type } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Layout,
    title: "Web Design",
    description: "Creating immersive web experiences that balance aesthetics with functionality."
  },
  {
    icon: Smartphone,
    title: "App Interface",
    description: "Designing intuitive mobile interfaces focused on user engagement and clarity."
  },
  {
    icon: PenTool,
    title: "Art Direction",
    description: "Curating visual narratives that define brand identity and emotional resonance."
  },
  {
    icon: Type,
    title: "Typography",
    description: "Crafting typographic systems that ensure readability and brand distinctiveness."
  }
];

export default function Services() {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-background border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 md:mb-0">
            EXPERTISE
          </h2>
          <p className="text-muted-foreground max-w-md text-lg">
            A comprehensive suite of design services tailored to elevate brands in the digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-transparent border-white/10 hover:border-accent/50 transition-colors duration-300 h-full group">
                <CardContent className="p-8 flex flex-col h-full justify-between min-h-[300px]">
                  <div>
                    <service.icon className="w-10 h-10 text-accent mb-6 stroke-1" />
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-6 h-6 text-accent" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}