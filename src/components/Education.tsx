import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { resume } from "../data/resume";
import SectionHeading from "./SectionHeading";

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { education } = resume;

  return (
    <section id="education" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            eyebrow="EDUCATION"
            title="Academic"
            highlight="Background"
          />

          <div className="max-w-2xl mx-auto space-y-6">
            {education.map((entry, i) => (
              <motion.div
                key={`${entry.degree}-${entry.school}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="glass rounded-2xl p-8 shadow-card hover:shadow-glow transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-primary">
                    <GraduationCap size={28} className="text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-foreground mb-1">
                      {entry.degree}
                    </h4>
                    <p className="text-lg text-primary mb-1">{entry.school}</p>
                    <p className="text-sm font-mono text-muted-foreground mb-4">
                      {entry.period}
                    </p>
                    <div className="inline-block px-4 py-2 rounded-full bg-secondary text-sm font-medium text-secondary-foreground">
                      {entry.honors}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
