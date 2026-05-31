import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { resume } from "../data/resume";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            eyebrow="PORTFOLIO"
            title="Selected"
            highlight="Projects"
            subtitle={resume.projectsIntro}
          />

          <div className="projects-grid">
            {resume.projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`glass rounded-xl p-6 shadow-card hover:shadow-glow transition-all duration-300 flex flex-col${
                  project.highlight ? " project-featured ring-2 ring-primary/60" : ""
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    {project.highlight && project.highlightLabel && (
                      <span className="project-badge">{project.highlightLabel}</span>
                    )}
                    {project.status && !project.highlight && (
                      <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-2">
                        {project.status}
                      </span>
                    )}
                    <h4 className="font-semibold text-lg text-foreground">{project.name}</h4>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground">{project.period}</p>
                </div>

                <p className="text-sm text-primary mb-3">{project.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="skill-tag text-xs py-1 px-3">
                      {tech}
                    </span>
                  ))}
                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium mt-auto"
                  >
                    {project.linkLabel ?? "View Project"} →
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
