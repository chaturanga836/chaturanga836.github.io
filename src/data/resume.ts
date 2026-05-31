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
  frontend: "hover:border-[#3A8DEF] hover:shadow-[0_0_20px_rgba(58,141,239,0.2)]",
  backend: "hover:border-[#9554c8] hover:shadow-[0_0_20px_rgba(149,84,200,0.2)]",
  cloud: "hover:border-[#FD8D30] hover:shadow-[0_0_20px_rgba(253,141,48,0.2)]",
  data: "hover:border-[#3A8DEF] hover:shadow-[0_0_20px_rgba(58,141,239,0.2)]",
  infrastructure: "hover:border-[#FD8D30] hover:shadow-[0_0_20px_rgba(253,141,48,0.2)]",
  Authentication: "hover:border-[#9554c8] hover:shadow-[0_0_20px_rgba(149,84,200,0.2)]",
  general: "hover:border-[#9554c8] hover:shadow-[0_0_20px_rgba(149,84,200,0.2)]",
};
