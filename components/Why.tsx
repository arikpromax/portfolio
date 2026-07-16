const usps = [
  {
    icon: "fa-solid fa-layer-group",
    title: "Сайт під будь-який бізнес",
    text: "Від простого лендингу до повноцінного сайту-каталогу. Підбираю формат під вашу задачу й бюджет, а не навпаки.",
  },
  {
    icon: "fa-solid fa-user-doctor",
    title: "Розумію складні ніші",
    text: "Знаю, що для стоматології важливі лікарі, обладнання й сертифікати, а для будівництва — об'єкти, матеріали та етапи. Тому впораюся з будь-яким завданням.",
  },
  {
    icon: "fa-solid fa-handshake-angle",
    title: "Гарантія та особистий супровід",
    text: "Працюєте напряму зі мною, без менеджерів-посередників. Правки за домовленістю та підтримка після запуску.",
  },
];

export default function Why() {
  return (
    <section className="section" id="why">
      <div className="wrap">
        <div className="section__head reveal">
          <span className="eyebrow">Чому я</span>
          <h2>Не просто «зробити сайт», а вирішити завдання бізнесу</h2>
        </div>
        <div className="usp-grid">
          {usps.map((u) => (
            <div key={u.title} className="usp reveal">
              <div className="usp__ico">
                <i className={u.icon}></i>
              </div>
              <h3>{u.title}</h3>
              <p>{u.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
