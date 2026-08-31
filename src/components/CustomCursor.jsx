import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => {
      if (e.target.closest("a, button, input, textarea")) setHovering(true);
    };
    const out = (e) => {
      if (e.target.closest("a, button, input, textarea")) setHovering(false);
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div
      className={`pointer-events-none fixed z-[100] rounded-full border-2 border-accent transition-[width,height] duration-200 ease-out hidden lg:block ${
        hovering ? "w-10 h-10 bg-accent/20" : "w-5 h-5"
      }`}
      style={{
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
