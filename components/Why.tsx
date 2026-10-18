import { SectTitle, Cards } from "@/components/Blocks";
import { MockLayers, MockNiches, MockChat } from "@/components/Mocks";

const usps = [
  {
    visual: <MockLayers />,
    title: "Сайт під будь-який бізнес",
    text: "Від простого лендингу до повноцінного сайту-каталогу. Підбираю формат під вашу задачу й бюджет, а не навпаки.",
  },
  {
    visual: <MockNiches />,
    title: "Розумію складні ніші",
    text: "Знаю, що для стоматології важливі лікарі, обладнання й сертифікати, а для будівництва — об'єкти, матеріали та етапи. Тому впораюся з будь-яким завданням.",
  },
  {
    visual: (
      <MockChat
        lines={[
          [true, "Можна поміняти фото на головній?"],
          [false, "Так, уже замінив — гляньте"],
        ]}
      />
    ),
    title: "Гарантія та особистий супровід",
    text: "Працюєте напряму зі мною, без менеджерів-посередників. Правки за домовленістю та підтримка після запуску.",
  },
];

export default function Why() {
  return (
    <section className="sect" id="why">
      <SectTitle>Чому я</SectTitle>
      <p className="sect-sub reveal">Не просто «зробити сайт», а вирішити завдання бізнесу</p>
      <Cards items={usps} />
    </section>
  );
}
