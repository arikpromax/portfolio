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
        <span className="hero__word" aria-hidden="true">
          arawebsite
        </span>
      </div>

      <div className="wrap intro">
        <div className="intro__head reveal">
          <p className="kicker">Веб-студія «arawebsite»</p>
          <h1>Сайт, який приносить заявки</h1>
        </div>
        <div className="intro__body reveal">
          <p>
            Вашому бізнесу — а не просто висить в інтернеті. Розробляю сайти під будь-який бізнес —
            від лендингу до каталогу. Роблю так, щоб відвідувач не закрив вкладку, а залишив
            заявку, подзвонив або записався на прийом.
          </p>
          <div className="intro__actions">
            <a href="#contact" className="btn btn--primary">
              <i className="fa-solid fa-calculator"></i>Отримати розрахунок
            </a>
            <a href="#cases" className="btn btn--ghost">
              Дивитись кейси<i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
          <p className="intro__note">
            <i className="fa-solid fa-gift"></i>
            <span>
              <b>Демосайт — безкоштовно.</b> Спершу показую, як виглядатиме ваш сайт, і лише потім
              говоримо про гроші.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
