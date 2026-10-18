"use client";

import { SectTitle, CardRows } from "@/components/Blocks";
import { useContent } from "@/components/ContentProvider";

export default function Why() {
  const { t, list } = useContent();
  return (
    <section className="sect" id="why">
      <SectTitle>{t("why_h")}</SectTitle>
      {t("why_sub") && <p className="sect-sub reveal">{t("why_sub")}</p>}
      <CardRows items={list("usps")} per={3} />
    </section>
  );
}
