import { useEffect, useRef, useState } from "react";
import RevealOnScroll from "../components/RevealOnScroll";
import profilePhoto from "../assets/images/profile-photo.jpg";
import { stats } from "../data/stats";

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const start = performance.now();

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            setCount(Math.round(value * progress));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="section-container">
        <RevealOnScroll>
          <p className="section-eyebrow text-center">About Me</p>
          <h2 className="section-heading text-center">
            The person behind the code
          </h2>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
          <RevealOnScroll>
            <div className="glass-card p-3 max-w-sm mx-auto">
              <img
                src={profilePhoto}
                alt="Ogah Divine Henry"
                className="rounded-xl2 w-full object-cover"
              />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <p className="text-ink-700 dark:text-paper-200 leading-relaxed">
              I'm a creative and motivated web developer and graphic designer
              with hands-on experience building modern websites, creating
              digital graphics, and developing client-focused online
              experiences.
            </p>
            <p className="mt-4 text-ink-700 dark:text-paper-200 leading-relaxed">
              I'm comfortable working with HTML, CSS, JavaScript, React,
              WordPress, and UI/UX design, and I bring a strong interest in
              digital marketing and conversion-focused copywriting to every
              project. My approach blends clean code with thoughtful design,
              solving both the technical and creative sides of a problem
              together.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-10">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-card p-5 text-center">
                  <p className="font-display font-extrabold text-3xl gradient-text">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm text-ink-700 dark:text-paper-200 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="/Ogah_Divine_Henry_CV.pdf"
              download
              className="btn-primary mt-8"
            >
              Download CV
            </a>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
