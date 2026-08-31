import { useState } from "react";
import { FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import RevealOnScroll from "../components/RevealOnScroll";
import { testimonials } from "../data/testimonials";

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const current = testimonials[index];

  return (
    <section id="testimonials" className="py-24">
      <div className="section-container">
        <RevealOnScroll>
          <p className="section-eyebrow text-center">Testimonials</p>
          <h2 className="section-heading text-center">What clients say</h2>
        </RevealOnScroll>

        <div className="max-w-2xl mx-auto mt-12 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-8 md:p-10 text-center"
            >
              <div className="flex justify-center gap-1 mb-4 text-accent dark:text-accent-light">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <FiStar key={i} className="fill-current" />
                ))}
              </div>
              <p className="text-lg italic text-ink-700 dark:text-paper-200">
                "{current.quote}"
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="h-11 w-11 rounded-full bg-gradient-to-r from-accent to-coral flex items-center justify-center text-white font-bold">
                  {current.name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm">{current.name}</p>
                  <p className="text-xs text-ink-700 dark:text-paper-200">
                    {current.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="h-10 w-10 rounded-full glass-card flex items-center justify-center"
            >
              <FiChevronLeft />
            </button>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-accent" : "w-2.5 bg-accent/30"
                }`}
              />
            ))}
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="h-10 w-10 rounded-full glass-card flex items-center justify-center"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
