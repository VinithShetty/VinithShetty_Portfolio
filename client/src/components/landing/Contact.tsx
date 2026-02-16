import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Instagram, Linkedin, Twitter } from "lucide-react";

const faqs = [
  {
    question: "What is your design process?",
    answer: "My process is deeply collaborative and iterative. It begins with discovery and strategy, moves into wireframing and visual exploration, and concludes with polished execution and development handoff."
  },
  {
    question: "Do you work with startups?",
    answer: "Yes, I love working with ambitious startups to help define their visual identity and product experience from the ground up."
  },
  {
    question: "What are your deliverables?",
    answer: "Depending on the project, deliverables typically include brand guidelines, UI kits, high-fidelity mockups, and interactive prototypes."
  },
  {
    question: "How long does a typical project take?",
    answer: "Timelines vary by scope. A branding project might take 2-4 weeks, while a full website or app design can take 4-10 weeks."
  }
];

export default function Contact() {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-background relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* FAQ Column */}
          <div>
            <span className="text-accent font-mono text-sm tracking-widest mb-6 block uppercase">Common Questions</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-12">
              FAQ
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
                  <AccordionTrigger className="text-xl hover:text-accent hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-lg leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contact Form Column */}
          <div className="bg-secondary/10 p-8 md:p-12 rounded-sm border border-white/5">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              LET'S TALK
            </h2>
            <p className="text-muted-foreground mb-8">
              Ready to start your next project? Fill out the form below or email me directly at hello@example.com
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <Input placeholder="John Doe" className="bg-background/50 border-white/10 h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <Input placeholder="john@example.com" type="email" className="bg-background/50 border-white/10 h-12" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Message</label>
                <Textarea placeholder="Tell me about your project..." className="bg-background/50 border-white/10 min-h-[150px] resize-none" />
              </div>

              <Button size="lg" className="w-full bg-foreground text-background hover:bg-accent hover:text-foreground text-lg h-14 rounded-full mt-4 group">
                Send Message
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground text-sm">© 2026 Digital Designer Portfolio. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}