import * as FiIcons from "react-icons/fi";
import RevealOnScroll from "../components/RevealOnScroll";
import { services } from "../data/services";

export default function Services() {
  return (
    <section id="services" className="py-24">
      <div className="section-container">
        <RevealOnScroll>
          <p className="section-eyebrow text-center">Services</p>
          <h2 className="section-heading text-center">How I can help</h2>
        </RevealOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {services.map((service, i) => {
            const Icon = FiIcons[service.icon] || FiIcons.FiStar;
            return (
              <RevealOnScroll key={service.title} delay={(i % 4) * 0.08}>
                <div className="glass-card p-6 h-full group hover:-translate-y-2 transition-transform duration-300">
                  <div className="h-11 w-11 rounded-xl2 bg-accent/10 text-accent dark:text-accent-light flex items-center justify-center text-lg mb-4 group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-coral group-hover:text-white transition-all duration-300">
                    <Icon />
                  </div>
                  <h3 className="font-display font-bold text-base mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-ink-700 dark:text-paper-200 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
