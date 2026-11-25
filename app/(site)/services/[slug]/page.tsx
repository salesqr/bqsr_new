import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { PageHero, SectionHead, ServiceGlyph } from "@/components/ui";
import { services } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return s ? { title: s.title, description: s.short } : {};
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title={service.title}
        crumbs={
          <>
            <Link href="/">Home</Link> / <Link href="/services">Services</Link> / <span>{service.title}</span>
          </>
        }
      >
        {service.short}
      </PageHero>

      <section className="section">
        <div className="container detail-layout">
          <div>
            <p style={{ fontSize: "1.18rem", color: "var(--muted)", marginBottom: 48 }}>{service.intro}</p>

            <h2 style={{ fontSize: "1.8rem", marginBottom: 24 }}>What&rsquo;s included</h2>
            <div className="grid cols-2" style={{ marginBottom: 56 }}>
              {service.highlights.map((h) => (
                <div className="feature" key={h.title}>
                  <div className="icon-hex sm">
                    <ServiceGlyph icon={service.icon} size={20} />
                  </div>
                  <div>
                    <h3>{h.title}</h3>
                    <p>{h.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: "1.8rem", marginBottom: 24 }}>How it works</h2>
            <ol className="timeline" style={{ marginBottom: 56 }}>
              {service.steps.map((st, i) => (
                <li key={st.title}>
                  <span className="num">{i + 1}</span>
                  <div>
                    <h3>{st.title}</h3>
                    <p>{st.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h2 style={{ fontSize: "1.8rem", marginBottom: 8 }}>Who it&rsquo;s for</h2>
            <ul className="check-list">
              {service.forWhom.map((w) => (
                <li key={w}>
                  <Check size={20} />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside>
            <div className="aside-card">
              <h3>Our services</h3>
              <ul className="aside-links">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} aria-current={s.slug === service.slug ? "page" : undefined}>
                      {s.title} <ArrowRight size={16} />
                    </Link>
                  </li>
                ))}
              </ul>
              <hr style={{ border: 0, borderTop: "1px solid rgba(255,255,255,.14)", margin: "24px 0" }} />
              <p style={{ fontSize: ".95rem" }}>Have a question or want a quotation?</p>
              <Link href="/contact" className="btn btn-gold" style={{ width: "100%" }}>
                Contact Us
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="section tint" style={{ paddingTop: 64, paddingBottom: 72 }}>
        <div className="container">
          <SectionHead eyebrow="Next step" title={`Interested in ${service.title.toLowerCase()}?`} center>
            Send us a few details and we will get back to you with the next steps.
          </SectionHead>
          <div style={{ textAlign: "center" }}>
            <Link href="/contact" className="btn btn-primary">
              Request a Quotation <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
