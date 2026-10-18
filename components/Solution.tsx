"use client";

import { SectTitle, Panel, CardRows } from "@/components/Blocks";
import { SceneDevices, Browser, Toast } from "@/components/Mocks";
import { useContent } from "@/components/ContentProvider";

export default function Solution() {
  const { t, list, photo } = useContent();
  const adminShot = photo("admin") || "/admin-panel.jpg";

  return (
    <section className="sect" id="solution">
      <SectTitle>{t("sol_h")}</SectTitle>
      <Panel pos="r" visual={<SceneDevices />} title={t("sol_panel_h")}>
        {t("sol_panel_p") && <p>{t("sol_panel_p")}</p>}
      </Panel>
      <CardRows items={list("features")} per={3} />

      {/* Сайт + адмін-панель: справжній знімок адмінки цього ж сайту */}
      {t("sol_admin_h") && (
        <div className="admin-block">
          <Panel
            pos="l"
            visual={
              <div className="admin-shot">
                <Browser url="Адмін-панель arawebsite">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={adminShot} alt="" loading="lazy" />
                </Browser>
                <Toast icon="fa-solid fa-circle-check" className="admin-shot__toast">
                  Збережено — на сайті за хвилину
                </Toast>
              </div>
            }
            title={t("sol_admin_h")}
          >
            {t("sol_admin_p") && <p>{t("sol_admin_p")}</p>}
          </Panel>
        </div>
      )}
    </section>
  );
}
