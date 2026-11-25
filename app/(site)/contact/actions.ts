"use server";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type ContactState = { ok: boolean; message: string; values?: Record<string, string> };

const str = (fd: FormData, k: string, max: number) => String(fd.get(k) ?? "").trim().slice(0, max);

export async function submitEnquiry(_prev: ContactState, fd: FormData): Promise<ContactState> {
  const values = {
    name: str(fd, "name", 120),
    email: str(fd, "email", 200),
    phone: str(fd, "phone", 40),
    company: str(fd, "company", 200),
    service: str(fd, "service", 80),
    message: str(fd, "message", 4000),
  };

  // Honeypot: real visitors never fill this in.
  if (str(fd, "website", 200)) return { ok: true, message: "Thank you. Your message has been sent." };

  if (!values.name || !values.email || values.message.length < 5) {
    return { ok: false, message: "Please fill in your name, email and a short message.", values };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    return { ok: false, message: "Please enter a valid email address.", values };
  }
  if (!isSupabaseConfigured()) {
    return { ok: false, message: "The contact form is not available right now. Please try again later.", values };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("enquiries").insert({
    name: values.name,
    email: values.email,
    phone: values.phone || null,
    company: values.company || null,
    service: values.service || null,
    message: values.message,
  });

  if (error) {
    return { ok: false, message: "Sorry, we could not send your message. Please try again shortly.", values };
  }
  return { ok: true, message: "Thank you. Your message has been sent and we will get back to you soon." };
}
