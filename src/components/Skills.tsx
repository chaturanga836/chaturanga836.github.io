import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { resume, skillCategoryStyles } from "../data/resume";
import SectionHeading from "./SectionHeading";

const legend = [
  { color: "#3A8DEF", label: "Frontend / Data" },
  { color: "#9554c8", label: "Backend" },
  { color: "#FD8D30", label: "Cloud / Infra" },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            eyebrow="EXPERTISE"
            title="Technologies &"
            highlight="Skills"
          />

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {resume.skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`skill-tag ${skillCategoryStyles[skill.category] ?? skillCategoryStyles.general} cursor-default`}
              >
                {skill.name}
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-muted-foreground">
            {legend.map(({ color, label }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
