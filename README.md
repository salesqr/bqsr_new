# BQSR Quality Assurance — website

Next.js (App Router) + Supabase.

## Pages
| Route | Purpose |
|---|---|
| `/` | Home |
| `/about` | About Us |
| `/services`, `/services/[slug]` | Certification, Training, Cyber Security Audits |
| `/verify` | **Check Certificate** (first 3 letters of company + certificate no.) |
| `/contact` | Contact details + enquiry form (saved to Supabase) |
| `/admin` | Admin: certificates, partners, enquiries (login required) |

## Setup
1. `npm install`
2. Supabase → SQL Editor → run **`supabase/schema.sql`**
3. Copy `.env.local.example` → `.env.local` and add your Supabase URL + anon key
4. Create your admin user (instructions at the bottom of `schema.sql`)
5. `npm run dev` → http://localhost:3000

## How Check Certificate stays safe
The `certificates` table is **not** publicly readable. The public page calls the database function
`verify_certificate(name_prefix, certificate_no)`, which requires both values, matches exactly, and
returns only public-safe fields (never address or contact details).

## Editing content
Services, values, standards and the contact address live in `lib/site.ts`.
Theme colours (taken from the logo) are CSS variables at the top of `app/globals.css`.
