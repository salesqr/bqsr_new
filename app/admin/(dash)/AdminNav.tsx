"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/admin", label: "Certificates", match: (p: string) => p === "/admin" || p.startsWith("/admin/certificates") },
  { href: "/admin/partners", label: "Partners", match: (p: string) => p.startsWith("/admin/partners") },
  { href: "/admin/enquiries", label: "Enquiries", match: (p: string) => p.startsWith("/admin/enquiries") },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <>
      {items.map((i) => (
        <Link key={i.href} href={i.href} aria-current={i.match(pathname) ? "page" : undefined}>
          {i.label}
        </Link>
      ))}
    </>
  );
}
