import { SectTitle, Panel, Cards } from "@/components/Blocks";
import { SceneQuiet, MockEmptyCalls, MockRival, MockBroken, MockNoPrice } from "@/components/Mocks";

const pains = [
  {
    visual: <MockEmptyCalls />,
    title: "Тиша замість дзвінків",
    text: "Сайт працює, а заявок і дзвінків майже немає. Бюджет на нього витрачений, віддачі — нуль.",
  },
  {
    visual: <MockRival />,
    title: "Конкурент виглядає надійніше",
    text: "Поруч компанія з сучасним сайтом забирає ваших клієнтів — просто тому, що викликає більше довіри.",
  },
  {
    visual: <MockBroken />,
    title: "Незручно з телефону",
    text: "Сайт застарів, довго вантажиться й «розповзається» на смартфоні. А саме звідти заходить більшість людей.",
  },
  {
    visual: <MockNoPrice />,
    title: "Незрозуміло, скільки коштує",
    text: "Клієнт не бачить цін і прикладів робіт — і йде до того, хто все показав одразу.",
  },
];

export default function Problem() {
  return (
    <section className="sect" id="problem">
      <SectTitle>Знайомо?</SectTitle>
      <Panel tone="dark" pos="bl" visual={<SceneQuiet />} title="Сайт є, а клієнтів він не приводить">
        <p>Якщо хоча б один із цих пунктів про вас — справа не у везінні, а в самому сайті.</p>
      </Panel>
      <Cards cols={2} items={pains} />
    </section>
  );
}
