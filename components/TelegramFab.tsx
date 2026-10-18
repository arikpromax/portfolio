"use client";

import TgLogo from "@/components/TgLogo";
import { useContent } from "@/components/ContentProvider";

export default function TelegramFab() {
  const { contacts } = useContent();
  return (
    <a
      href={contacts.tgUrl}
      target="_blank"
      rel="noopener"
      className="fab"
      aria-label="Написати в Telegram"
    >
      <TgLogo id="fab" />
    </a>
  );
}
