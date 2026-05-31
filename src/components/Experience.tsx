import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase } from "lucide-react";
import { resume } from "../data/resume";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            eyebrow="CAREER"
            title="Professional"
            highlight="Experience"
          />

          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            {resume.experience.map((job, i) => (
              <motion.div
                key={`${job.title}-${job.company}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative pl-12 md:pl-0 pb-12 last:pb-0 ${
                  i % 2 === 0 ? "md:pr-[calc(50%+2rem)]" : "md:pl-[calc(50%+2rem)]"
                }`}
              >
                <div className="absolute left-[0.8125rem] md:left-1/2 top-1 md:-translate-x-1/2">
                  <div className="timeline-dot" />
                </div>

                <div className="glass rounded-xl p-6 shadow-card hover:shadow-glow transition-shadow duration-300">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-secondary">
                      <Briefcase size={18} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{job.title}</h4>
                      <p className="text-sm text-primary">{job.company}</p>
                      {job.location && (
                        <p className="text-xs text-muted-foreground">{job.location}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground mb-3">{job.period}</p>
                  <p className="text-sm text-muted-foreground">{job.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
