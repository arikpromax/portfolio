"use client";

import { useEffect } from "react";

/**
 * Загальносторінкові ефекти (як в оригінальному сайті):
 * — плавна поява блоків .reveal при прокрутці;
 * — 3D-нахил карток за курсором;
 * — світіння, що слідує за курсором, у темних блоках .cursor-glow.
 */
export default function SiteEffects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("in"), (i % 4) * 70);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    if (!reduce) {
      document.querySelectorAll<HTMLElement>(".pain-card, .feat, .usp").forEach((card) => {
        const onEnter = () => {
          card.style.transition = "transform .12s ease";
        };
        const onMove = (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform = `perspective(800px) rotateX(${-py * 6}deg) rotateY(${px * 6}deg) translateY(-4px) scale(1.015)`;
        };
        const onLeave = () => {
          card.style.transition = "transform .4s cubic-bezier(.2,.7,.3,1)";
          card.style.transform = "";
        };
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseleave", onLeave);
        });
      });

      document.querySelectorAll<HTMLElement>(".cursor-glow").forEach((el) => {
        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          el.style.setProperty("--mx", e.clientX - r.left + "px");
          el.style.setProperty("--my", e.clientY - r.top + "px");
        };
        el.addEventListener("mousemove", onMove);
        cleanups.push(() => el.removeEventListener("mousemove", onMove));
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
