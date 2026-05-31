import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { resume } from "../data/resume";

const { profile } = resume;

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                          linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden shadow-glow animate-float">
              <img
                src={profile.photo}
                alt={`${profile.firstName} ${profile.lastName}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 scale-110" />
          </motion.div>

          <div className="text-center lg:text-left max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary font-mono text-sm mb-4"
            >
              Hello, I&apos;m
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
            >
              <span className="text-gradient">{profile.firstName}</span>
              <br />
              <span className="text-foreground">{profile.lastName}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8 font-light"
            >
              {profile.title}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground mb-8"
            >
              <span className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                {profile.location}
              </span>
              <span className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                {profile.email}
              </span>
              <span className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                {profile.phone}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-4"
            >
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg glass hover:shadow-glow hover:border-primary/50 transition-all duration-300"
              >
                <Github size={24} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg glass hover:shadow-glow hover:border-primary/50 transition-all duration-300"
              >
                <Linkedin size={24} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="px-6 py-3 rounded-lg bg-gradient-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                Get In Touch
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center p-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
}
