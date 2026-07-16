"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      if (bar.current) bar.current.style.width = Math.min(scrolled * 100, 100) + "%";
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return <div className="scroll-progress" ref={bar}></div>;
}
