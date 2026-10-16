// Single source of truth for identity, navigation and social links.
export const profile = {
  name: "Vinith Shetty",
  role: "AI Engineer & Full-Stack Developer",
  email: "vinithshetty96@gmail.com",
  /** PDF served from client/public. Replace the file (keep the name) to update the download. */
  resume: { url: "/Vinith-Shetty-Resume.pdf", filename: "Vinith-Shetty-Resume.pdf" },
  formEndpoint: "https://formspree.io/f/xdaldjkk",
};

export const socials = [
  { label: "GitHub", href: "https://github.com/VinithShetty" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/vinith-shetty-451a99250/" },
  { label: "Instagram", href: "https://www.instagram.com/vinith_shetty.11/" },
];

// `id` must match the section id on the page. Sections whose data file is empty
// are dropped from the nav automatically (see lib/sections.ts).
export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];
