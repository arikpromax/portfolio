"use client";

import { SectTitle, Panel, CardRows } from "@/components/Blocks";
import { SceneQuiet } from "@/components/Mocks";
import { useContent } from "@/components/ContentProvider";

export default function Problem() {
  const { t, list } = useContent();
  return (
    <section className="sect" id="problem">
      <SectTitle>{t("pain_h")}</SectTitle>
      <Panel tone="dark" pos="bl" visual={<SceneQuiet />} title={t("pain_panel_h")}>
        {t("pain_panel_p") && <p>{t("pain_panel_p")}</p>}
      </Panel>
      <CardRows items={list("pains")} per={2} />
    </section>
  );
}
