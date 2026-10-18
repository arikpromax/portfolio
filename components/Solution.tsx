import { SectTitle, Panel, Cards } from "@/components/Blocks";
import {
  SceneDevices,
  MockProof,
  MockForm,
  MockScreens,
  MockSpeed,
  MockMap,
  MockSearch,
} from "@/components/Mocks";

const trust = [
  {
    visual: <MockProof />,
    title: "Докази, а не обіцянки",
    text: "Фото реальних робіт, відгуки клієнтів і чіткі гарантії — те, що знімає сумніви ще до дзвінка.",
  },
  {
    visual: <MockForm />,
    title: "Заявка в один клік",
    text: "Помітна форма та дзвінок чи чат у пару дотиків. Без зайвих полів, які відлякують.",
  },
  {
    visual: <MockScreens />,
    title: "Зручно на будь-якому екрані",
    text: "Однаково чітко й охайно на телефоні, планшеті та комп'ютері.",
  },
];

const reach = [
  {
    visual: <MockSpeed />,
    title: "Швидке завантаження",
    text: "Сторінка відкривається за секунди — людина не встигає піти до конкурента.",
  },
  {
    visual: <MockMap />,
    title: "Інтеграція з Google Maps",
    text: "Клієнт одразу бачить, де ви знаходитесь, і як до вас доїхати.",
  },
  {
    visual: <MockSearch />,
    title: "SEO під локальні запити",
    text: "Вас знаходять саме ті, хто шукає вашу послугу поруч із вами.",
  },
];

export default function Solution() {
  return (
    <section className="sect" id="solution">
      <SectTitle>Що я роблю</SectTitle>
      <Panel pos="r" visual={<SceneDevices />} title="Сайт, який працює на довіру і на заявки">
        <p>Кожен елемент сайту має одну мету — перетворити відвідувача на клієнта.</p>
      </Panel>
      <Cards items={trust} />
      <Cards items={reach} />
    </section>
  );
}
