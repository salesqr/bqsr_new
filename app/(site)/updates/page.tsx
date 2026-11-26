import type { Metadata } from "next";
import { Megaphone } from "lucide-react";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Recent Updates",
  description: "The latest announcements from BQSR Quality Assurance Pvt Ltd.",
};

export default function UpdatesPage() {
  return (
    <>
      <PageHero
        eyebrow="Recent Updates"
        title="The latest from BQSR"
      />

      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <article className="card" style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
            <div className="icon-hex" style={{ flex: "none" }}>
              <Megaphone size={28} strokeWidth={1.7} />
            </div>
            <div>
              <div className="eyebrow" style={{ color: "var(--red)", marginBottom: 8, fontSize: ".72rem" }}>
                Announcement
              </div>
              <p style={{ margin: 0, fontSize: "1.2rem", color: "var(--ink)", lineHeight: 1.6 }}>
                BQSR Quality Assurance Pvt Ltd has recently changed its certification symbol for focusing on training
                and cybersecurity audits.
              </p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
