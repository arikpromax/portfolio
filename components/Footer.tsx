export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <a href="#top" className="logo">
            <span className="logo__mark">a</span>arawebsite
          </a>
          <div className="footer__contacts">
            <a href="https://t.me/arikpromax">
              <i className="fa-brands fa-telegram"></i>@arikpromax
            </a>
            <a href="tel:+380957643416">
              <i className="fa-solid fa-phone"></i>+380 95 764 34 16
            </a>
            <a href="mailto:arikpro92@gmail.com">
              <i className="fa-solid fa-envelope"></i>arikpro92@gmail.com
            </a>
          </div>
        </div>
        <div className="footer__copy">© 2026 Веб-студія «arawebsite». Сайти, які приносять заявки.</div>
      </div>
    </footer>
  );
}
