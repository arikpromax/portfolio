/** Текст ліворуч, велике фото праворуч — як блок про двигун у зразку */
export default function About() {
  return (
    <section className="sect" id="about">
      <div className="split split--photo">
        <div className="split__text reveal">
          <p className="kicker">Про мене</p>
          <h3>Привіт! Я Ярослав — роблю сайти, що працюють на результат</h3>
          <p>
            Веб-розробник і засновник студії «arawebsite». Створюю сайти під будь-який бізнес — від
            лендингу до каталогу — і відповідаю за результат особисто, від першого брифу до запуску.
          </p>
          <p>
            Ви працюєте напряму зі мною, без менеджерів і черг. Я вникаю в задачу, пропоную рішення
            й залишаюся на зв&apos;язку після здачі проєкту.
          </p>
          <ul className="ticks">
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
          <div className="split__actions">
            <a href="#contact" className="btn btn--primary">
              <i className="fa-solid fa-comments"></i>Обговорити проєкт
            </a>
            <a href="https://t.me/arikpromax" target="_blank" rel="noopener" className="btn btn--ghost">
              <i className="fa-brands fa-telegram"></i>Telegram
            </a>
          </div>
        </div>
        <div className="split__visual split__visual--photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/yaroslav.jpg" alt="Ярослав — веб-розробник" />
          <span className="split__status">
            <i className="fa-solid fa-circle"></i>Відкритий до замовлень
          </span>
        </div>
      </div>
    </section>
  );
}
