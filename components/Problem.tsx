const pains = [
  {
    icon: "fa-solid fa-phone-slash",
    title: "Тиша замість дзвінків",
    text: "Сайт працює, а заявок і дзвінків майже немає. Бюджет на нього витрачений, віддачі — нуль.",
  },
  {
    icon: "fa-solid fa-trophy",
    title: "Конкурент виглядає надійніше",
    text: "Поруч компанія з сучасним сайтом забирає ваших клієнтів — просто тому, що викликає більше довіри.",
  },
  {
    icon: "fa-solid fa-mobile-screen",
    title: "Незручно з телефону",
    text: "Сайт застарів, довго вантажиться й «розповзається» на смартфоні. А саме звідти заходить більшість людей.",
  },
  {
    icon: "fa-solid fa-circle-question",
    title: "Незрозуміло, скільки коштує",
    text: "Клієнт не бачить цін і прикладів робіт — і йде до того, хто все показав одразу.",
  },
];

export default function Problem() {
  return (
    <section className="section" id="problem">
      <div className="wrap">
        <div className="section__head reveal">
          <span className="eyebrow">Знайомо?</span>
          <h2>Сайт є, а клієнтів він не приводить</h2>
          <p>Якщо хоча б один із цих пунктів про вас — справа не у везінні, а в самому сайті.</p>
        </div>
        <div className="pain-grid">
          {pains.map((p) => (
            <div key={p.title} className="pain-card reveal">
              <div className="pain-card__ico">
                <i className={p.icon}></i>
              </div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
