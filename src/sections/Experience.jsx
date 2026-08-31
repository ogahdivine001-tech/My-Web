import { FiBriefcase, FiBookOpen } from "react-icons/fi";
import RevealOnScroll from "../components/RevealOnScroll";
import { experience } from "../data/experience";

export default function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="section-container">
        <RevealOnScroll>
          <p className="section-eyebrow text-center">Experience &amp; Journey</p>
          <h2 className="section-heading text-center">How I got here</h2>
        </RevealOnScroll>

        <div className="relative mt-14 max-w-2xl mx-auto">
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-accent/30 md:-translate-x-1/2" />

          {experience.map((item, i) => (
            <RevealOnScroll key={item.title} delay={i * 0.1}>
              <div
                className={`relative flex md:justify-center mb-10 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div
                  className={`hidden md:block w-[calc(50%-2rem)] ${
                    i % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
                  }`}
                >
                  <p className="font-mono text-xs text-accent dark:text-accent-light">
                    {item.date}
                  </p>
                </div>

                <div className="absolute left-5 md:left-1/2 -translate-x-1/2 h-9 w-9 rounded-full bg-gradient-to-r from-accent to-coral flex items-center justify-center text-white text-sm z-10">
                  {item.type === "education" ? <FiBookOpen /> : <FiBriefcase />}
                </div>

                <div className="glass-card p-5 ml-16 md:ml-0 md:w-[calc(50%-2rem)]">
                  <p className="font-mono text-xs text-accent dark:text-accent-light md:hidden mb-1">
                    {item.date}
                  </p>
                  <h3 className="font-display font-bold text-base mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-ink-700 dark:text-paper-200">
                    {item.text}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
