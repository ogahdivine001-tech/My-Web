import { motion } from "framer-motion";
import {
  FiGithub,
  FiInstagram,
  FiTwitter,
  FiChevronDown,
} from "react-icons/fi";
import GradientBlobs from "../components/GradientBlobs";
import profilePhoto from "../assets/images/profile-photo.jpg";

const socials = [
  {
    icon: FiGithub,
    href: "https://github.com/ogahdivine001-tech",
    label: "GitHub",
  },
  {
    icon: FiInstagram,
    href: "https://www.instagram.com/ogahdivine2008/?hl=en",
    label: "Instagram",
  },
  { icon: FiTwitter, href: "https://x.com/DivineOgah2008", label: "X" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-32 pb-20"
    >
      <GradientBlobs />
      <div className="section-container grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="section-eyebrow">
            Web Developer &amp; Graphic Designer
          </p>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl mt-3 leading-tight">
            Hi, I'm <span className="gradient-text">Ogah Divine</span>
          </h1>
          <p className="mt-6 text-lg text-ink-700 dark:text-paper-200 max-w-xl">
            Building modern digital experiences through creative design and
            clean code. I create websites and brand assets that help clients,
            employers, and collaborators take notice.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#projects" className="btn-primary">
              View My Work
            </a>
            <a href="#contact" className="btn-secondary">
              Contact Me
            </a>
          </div>
          <div className="mt-10 flex items-center gap-4">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="h-11 w-11 rounded-full glass-card flex items-center justify-center hover:-translate-y-1 transition-transform duration-300"
              >
                <Icon />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="relative flex justify-center"
        >
          <div className="relative w-72 h-80 md:w-96 md:h-[26rem] animate-float">
            <div className="absolute -inset-3 rounded-xl3 bg-gradient-to-tr from-accent to-coral blur-3xl opacity-50" />
            <div className="relative h-full rounded-xl3 p-[5px] bg-gradient-to-tr from-accent via-accent-light to-coral shadow-glass">
              <div className="h-full w-full rounded-[calc(1.75rem-5px)] overflow-hidden bg-ink-950">
                <img
                  src={profilePhoto}
                  alt="Ogah Divine Henry"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 h-10 w-10 rounded-full glass-card flex items-center justify-center animate-bounce"
      >
        <FiChevronDown />
      </a>
    </section>
  );
}
