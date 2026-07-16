const steps = [
  {
    num: "01",
    icon: "fa-solid fa-comments",
    title: "Бриф",
    text: "Розбираюся у вашому бізнесі, клієнтах і меті сайту.",
  },
  {
    num: "02",
    icon: "fa-solid fa-sitemap",
    title: "Структура та контент",
    text: "Складаю логіку сторінок і тексти, що ведуть до заявки.",
  },
  {
    num: "03",
    icon: "fa-solid fa-pen-ruler",
    title: "Дизайн",
    text: "Малюю сучасний макет під вашу нішу й бренд.",
  },
  {
    num: "04",
    icon: "fa-solid fa-code",
    title: "Розробка",
    text: "Збираю швидкий адаптивний сайт із формами та інтеграціями.",
  },
  {
    num: "05",
    icon: "fa-solid fa-rocket",
    title: "Запуск і підтримка",
    text: "Публікуємо сайт, і я лишаюся на зв'язку для правок.",
  },
];

export default function Process() {
  return (
    <section className="section proc" id="process">
      <div className="wrap">
        <div className="section__head reveal">
          <span className="eyebrow">Як ми працюємо</span>
          <h2>Від ідеї до запуску — зрозуміло й по кроках</h2>
          <p>Ви завжди знаєте, на якому етапі ми зараз і що буде далі.</p>
          <div className="proc__badge">
            <i className="fa-solid fa-bolt-lightning"></i>Сайт за 1–3 дні
          </div>
        </div>
        <div className="steps">
          {steps.map((s) => (
            <div key={s.num} className="step reveal">
              <span className="step__num">{s.num}</span>
              <div className="step__ico">
                <i className={s.icon}></i>
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <span className="step__arrow">
                <i className="fa-solid fa-arrow-right"></i>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
