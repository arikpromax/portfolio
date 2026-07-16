export default function About() {
  return (
    <section className="section about" id="about">
      <div className="wrap about__grid">
        <div className="about__photo reveal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/yaroslav.jpg" alt="Ярослав — веб-розробник" />
          <span className="about__status">
            <i className="fa-solid fa-circle"></i>Відкритий до замовлень
          </span>
          <span className="dot dot-1"></span>
          <span className="dot dot-2"></span>
          <span className="dot dot-3"></span>
        </div>
        <div className="about__text reveal">
          <span className="eyebrow">Про мене</span>
          <h2>Привіт! Я Ярослав — роблю сайти, що працюють на результат</h2>
          <p>
            Веб-розробник і засновник студії «arawebsite». Створюю сайти під будь-який бізнес — від
            лендингу до каталогу — і відповідаю за результат особисто, від першого брифу до запуску.
          </p>
          <p>
            Ви працюєте напряму зі мною, без менеджерів і черг. Я вникаю в задачу, пропоную рішення
            й залишаюся на зв'язку після здачі проєкту.
          </p>
          <ul className="about__points">
            <li>
              <i className="fa-solid fa-check"></i>Особистий супровід на кожному етапі
            </li>
            <li>
              <i className="fa-solid fa-check"></i>Чесні терміни та прозора ціна
            </li>
            <li>
              <i className="fa-solid fa-check"></i>Підтримка й правки після запуску
            </li>
          </ul>
          <div className="about__actions">
            <a href="#contact" className="btn btn--primary">
              <i className="fa-solid fa-comments"></i>Обговорити проєкт
            </a>
            <a
              href="https://t.me/arikpromax"
              target="_blank"
              rel="noopener"
              className="btn btn--ghost"
            >
              <i className="fa-brands fa-telegram"></i>Написати в Telegram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
