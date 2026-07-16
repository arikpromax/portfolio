"use client";

import { useEffect, useRef, useState } from "react";

export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [gone, setGone] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const hide = () => {
      if (done.current) return;
      done.current = true;
      setHidden(true);
      timers.push(setTimeout(() => setGone(true), 600));
    };
    const start = () => timers.push(setTimeout(hide, 850));
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    // запобіжник: ніколи не лишати прелоадер назавжди
    timers.push(setTimeout(hide, 4000));
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("load", start);
    };
  }, []);

  if (gone) return null;
  return (
    <div className={`preloader${hidden ? " hide" : ""}`}>
      <div className="preloader__inner">
        <div className="preloader__mark">a</div>
        <div className="preloader__word">arawebsite</div>
        <div className="preloader__bar"></div>
      </div>
    </div>
  );
}
