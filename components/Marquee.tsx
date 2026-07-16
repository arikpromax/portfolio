const niches = [
  "Стоматологія",
  "Будівництво",
  "Б'юті-сфера",
  "Магазини",
  "Медицина",
  "Кав'ярні",
  "Послуги",
  "Спортзали",
];

export default function Marquee() {
  // Список подвоєно, щоб стрічка крутилась без розривів
  const items = [...niches, ...niches];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((n, i) => (
          <span key={i} className="marquee__item">
            <i className="fa-solid fa-diamond"></i>
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}
