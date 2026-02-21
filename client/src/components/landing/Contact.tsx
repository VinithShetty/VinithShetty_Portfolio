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
import { ArrowRight, Mail, Instagram, Linkedin, Github } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "@/hooks/use-toast";

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
    answer: "Depending on the project, deliverables typically include project proposal, pricing, interactive prototypes and schedule/timeline."
  },
  {
    question: "How long does a typical project take?",
    answer: "Timelines vary by scope. A branding project might take 2-4 weeks, while a full website or app design can take 4-10 weeks."
  }
];

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [notificationType, setNotificationType] = useState<'success' | 'error' | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const formData = new FormData(form);
    try {
      const response = await fetch("https://formspree.io/f/xdaldjkk", {
        method: "POST",
        headers: { 'Accept': 'application/json' },
        body: formData,
      });
      if (response.ok) {
        form.reset();
        setNotification("Thank you for reaching out. I'll get back to you soon.");
        setNotificationType('success');
      } else {
        setNotification("There was a problem sending your message. Please try again later.");
        setNotificationType('error');
      }
    } catch {
      setNotification("There was a problem sending your message. Please try again later.");
      setNotificationType('error');
    }
    setTimeout(() => {
      setNotification(null);
      setNotificationType(null);
    }, 5000);
  };
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
          <div className="bg-secondary/10 p-8 md:p-12 rounded-sm border border-white/5 relative">
            {notification && (
              <div
                className={`absolute left-1/2 -translate-x-1/2 bottom-[-3.5rem] z-50 px-6 py-3 rounded shadow-lg text-base font-medium transition-all duration-300 ${
                  notificationType === 'success'
                    ? 'bg-green-600 text-white'
                    : 'bg-red-700 text-white'
                }`}
                style={{ minWidth: 250, textAlign: 'center' }}
              >
                {notification}
              </div>
            )}
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              LET'S TALK
            </h2>
            <p className="text-muted-foreground mb-8">
              Ready to start your next project? Fill out the form below or email me directly at hello@example.com
            </p>

            <form className="space-y-6" ref={formRef} onSubmit={handleSubmit}>
              {/* Formspree does not require hidden fields for free tier */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <Input name="name" required placeholder="John Doe" className="bg-background/50 border-white/10 h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <Input name="email" required placeholder="john@example.com" type="email" className="bg-background/50 border-white/10 h-12" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Message</label>
                <Textarea name="message" required placeholder="Tell me about your project..." className="bg-background/50 border-white/10 min-h-[150px] resize-none" />
              </div>
              <Button type="submit" size="lg" className="w-full bg-foreground text-background hover:bg-accent hover:text-foreground text-lg h-14 rounded-full mt-4 group">
                Send Message
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground text-sm">© 2026 Digital Designer Portfolio. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://github.com/VinithShetty" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors"><Github className="w-5 h-5" /></a>
            <a href="https://www.instagram.com/vinith_shetty.11/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="https://www.linkedin.com/in/vinith-shetty-451a99250/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="mailto:vinithshetty96@gmail.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}