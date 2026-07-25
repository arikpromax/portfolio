"use client";

import { useEffect } from "react";
import { captureRef } from "@/lib/referral";

/**
 * Ловить ?ref=код у адресі й запам'ятовує партнера на 90 днів.
 * Нічого не показує — просто має бути десь на сторінці.
 */
export default function RefCapture() {
  useEffect(() => {
    captureRef();
  }, []);

  return null;
}
