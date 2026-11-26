import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Eye, Scale, ShieldCheck, Users } from "lucide-react";
import VerifyForm from "@/components/VerifyForm";
import { HexPattern, SectionHead, ServiceGlyph } from "@/components/ui";
import { audiences, journey, services, values } from "@/lib/site";

const valueIcons = [Scale, Users, Eye];

export default function HomePage() {
  return (
    <>
      {/* ------------------------------- Hero ------------------------------- */}
      <section className="hero">
        <HexPattern />
        <div className="container">
          <div>
            <div className="eyebrow">Independent Certification &amp; Training</div>
            <h1>
              Impartial audits. Practical training. <em>Trusted</em> results.
            </h1>
            <p className="lead">
              BQSR Quality Assurance is an independent certification and training body. We combine practical training
              with impartial third-party audits and certification assessments, so organizations and professionals can
              build trust, competence and operational excellence.
            </p>
            <div className="hero-actions">
              <Link href="/contact" className="btn btn-gold">
                Request a Quotation <ArrowRight size={18} />
              </Link>
              <Link href="/services" className="btn btn-ghost">
                Explore Our Services
              </Link>
            </div>
            <div className="hero-badges">
              <div>
                <ShieldCheck size={20} /> Impartial third-party audits
              </div>
              <div>
                <Users size={20} /> Qualified auditors &amp; trainers
              </div>
              <div>
                <Check size={20} /> Verifiable certificates
              </div>
            </div>
          </div>

          <div className="hero-emblem" aria-hidden="true">
            <span className="ring" />
            <span className="ring two" />
            <Image src="/logo.png" alt="" width={313} height={360} priority />
          </div>
        </div>
      </section>

      {/* ------------------------ Check certificate ------------------------- */}
      <div className="verify-strip">
        <div className="container">
          <div className="verify-card">
            <div>
              <h2>Check Certificate</h2>
              <p>Confirm the status of a BQSR certificate in seconds.</p>
            </div>
            <VerifyForm idPrefix="home" />
          </div>
        </div>
      </div>

      {/* ------------------------------ Services ---------------------------- */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="What we do" title="Services built on independence and competence" center>
            From impartial audits to practical, standards-aligned training, we help you demonstrate and improve
            performance.
          </SectionHead>
          <div className="grid cols-3">
            {services.map((s) => (
              <article className="card" key={s.slug}>
                <div className="icon-hex">
                  <ServiceGlyph icon={s.icon} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.short}</p>
                <Link href={`/services/${s.slug}`} className="more">
                  Learn more <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------- About ------------------------------ */}
      <section className="section tint">
        <div className="container">
          <div className="split">
            <div className="copy">
              <div className="eyebrow" style={{ color: "var(--red)" }}>
                About BQSR
              </div>
              <h2 style={{ marginBottom: 8 }}>Helping organizations and professionals build lasting trust</h2>
              <div className="rule" style={{ marginBottom: 24 }} />
              <p>
                BQSR Quality Assurance Pvt Ltd is an independent certification and training body committed to helping
                organizations and professionals build trust, competence and operational excellence against recognized
                standards.
              </p>
              <p>
                We combine practical training programmes with impartial third-party audits and certification
                assessments, because meeting a standard is only the start of getting better.
              </p>
              <Link href="/about" className="btn btn-outline" style={{ marginTop: 8 }}>
                More about us <ArrowRight size={18} />
              </Link>
            </div>

            <div className="panel">
              <span className="quote-mark">“</span>
              <h3>Who we serve</h3>
              <ul className="check-list" style={{ marginTop: 20 }}>
                {audiences.map((a) => (
                  <li key={a.title}>
                    <Check size={20} style={{ color: "var(--gold-light)" }} />
                    <span>
                      <b style={{ color: "#fff", display: "block" }}>{a.title}</b>
                      {a.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------ Values ------------------------------ */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Our approach & values" title="The principles behind every audit and every course" center />
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

      {/* ------------------------------ Journey ----------------------------- */}
      <section className="section navy">
        <HexPattern />
        <div className="container" style={{ position: "relative" }}>
          <SectionHead eyebrow="The certification journey" title="A clear path from application to certificate" center>
            A transparent, structured process covering initial certification, surveillance and renewal.
          </SectionHead>
          <div className="journey">
            {journey.map((s, i) => (
              <div className="step" key={s.title}>
                <div className="num">{i + 1}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------- CTA ------------------------------- */}
      <section className="section tint" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <div className="container">
          <div className="cta">
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2>Ready to begin your certification journey?</h2>
              <p>Tell us about your organization and the standard you are working towards. We will respond with the next steps.</p>
            </div>
            <div className="hero-actions">
              <Link href="/contact" className="btn btn-gold">
                Contact Us <ArrowRight size={18} />
              </Link>
              <Link href="/verify" className="btn btn-ghost">
                Check a Certificate
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
