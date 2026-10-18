import { Browser, Phone } from "@/components/Mocks";

// Ніші, під які роблю сайти, — плитками з підписами, як галерея наприкінці зразка
const niches = [
  { name: "Стоматологія", a: "#0FA39B", b: "#0F3D52", url: "clinic.ua" },
  { name: "Будівництво", a: "#E8943A", b: "#7A4A12", url: "bud.ua" },
  { name: "Б'юті-сфера", a: "#E26AA6", b: "#7A1F58", url: "beauty.ua" },
  { name: "Магазини", a: "#3B82F6", b: "#1E3A8A", url: "shop.ua" },
  { name: "Медицина", a: "#14B8A6", b: "#134E4A", url: "med.ua" },
  { name: "Кав'ярні", a: "#9B6A43", b: "#3E2A1B", url: "coffee.ua" },
  { name: "Послуги", a: "#6366F1", b: "#312E81", url: "service.ua" },
  { name: "Спортзали", a: "#EF4444", b: "#7F1D1D", url: "gym.ua" },
];

export default function Gallery() {
  return (
    <section className="sect gallery" id="gallery">
      <div className="gallery__head wrap reveal">
        <h2>Галерея ніш</h2>
        <a href="#contact" className="btn btn--primary">
          Обговорити мій сайт<i className="fa-solid fa-arrow-right"></i>
        </a>
      </div>
      <div className="gallery__grid">
        {niches.map((n, i) => (
          <figure key={n.name} className={`gallery__item reveal${i === 0 ? " big" : ""}`}>
            <div className="gallery__shot" aria-hidden="true">
              {i % 3 === 2 ? (
                <Phone a={n.a} b={n.b} />
              ) : (
                <Browser a={n.a} b={n.b} url={n.url} />
              )}
            </div>
            <figcaption>{n.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
