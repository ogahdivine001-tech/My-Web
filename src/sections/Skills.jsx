import { FiCode, FiPenTool, FiTrendingUp } from "react-icons/fi";
import RevealOnScroll from "../components/RevealOnScroll";
import { webSkills, designSkills, marketingSkills } from "../data/skills";

const groups = [
  { title: "Web Development", icon: FiCode, items: webSkills },
  { title: "Graphic Design", icon: FiPenTool, items: designSkills },
  { title: "Marketing & Copy", icon: FiTrendingUp, items: marketingSkills },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="section-container">
        <RevealOnScroll>
          <p className="section-eyebrow text-center">Skills</p>
          <h2 className="section-heading text-center">What I bring to the table</h2>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {groups.map(({ title, icon: Icon, items }, i) => (
            <RevealOnScroll key={title} delay={i * 0.1}>
              <div className="glass-card p-7 h-full hover:-translate-y-2 transition-transform duration-300">
                <div className="h-12 w-12 rounded-xl2 bg-gradient-to-r from-accent to-coral flex items-center justify-center text-white text-xl mb-5">
                  <Icon />
                </div>
                <h3 className="font-display font-bold text-lg mb-4">{title}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent dark:text-accent-light"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
