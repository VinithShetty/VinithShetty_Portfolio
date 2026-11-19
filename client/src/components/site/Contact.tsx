import { useRef, useState } from "react";
import { profile, socials } from "@/data/profile";
import glow from "@/assets/stock-contact.jpg";
import ArrowButton from "./ArrowButton";
import Photo from "./Photo";
import Words from "./Words";

type Status = { kind: "idle" | "sending" | "ok" | "error"; msg?: string };

const field =
  "w-full rounded-2xl border border-white/20 bg-white/5 px-5 py-4 text-paper placeholder:text-paper/40 transition-colors focus:border-lime focus:outline-none";

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  // Same Formspree integration as the previous portfolio.
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;
    setStatus({ kind: "sending" });
    try {
      const res = await fetch(profile.formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form.current),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.current.reset();
      setStatus({ kind: "ok", msg: "Thank you for reaching out. I'll get back to you soon." });
    } catch {
      setStatus({ kind: "error", msg: `Something went wrong sending your message. Please try again, or email ${profile.email} directly.` });
    }
  };

  return (
    <section id="contact" data-native-cursor className="px-3 pb-3 md:px-6 md:pb-6">
      <div className="on-dark grain relative mx-auto max-w-[1500px] overflow-hidden rounded-[32px] bg-ink px-5 py-20 text-paper md:px-14 md:py-28">
        {/* Ambient glow: a soft lime light that drifts slowly as the panel scrolls past */}
        <div aria-hidden="true" data-depth="14" className="pointer-events-none absolute -right-40 -top-48 h-[36rem] w-[36rem] rounded-full bg-lime/[0.07] blur-3xl" />
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p data-reveal className="pill-tag label !border-white/20 !bg-white/10 text-paper">Contact</p>
            <Words as="h2" text="Let’s build something intelligent." className="display-lg mt-6 block" />
            <p data-reveal className="mt-8 max-w-md text-lg leading-relaxed text-paper/70">
              Hiring, collaborating or have a product in mind? Send a message or write to me directly.
            </p>

            <div data-reveal className="mt-8">
              <ArrowButton href={`mailto:${profile.email}`}>{profile.email}</ArrowButton>
            </div>

            <ul data-reveal className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-u text-lg">
                    {s.label}<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6">
          <form data-reveal ref={form} onSubmit={submit} className="space-y-5" aria-describedby="form-status">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="c-name" className="label mb-2 block text-paper/60">Name</label>
                <input id="c-name" name="name" required autoComplete="name" placeholder="Your name" className={field} />
              </div>
              <div>
                <label htmlFor="c-email" className="label mb-2 block text-paper/60">Email</label>
                <input id="c-email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={field} />
              </div>
            </div>
            <div>
              <label htmlFor="c-msg" className="label mb-2 block text-paper/60">Message</label>
              <textarea id="c-msg" name="message" required rows={6} placeholder="Tell me about the role or project…" className={`${field} resize-none`} />
            </div>
            {/* Honeypot (Formspree ignores submissions that fill this) */}
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <div className="flex flex-wrap items-center gap-5">
              <ArrowButton type="submit" disabled={status.kind === "sending"}>
                {status.kind === "sending" ? "Sending…" : "Send message"}
              </ArrowButton>
              <p
                id="form-status"
                role="status"
                aria-live="polite"
                className={`text-sm ${status.kind === "error" ? "text-[#ffb4a8]" : "text-lime"}`}
              >
                {status.msg}
              </p>
            </div>
          </form>
          <Photo src={glow} alt="Laptop opening in a dark room, lit by a soft glow" className="mt-10 hidden aspect-[16/7] lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
