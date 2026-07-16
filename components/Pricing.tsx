const factors = [
  {
    icon: "fa-solid fa-layer-group",
    title: "Обсяг сторінок",
    text: "Лендинг чи багатосторінковий каталог",
  },
  {
    icon: "fa-solid fa-file-lines",
    title: "Контент",
    text: "Чи є готові тексти й фото, чи готую їх я",
  },
  {
    icon: "fa-solid fa-plug",
    title: "Інтеграції",
    text: "Форми, онлайн-запис, карта, чат, аналітика",
  },
  {
    icon: "fa-solid fa-palette",
    title: "Дизайн",
    text: "Шаблонний підхід чи унікальний макет",
  },
];

export default function Pricing() {
  return (
    <section className="section" id="price">
      <div className="wrap">
        <div className="section__head reveal">
          <span className="eyebrow">Вартість</span>
          <h2>Прозора ціна під ваш проєкт</h2>
          <p>Жодних прихованих платежів — ви знаєте суму ще до старту роботи.</p>
        </div>
        <div className="price-card cursor-glow reveal">
          <div className="price-card__inner">
            <div>
              <span className="price-from">Сайт під ваш бізнес</span>
              <div className="price-big">
                <span className="from-tag">від</span>$600
              </div>
              <div className="price-note-line">
                <i className="fa-solid fa-circle-info"></i>Фінальна ціна — після прорахунку
              </div>
              <p className="price-desc">
                Точну вартість рахую під вашу задачу й озвучую до старту — жодних сюрпризів у
                процесі.
              </p>
              <a href="#contact" className="btn btn--light btn--lg">
                <i className="fa-solid fa-calculator"></i>Дізнатись точну вартість для мого бізнесу
              </a>
            </div>
            <div>
              <p className="factors-title">Що впливає на ціну</p>
              {factors.map((f) => (
                <div key={f.title} className="factor">
                  <div className="factor__ico">
                    <i className={f.icon}></i>
                  </div>
                  <div className="factor__txt">
                    <b>{f.title}</b>
                    <span>{f.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
