"use client";

import { openCookieSettings } from "@/lib/consent";

/**
 * Посилання «змінити вибір щодо cookie» — повертає банер на екран.
 * Використовується в підвалі й на сторінці про cookie.
 */
export default function CookieSettingsLink({ label = "змінити вибір щодо cookie" }: { label?: string }) {
  return (
    <button type="button" className="ck-link" onClick={openCookieSettings}>
      {label}
    </button>
  );
}
