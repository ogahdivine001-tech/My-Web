import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  doc,
  getDoc,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBJo9jnpYxQgXO0-gcNQDFbbSbsTFIDI7w",
  authDomain: "my-portfolio-b4e7c.firebaseapp.com",
  projectId: "my-portfolio-b4e7c",
  storageBucket: "my-portfolio-b4e7c.firebasestorage.app",
  messagingSenderId: "590753489911",
  appId: "1:590753489911:web:ce2a581c72d753e73784f2",
  measurementId: "G-TTM14WKEL3",
};

const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const filterButtons = document.querySelectorAll(".filter-button");
const projectSlider = document.querySelector(".project-slider");
const projectCards = document.querySelectorAll(".project-card");
const sliderButtons = document.querySelectorAll(".slider-button");
const detailButtons = document.querySelectorAll(".project-detail-button");
const themeToggle = document.querySelector(".theme-toggle");
const revealItems = document.querySelectorAll(".reveal");
const typedRole = document.querySelector("#typedRole");
const backToTop = document.querySelector(".back-to-top");
const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");
const counters = document.querySelectorAll("[data-count]");
const projectModal = document.querySelector("#projectModal");
const modalClose = document.querySelector(".modal-close");
const modalType = document.querySelector("#modalType");
const modalTitle = document.querySelector("#modalTitle");
const modalDetails = document.querySelector("#modalDetails");
const modalTools = document.querySelector("#modalTools");
const heroName = document.querySelector("#heroName");
const heroCopy = document.querySelector("#heroCopy");
const testimonialGrid = document.querySelector("#testimonialGrid");
const instagramLink = document.querySelector("#instagramLink");
const xLink = document.querySelector("#xLink");
const year = document.querySelector("#year");
const savedTheme = localStorage.getItem("portfolioTheme");
const roles = [
  "Frontend Developer",
  "React Developer",
  "UI/UX Designer",
  "Website Builder",
];
let roleIndex = 0;
let letterIndex = 0;
let isDeleting = false;
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const renderTestimonials = (testimonials) => {
  if (!Array.isArray(testimonials) || testimonials.length === 0) {
    return;
  }

  testimonialGrid.innerHTML = "";

  testimonials
    .filter((testimonial) => testimonial.quote && testimonial.name)
    .slice(0, 3)
    .forEach((testimonial) => {
      const article = document.createElement("article");
      const quote = document.createElement("p");
      const name = document.createElement("strong");

      quote.textContent = `"${testimonial.quote}"`;
      name.textContent = testimonial.name;
      article.append(quote, name);
      testimonialGrid.append(article);
    });
};

const applySiteContent = (content) => {
  if (content.heroName) {
    heroName.textContent = content.heroName;
    document.title = `${content.heroName} | Portfolio`;
  }

  if (content.heroCopy) {
    heroCopy.textContent = content.heroCopy;
  }

  if (content.instagramUrl) {
    instagramLink.href = content.instagramUrl;
  }

  if (content.xUrl) {
    xLink.href = content.xUrl;
  }

  renderTestimonials(content.testimonials);
};

const loadSiteContent = async () => {
  try {
    const snapshot = await getDoc(doc(db, "site", "main"));

    if (snapshot.exists()) {
      applySiteContent(snapshot.data());
    }
  } catch (error) {
    console.warn(
      "Using static portfolio content because Firestore content could not be loaded.",
    );
  }
};

loadSiteContent();

const syncHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
  backToTop.classList.toggle("is-visible", window.scrollY > 520);
};

syncHeader();
window.addEventListener("scroll", syncHeader);
document.body.classList.add("is-loading");

window.addEventListener("load", () => {
  setTimeout(() => {
    document.body.classList.remove("is-loading");
    document.body.classList.add("is-loaded");
  }, 500);
});

year.textContent = new Date().getFullYear();

const syncThemeToggle = () => {
  const isLight = document.body.classList.contains("light-theme");
  themeToggle.setAttribute("aria-pressed", String(isLight));
  themeToggle.setAttribute(
    "aria-label",
    isLight ? "Switch to dark blue theme" : "Switch to light theme",
  );
};

if (savedTheme === "light") {
  document.body.classList.add("light-theme");
}

syncThemeToggle();

themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light-theme");
  localStorage.setItem("portfolioTheme", isLight ? "light" : "dark");
  syncThemeToggle();
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  },
);

revealItems.forEach((item) => revealObserver.observe(item));

const animateCounter = (counter) => {
  const target = Number(counter.dataset.count);
  const suffix = counter.dataset.suffix || "";
  const duration = 1200;
  const start = performance.now();

  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.round(target * progress);

    counter.textContent = `${value}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  };

  requestAnimationFrame(update);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.6,
  },
);

counters.forEach((counter) => counterObserver.observe(counter));

const typeRole = () => {
  const currentRole = roles[roleIndex];
  const visibleText = currentRole.slice(0, letterIndex);

  typedRole.textContent = visibleText;

  if (!isDeleting && letterIndex < currentRole.length) {
    letterIndex += 1;
  } else if (isDeleting && letterIndex > 0) {
    letterIndex -= 1;
  } else if (!isDeleting) {
    isDeleting = true;
    setTimeout(typeRole, 1200);
    return;
  } else {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(typeRole, isDeleting ? 45 : 85);
};

typeRole();

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const formData = new FormData(contactForm);
  const payload = Object.fromEntries(formData.entries());

  formStatus.textContent = "Sending your message...";
  formStatus.classList.remove("is-error");
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Message failed");
    }

    contactForm.reset();
    formStatus.textContent =
      "Message sent successfully. I will get back to you soon.";
  } catch (error) {
    formStatus.textContent =
      "Message could not be sent. Please activate the form email or chat on WhatsApp.";
    formStatus.classList.add("is-error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send Message";
  }
});

navToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });

    projectSlider.scrollTo({ left: 0, behavior: "smooth" });
  });
});

sliderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const visibleCard = [...projectCards].find(
      (card) => !card.classList.contains("is-hidden"),
    );
    const cardWidth = visibleCard
      ? visibleCard.getBoundingClientRect().width + 18
      : 320;
    const direction = button.dataset.slide === "next" ? 1 : -1;

    projectSlider.scrollBy({
      left: cardWidth * direction,
      behavior: "smooth",
    });
  });
});

const openProjectModal = (card) => {
  modalType.textContent = card.dataset.projectType;
  modalTitle.textContent = card.dataset.projectTitle;
  modalDetails.textContent = card.dataset.projectDetails;
  modalTools.textContent = card.dataset.projectTools;
  projectModal.classList.add("is-open");
  projectModal.setAttribute("aria-hidden", "false");
  modalClose.focus();
};

const closeProjectModal = () => {
  projectModal.classList.remove("is-open");
  projectModal.setAttribute("aria-hidden", "true");
};

detailButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openProjectModal(button.closest(".project-card"));
  });
});

modalClose.addEventListener("click", closeProjectModal);

projectModal.addEventListener("click", (event) => {
  if (event.target === projectModal) {
    closeProjectModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && projectModal.classList.contains("is-open")) {
    closeProjectModal();
  }
});
