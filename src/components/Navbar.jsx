import { useState } from "react";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { useTheme } from "../hooks/useTheme";
import { useActiveSection } from "../hooks/useActiveSection";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "gallery", label: "Design" },
  { id: "experience", label: "Journey" },
  { id: "testimonials", label: "Reviews" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const active = useActiveSection(links.map((l) => l.id));

  const handleClick = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="section-container mt-4">
        <nav className="glass-card flex items-center justify-between px-5 py-3">
          <button
            onClick={() => handleClick("home")}
            className="font-display font-extrabold text-lg"
          >
            Ogah<span className="gradient-text"> Divine</span>
          </button>

          <ul className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleClick(link.id)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                    active === link.id
                      ? "bg-gradient-to-r from-accent to-coral text-white"
                      : "hover:bg-accent/10"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="h-10 w-10 rounded-full glass-card flex items-center justify-center"
            >
              {theme === "dark" ? <FiSun /> : <FiMoon />}
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              className="h-10 w-10 rounded-full glass-card flex items-center justify-center lg:hidden"
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="glass-card mt-2 p-3 lg:hidden">
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleClick(link.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      active === link.id
                        ? "bg-gradient-to-r from-accent to-coral text-white"
                        : "hover:bg-accent/10"
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
