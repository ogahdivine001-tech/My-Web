import { useState } from "react";
import { FiX, FiPlus } from "react-icons/fi";
import RevealOnScroll from "../components/RevealOnScroll";
import { galleryItems } from "../data/gallery";

export default function GraphicDesign() {
  const [active, setActive] = useState(null);

  return (
    <section id="gallery" className="py-24">
      <div className="section-container">
        <RevealOnScroll>
          <p className="section-eyebrow text-center">Graphic Design Showcase</p>
          <h2 className="section-heading text-center">Visual work</h2>
          <p className="text-center text-sm text-ink-700 dark:text-paper-200 max-w-xl mx-auto -mt-2">
            Placeholder tiles, ready for real design samples to be dropped in.
          </p>
        </RevealOnScroll>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 mt-12 [column-fill:_balance]">
          {galleryItems.map((item, i) => (
            <RevealOnScroll key={item.title} delay={(i % 3) * 0.08} className="mb-6 break-inside-avoid">
              <button
                onClick={() => setActive(item)}
                className={`w-full aspect-[4/5] rounded-xl2 bg-gradient-to-br ${item.gradient} relative overflow-hidden group text-left`}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/90 gap-2">
                  <FiPlus className="text-3xl" />
                  <span className="text-xs font-mono uppercase tracking-wider">
                    Add sample
                  </span>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-4 bg-black/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-semibold text-sm">{item.title}</p>
                  <p className="text-white/80 text-xs">{item.category}</p>
                </div>
              </button>
            </RevealOnScroll>
          ))}
        </div>

        {active && (
          <div
            className="fixed inset-0 z-[60] bg-ink-950/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setActive(null)}
          >
            <div className="glass-card p-8 max-w-md text-center relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setActive(null)}
                aria-label="Close preview"
                className="absolute top-4 right-4 h-9 w-9 rounded-full glass-card flex items-center justify-center"
              >
                <FiX />
              </button>
              <div className={`w-full aspect-square rounded-xl2 bg-gradient-to-br ${active.gradient} mb-5`} />
              <h3 className="font-display font-bold text-lg">{active.title}</h3>
              <p className="text-sm text-ink-700 dark:text-paper-200">{active.category}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
