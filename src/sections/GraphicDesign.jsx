import { useState } from "react";
import { FiX } from "react-icons/fi";
import RevealOnScroll from "../components/RevealOnScroll";
import { galleryItems } from "../data/gallery";

const images = import.meta.glob("../assets/gallery/*.jpg", {
  eager: true,
  import: "default",
});

const getImage = (name) => images[`../assets/gallery/${name}`];

export default function GraphicDesign() {
  const [active, setActive] = useState(null);

  return (
    <section id="gallery" className="py-24">
      <div className="section-container">
        <RevealOnScroll>
          <p className="section-eyebrow text-center">Graphic Design Showcase</p>
          <h2 className="section-heading text-center">Visual work</h2>
        </RevealOnScroll>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 mt-12 [column-fill:_balance]">
          {galleryItems.map((item, i) => (
            <RevealOnScroll
              key={item.title}
              delay={(i % 3) * 0.08}
              className="mb-6 break-inside-avoid"
            >
              <button
                onClick={() => setActive(item)}
                className="w-full rounded-xl2 relative overflow-hidden group text-left block"
              >
                <img
                  src={getImage(item.image)}
                  alt={item.title}
                  loading="lazy"
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-semibold text-sm">
                    {item.title}
                  </p>
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
            <div
              className="glass-card p-4 max-w-lg w-full text-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close preview"
                className="absolute top-3 right-3 h-9 w-9 rounded-full glass-card flex items-center justify-center z-10"
              >
                <FiX />
              </button>
              <img
                src={getImage(active.image)}
                alt={active.title}
                className="w-full rounded-xl2"
              />
              <h3 className="font-display font-bold text-lg mt-4">
                {active.title}
              </h3>
              <p className="text-sm text-ink-700 dark:text-paper-200">
                {active.category}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
