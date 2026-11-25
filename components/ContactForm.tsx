"use client";

import { useActionState } from "react";
import { CheckCircle2, AlertTriangle, Send } from "lucide-react";
import { submitEnquiry, type ContactState } from "@/app/(site)/contact/actions";
import { services } from "@/lib/site";

const initial: ContactState = { ok: false, message: "" };

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitEnquiry, initial);
  const v = state.values ?? {};

  if (state.ok) {
    return (
      <div className="notice success" role="status">
        <CheckCircle2 size={22} />
        <p>{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="stack" noValidate={false}>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="c-name">Your name *</label>
          <input id="c-name" name="name" className="input" required maxLength={120} defaultValue={v.name} autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="c-email">Email *</label>
          <input id="c-email" name="email" type="email" className="input" required maxLength={200} defaultValue={v.email} autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor="c-phone">Phone</label>
          <input id="c-phone" name="phone" type="tel" className="input" maxLength={40} defaultValue={v.phone} autoComplete="tel" />
        </div>
        <div className="field">
          <label htmlFor="c-company">Company</label>
          <input id="c-company" name="company" className="input" maxLength={200} defaultValue={v.company} autoComplete="organization" />
        </div>
        <div className="field full">
          <label htmlFor="c-service">I&rsquo;m interested in</label>
          <select id="c-service" name="service" className="select" defaultValue={v.service ?? ""}>
            <option value="">Select a service (optional)</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="field full">
          <label htmlFor="c-message">Message *</label>
          <textarea id="c-message" name="message" className="textarea" required minLength={5} maxLength={4000} defaultValue={v.message} />
        </div>
      </div>

      {/* Honeypot: hidden from people, tempting to bots */}
      <div className="honeypot" aria-hidden="true">
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.message && !state.ok && (
        <div className="notice error" role="alert">
          <AlertTriangle size={20} />
          <p>{state.message}</p>
        </div>
      )}

      <div>
        <button type="submit" className="btn btn-primary" disabled={pending}>
          <Send size={18} /> {pending ? "Sending…" : "Send Message"}
        </button>
      </div>
    </form>
  );
}
