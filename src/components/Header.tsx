import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, resume } from "../data/resume";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-card py-4" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <a href="#" className="text-xl font-bold">
            <span className="text-gradient">BC</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
            <a
              href={`mailto:${resume.profile.email}`}
              className="px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Contact
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden mt-4 pb-4 border-t border-border pt-4"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors py-2"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={`mailto:${resume.profile.email}`}
                  className="px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity text-center"
                >
                  Contact
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
