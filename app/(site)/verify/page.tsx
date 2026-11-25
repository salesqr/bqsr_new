import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Info, SearchX } from "lucide-react";
import VerifyForm from "@/components/VerifyForm";
import { PageHero } from "@/components/ui";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Check Certificate",
  description: "Verify the status of a certificate issued by BQSR Quality Assurance.",
  robots: { index: true, follow: true },
};

type Cert = {
  company_name: string;
  scope: string;
  standard: string;
  certificate_no: string;
  country: string;
  issue_date: string | null;
  expiry_surveillance_date: string | null;
  status: "Active" | "Suspended" | "Withdrawn" | "Expired";
};

const fmt = (d: string | null) =>
  d ? new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—";

const badgeClass = (s: Cert["status"]) => (s === "Active" ? "ok" : s === "Suspended" ? "warn" : "bad");

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const name = first(sp.name).trim().slice(0, 100);
  const no = first(sp.no).trim().slice(0, 100);
  const searched = name.length > 0 || no.length > 0;

  let results: Cert[] = [];
  let error: string | null = null;

  if (searched) {
    if (name.length < 3 || no.length < 3) {
      error = "Please enter at least the first 3 letters of the company name and the certificate number.";
    } else if (!isSupabaseConfigured()) {
      error = "The certificate service is not available right now. Please try again later or contact us.";
    } else {
      const supabase = await createClient();
      const { data, error: rpcError } = await supabase.rpc("verify_certificate", {
        p_name_prefix: name,
        p_certificate_no: no,
      });
      if (rpcError) error = "We could not complete the check right now. Please try again in a moment.";
      else results = (data ?? []) as Cert[];
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Check Certificate"
        title="Verify a BQSR certificate"
        crumbs={
          <>
            <Link href="/">Home</Link> / <span>Check Certificate</span>
          </>
        }
      >
        Enter the first 3 letters of the company name and the certificate number to confirm its current status.
      </PageHero>

      <section className="section" style={{ paddingTop: 56 }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="verify-card" style={{ gridTemplateColumns: "1fr", marginBottom: 40 }}>
            <VerifyForm defaultName={name} defaultNo={no} idPrefix="page" />
          </div>

          {error && (
            <div className="notice error" role="alert">
              <AlertTriangle size={20} />
              <p>{error}</p>
            </div>
          )}

          {searched && !error && results.length === 0 && (
            <div className="notice info" role="status">
              <SearchX size={20} />
              <p>
                <b>No matching certificate was found.</b> Please check the first 3 letters of the company name and
                the certificate number, then try again. If you believe this is a mistake,{" "}
                <Link href="/contact" style={{ textDecoration: "underline", fontWeight: 600 }}>
                  contact us
                </Link>
                .
              </p>
            </div>
          )}

          {results.map((c) => (
            <article className="result" key={c.certificate_no} style={{ marginBottom: 24 }}>
              <div className="result-head">
                <div>
                  <small>Certified organization</small>
                  <h3>{c.company_name}</h3>
                </div>
                <span className={`badge ${badgeClass(c.status)}`}>{c.status}</span>
              </div>
              <dl>
                <div>
                  <dt>Certificate no.</dt>
                  <dd>{c.certificate_no}</dd>
                </div>
                <div>
                  <dt>Standard</dt>
                  <dd>{c.standard}</dd>
                </div>
                <div>
                  <dt>Country</dt>
                  <dd>{c.country}</dd>
                </div>
                <div>
                  <dt>Date of issue</dt>
                  <dd>{fmt(c.issue_date)}</dd>
                </div>
                <div className="wide">
                  <dt>Expiry / Surveillance due date</dt>
                  <dd>{fmt(c.expiry_surveillance_date)}</dd>
                </div>
                <div className="wide">
                  <dt>Scope of certification</dt>
                  <dd style={{ fontWeight: 500 }}>{c.scope}</dd>
                </div>
              </dl>
            </article>
          ))}

          {!searched && (
            <div className="notice info">
              <Info size={20} />
              <p>
                For the company name, enter only the <b>first 3 letters</b> (for example, “ABC” for “ABC Industries”).
                The certificate number is printed on the certificate.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
