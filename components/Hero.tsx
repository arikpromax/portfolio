export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero.webp"
          alt="Знак arawebsite на робочому столі поруч із телефоном і ноутбуком"
          fetchPriority="high"
        />
      </div>

      <div className="wrap intro">
        <div className="intro__head reveal">
          <p className="kicker">Веб-студія «arawebsite»</p>
          <h1>Сайт, який приносить заявки</h1>
        </div>
        <div className="intro__body reveal">
          <div className="intro__actions">
            <a href="#cases" className="btn btn--ghost">
              Дивитись кейси<i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
