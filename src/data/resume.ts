import resumeJson from "../../content/resume.json";
import type { Resume } from "./types";

export const resume = resumeJson as Resume;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
];

export const skillCategoryStyles: Record<string, string> = {
  frontend: "hover:border-primary hover:shadow-[0_0_20px_hsl(187_85%_53%/0.2)]",
  backend: "hover:border-accent hover:shadow-[0_0_20px_hsl(262_83%_58%/0.2)]",
  cloud: "hover:border-orange-400 hover:shadow-[0_0_20px_rgba(251,146,60,0.2)]",
  data: "hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.2)]",
  general: "hover:border-primary hover:shadow-[0_0_20px_hsl(187_85%_53%/0.2)]",
};
