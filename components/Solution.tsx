const feats = [
  {
    icon: "fa-solid fa-images",
    title: "Докази, а не обіцянки",
    text: "Фото реальних робіт, відгуки клієнтів і чіткі гарантії — те, що знімає сумніви ще до дзвінка.",
  },
  {
    icon: "fa-solid fa-bolt",
    title: "Заявка в один клік",
    text: "Помітна форма та дзвінок чи чат у пару дотиків. Без зайвих полів, які відлякують.",
  },
  {
    icon: "fa-solid fa-mobile-screen-button",
    title: "Зручно на будь-якому екрані",
    text: "Однаково чітко й охайно на телефоні, планшеті та комп'ютері.",
  },
  {
    icon: "fa-solid fa-gauge-high",
    title: "Швидке завантаження",
    text: "Сторінка відкривається за секунди — людина не встигає піти до конкурента.",
  },
  {
    icon: "fa-solid fa-location-dot",
    title: "Інтеграція з Google Maps",
    text: "Клієнт одразу бачить, де ви знаходитесь, і як до вас доїхати.",
  },
  {
    icon: "fa-solid fa-magnifying-glass",
    title: "SEO під локальні запити",
    text: "Вас знаходять саме ті, хто шукає вашу послугу поруч із вами.",
  },
];

export default function Solution() {
  return (
    <section className="section sol" id="solution">
      <div className="wrap">
        <div className="section__head reveal">
          <span className="eyebrow">Що я роблю</span>
          <h2>Сайт, який працює на довіру і на заявки</h2>
          <p>Кожен елемент сайту має одну мету — перетворити відвідувача на клієнта.</p>
        </div>
        <div className="feat-grid">
          {feats.map((f) => (
            <div key={f.title} className="feat reveal">
              <div className="feat__ico">
                <i className={f.icon}></i>
              </div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
