import { useState } from "react";
import { FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import RevealOnScroll from "../components/RevealOnScroll";

const initialForm = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) {
      next.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!form.message.trim()) next.message = "Message is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus({ state: "loading", message: "Sending your message..." });

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/ogahdivine001@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) throw new Error("Message failed");

      setForm(initialForm);
      setStatus({
        state: "success",
        message: "Message sent successfully. I will get back to you soon.",
      });
    } catch (error) {
      setStatus({
        state: "error",
        message:
          "Message could not be sent. Please try again or reach out on WhatsApp.",
      });
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="section-container">
        <RevealOnScroll>
          <p className="section-eyebrow text-center">Contact</p>
          <h2 className="section-heading text-center">Let's work together</h2>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          {[
            { icon: FiMail, label: "Email", value: "ogahdivine001@gmail.com" },
            { icon: FiPhone, label: "Phone", value: "+234 813 219 6409" },
            { icon: FiMapPin, label: "Location", value: "Lagos, Nigeria" },
          ].map(({ icon: Icon, label, value }) => (
            <RevealOnScroll key={label}>
              <div className="glass-card p-5 text-center">
                <div className="h-10 w-10 rounded-full bg-accent/10 text-accent dark:text-accent-light flex items-center justify-center mx-auto mb-3">
                  <Icon />
                </div>
                <p className="text-xs uppercase tracking-wide text-ink-700 dark:text-paper-200">
                  {label}
                </p>
                <p className="font-semibold text-sm mt-1">{value}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.15}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="glass-card p-6 md:p-10 mt-10 max-w-3xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl2 bg-white/60 dark:bg-ink-900/60 border border-white/40 dark:border-white/10 focus:border-accent outline-none transition-colors"
                />
                {errors.name && (
                  <p className="text-coral text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl2 bg-white/60 dark:bg-ink-900/60 border border-white/40 dark:border-white/10 focus:border-accent outline-none transition-colors"
                />
                {errors.email && (
                  <p className="text-coral text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="mt-5">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl2 bg-white/60 dark:bg-ink-900/60 border border-white/40 dark:border-white/10 focus:border-accent outline-none transition-colors"
              />
            </div>

            <div className="mt-5">
              <textarea
                name="message"
                placeholder="Message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl2 bg-white/60 dark:bg-ink-900/60 border border-white/40 dark:border-white/10 focus:border-accent outline-none transition-colors resize-none"
              />
              {errors.message && (
                <p className="text-coral text-xs mt-1">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status.state === "loading"}
              className="btn-primary mt-6 w-full md:w-auto justify-center disabled:opacity-60"
            >
              <FiSend />
              {status.state === "loading" ? "Sending..." : "Send Message"}
            </button>

            {status.message && (
              <p
                className={`mt-4 text-sm font-medium ${
                  status.state === "error" ? "text-coral" : "text-accent dark:text-accent-light"
                }`}
                aria-live="polite"
              >
                {status.message}
              </p>
            )}
          </form>
        </RevealOnScroll>
      </div>
    </section>
  );
}
