import { FiGithub, FiInstagram, FiTwitter } from "react-icons/fi";

const links = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

const socials = [
  { icon: FiGithub, href: "https://github.com/ogahdivine001-tech", label: "GitHub" },
  { icon: FiInstagram, href: "https://www.instagram.com/ogahdivine2008/?hl=en", label: "Instagram" },
  { icon: FiTwitter, href: "https://x.com/DivineOgah2008", label: "X" },
];

export default function Footer() {
  const handleClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="py-12 border-t border-accent/10">
      <div className="section-container flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-display font-extrabold text-lg">
            Ogah<span className="gradient-text"> Divine</span>
          </p>
          <p className="text-sm text-ink-700 dark:text-paper-200 mt-1 max-w-xs">
            Building modern digital experiences through creative design and
            clean code.
          </p>
        </div>

        <ul className="flex flex-wrap justify-center gap-5">
          {links.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleClick(link.id)}
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex gap-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="h-10 w-10 rounded-full glass-card flex items-center justify-center hover:-translate-y-1 transition-transform duration-300"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-ink-700 dark:text-paper-200 mt-8">
        &copy; {new Date().getFullYear()} Ogah Divine Henry. All rights reserved.
      </p>
    </footer>
  );
}
