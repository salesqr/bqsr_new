"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="header">
      <div className="container">
        <Link href="/" className="brand" aria-label={`${site.name} — home`} onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt="" width={313} height={360} priority />
          <span className="brand-text">
            <strong>BQSR</strong>
            <span>Quality Assurance</span>
          </span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav id="primary-nav" className={`nav${open ? " open" : ""}`} aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="link"
              aria-current={isActive(item.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/verify" className="btn btn-gold btn-sm" onClick={() => setOpen(false)}>
            Check Certificate
          </Link>
        </nav>
      </div>
    </header>
  );
}
