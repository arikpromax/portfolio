"use client";

import { SectTitle, Panel, CardRows } from "@/components/Blocks";
import { SceneDevices } from "@/components/Mocks";
import { useContent } from "@/components/ContentProvider";

export default function Solution() {
  const { t, list } = useContent();
  return (
    <section className="sect" id="solution">
      <SectTitle>{t("sol_h")}</SectTitle>
      <Panel pos="r" visual={<SceneDevices />} title={t("sol_panel_h")}>
        {t("sol_panel_p") && <p>{t("sol_panel_p")}</p>}
      </Panel>
      <CardRows items={list("features")} per={3} />
    </section>
  );
}
