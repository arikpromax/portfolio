import TgLogo from "@/components/TgLogo";

export default function TelegramFab() {
  return (
    <a
      href="https://t.me/arikpromax"
      target="_blank"
      rel="noopener"
      className="fab"
      aria-label="Написати в Telegram"
    >
      <TgLogo id="fab" />
    </a>
  );
}
