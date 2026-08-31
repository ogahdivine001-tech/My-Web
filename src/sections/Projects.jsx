import { useState } from "react";
import { FiExternalLink, FiGithub, FiImage } from "react-icons/fi";
import RevealOnScroll from "../components/RevealOnScroll";
import { projects } from "../data/projects";

const imageFiles = import.meta.glob("../assets/images/*.jpg", {
  eager: true,
  import: "default",
});
const galleryFiles = import.meta.glob("../assets/gallery/*.jpg", {
  eager: true,
  import: "default",
});

const getImage = (project) => {
  const folder = project.imageFolder === "gallery" ? galleryFiles : imageFiles;
  const base =
    project.imageFolder === "gallery"
      ? "../assets/gallery/"
      : "../assets/images/";
  return folder[`${base}${project.image}`];
};

const categories = [
  "All",
  "Web Development",
  "UI/UX",
  "Graphic Design",
  "Branding",
];

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24">
      <div className="section-container">
        <RevealOnScroll>
          <p className="section-eyebrow text-center">Featured Projects</p>
          <h2 className="section-heading text-center">Recent work</h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  filter === cat
                    ? "bg-gradient-to-r from-accent to-coral text-white"
                    : "glass-card hover:-translate-y-0.5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {filtered.length === 0 ? (
          <p className="text-center mt-12 text-ink-700 dark:text-paper-200">
            No projects in this category yet, check back soon.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {filtered.map((project, i) => (
              <RevealOnScroll key={project.id} delay={(i % 3) * 0.1}>
                <div className="glass-card overflow-hidden group h-full flex flex-col hover:-translate-y-2 transition-transform duration-300">
                  <div className="overflow-hidden">
                    <img
                      src={getImage(project)}
                      alt={`${project.title} preview`}
                      loading="lazy"
                      className="w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="section-eyebrow">{project.category}</p>
                    <h3 className="font-display font-bold text-lg mt-2 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-ink-700 dark:text-paper-200 flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-mono px-2 py-1 rounded-md bg-accent/10 text-accent dark:text-accent-light"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    {(project.live || project.source) && (
                      <div className="flex gap-3 mt-5">
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 text-center text-sm font-semibold px-4 py-2.5 rounded-full bg-gradient-to-r from-accent to-coral text-white flex items-center justify-center gap-2"
                          >
                            <FiExternalLink /> Live Demo
                          </a>
                        )}
                        {project.source && (
                          <a
                            href={project.source}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Source code"
                            className="h-10 w-10 rounded-full glass-card flex items-center justify-center flex-shrink-0"
                          >
                            <FiGithub />
                          </a>
                        )}
                      </div>
                    )}
                    {!project.live && !project.source && (
                      <div className="flex items-center gap-2 mt-5 text-sm font-semibold text-accent dark:text-accent-light">
                        <FiImage /> Design Work
                      </div>
                    )}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
