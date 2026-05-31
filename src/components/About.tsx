import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { resume } from "../data/resume";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { about } = resume;

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-sm font-mono text-primary mb-4">ABOUT ME</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-8">
            {about.titlePrefix}{" "}
            <span className="text-gradient">{about.titleHighlight}</span>{" "}
            {about.titleSuffix}
          </h3>

          <div className="glass rounded-2xl p-8 md:p-12 shadow-card">
            {about.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className={`text-lg text-muted-foreground leading-relaxed${i > 0 ? " mt-6" : ""}`}
              >
                {paragraph}
              </p>
            ))}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-10 border-t border-border">
              {about.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold text-gradient">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
