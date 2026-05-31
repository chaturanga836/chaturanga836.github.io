import { Github, Heart, Linkedin, Mail } from "lucide-react";
import { resume } from "../data/resume";

export default function Footer() {
  const year = new Date().getFullYear();
  const { profile } = resume;

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} className="text-muted-foreground hover:text-foreground transition-colors" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} className="text-muted-foreground hover:text-foreground transition-colors" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Email"
            >
              <Mail size={20} className="text-muted-foreground hover:text-foreground transition-colors" />
            </a>
          </div>

          <p className="text-sm text-muted-foreground flex items-center gap-1">
            © {year} {profile.firstName} {profile.lastName}. Built with{" "}
            <Heart size={14} className="text-primary fill-primary" /> using React
          </p>
        </div>
      </div>
    </footer>
  );
}
