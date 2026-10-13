"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { getConsent, CHANGE_EVENT, GA_ID } from "@/lib/consent";

/**
 * Google Analytics вантажиться тільки після «Прийняти» в банері cookie —
 * до того на сторінку не потрапляє жодного скрипта Google.
 * Якщо згоду потім відкликали, скрипт лишається в пам'яті сторінки,
 * але прапорець ga-disable (lib/consent.ts) не дає йому нічого надсилати.
 */
export default function Analytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => {
      if (getConsent() === "all") setAllowed(true);
    };
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    return () => window.removeEventListener(CHANGE_EVENT, sync);
  }, []);

  return allowed ? <GoogleAnalytics gaId={GA_ID} /> : null;
}
