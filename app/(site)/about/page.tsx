import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Eye, GraduationCap, BadgeCheck, Scale, Users } from "lucide-react";
import { PageHero, SectionHead } from "@/components/ui";
import { audiences, values } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "BQSR Quality Assurance Pvt Ltd is an independent certification and training body committed to impartiality, technical competence and continuous improvement.",
};

const valueIcons = [Scale, Users, Eye];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="An independent body committed to trust, competence and excellence"
        crumbs={
          <>
            <Link href="/">Home</Link> / <span>About Us</span>
          </>
        }
      >
        BQSR Quality Assurance Pvt Ltd is an independent certification and training body committed to helping
        organizations and professionals build trust, competence and operational excellence against recognized
        standards.
      </PageHero>

      {/* What we do */}
      <section className="section">
        <div className="container">
          <div className="split" style={{ alignItems: "start" }}>
            <div className="copy">
              <div className="eyebrow" style={{ color: "var(--red)" }}>
                Who we are
              </div>
              <h2>Practical training, paired with impartial assessment</h2>
              <div className="rule" style={{ marginBottom: 24 }} />
              <p>
                We combine practical training programmes with impartial third-party audits and certification
                assessments. This gives organizations and professionals one trusted partner for both building
                capability and independently demonstrating it.
              </p>
              <p>
                Whether you are an enterprise seeking independent verification of your systems or an individual
                developing recognized credentials, our focus is the same: honest, competent assessment and
                training that creates real, lasting value.
              </p>
            </div>

            <div className="grid" style={{ gap: 20 }}>
              <div className="feature">
                <div className="icon-hex sm">
                  <BadgeCheck size={22} strokeWidth={1.7} />
                </div>
                <div>
                  <h3>Certification Services</h3>
                  <p>
                    Structured, impartial assessments and audits that verify conformance with relevant standards,
                    supporting initial certification, surveillance and renewal cycles.
                  </p>
                </div>
              </div>
              <div className="feature">
                <div className="icon-hex sm">
                  <GraduationCap size={22} strokeWidth={1.7} />
                </div>
                <div>
                  <h3>Training &amp; Skill Development</h3>
                  <p>
                    Practical, standards-aligned courses and workshops that equip teams and individuals with the
                    knowledge to implement and maintain effective systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section tint">
        <div className="container">
          <SectionHead eyebrow="Our approach & values" title="What guides our work" center />
          <div className="grid cols-3">
            {values.map((v, i) => {
              const Icon = valueIcons[i];
              return (
                <div className="value" key={v.title}>
                  <div className="icon-hex sm" style={{ marginBottom: 18 }}>
                    <Icon size={22} strokeWidth={1.7} />
                  </div>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Who we serve" title="Organizations, professionals and teams" />
          <div className="grid cols-2">
            {audiences.map((a) => (
              <div className="card" key={a.title}>
                <h3 style={{ marginTop: 0 }}>{a.title}</h3>
                <p style={{ marginBottom: 0 }}>{a.text}</p>
              </div>
            ))}
          </div>

          <div className="notice info" style={{ marginTop: 40 }}>
            <Check size={20} />
            <p>
              <b>Impartiality commitment.</b> Certification decisions are made on the basis of objective evidence.
              Our assessments are independent of commercial, financial or other pressures that could compromise
              their integrity.
            </p>
          </div>
        </div>
      </section>

      <section className="section tint" style={{ paddingTop: 64, paddingBottom: 72 }}>
        <div className="container">
          <div className="cta">
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2>Let&rsquo;s talk about your goals</h2>
              <p>Whether it is certification, training or a security audit, we are happy to discuss what fits.</p>
            </div>
            <div className="hero-actions">
              <Link href="/contact" className="btn btn-gold">
                Contact Us <ArrowRight size={18} />
              </Link>
              <Link href="/services" className="btn btn-ghost">
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
