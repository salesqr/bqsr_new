export const site = {
  name: "BQSR Quality Assurance Pvt Ltd",
  shortName: "BQSR",
  tagline: "Independent Certification & Training",
  description:
    "BQSR Quality Assurance Pvt Ltd is an independent certification and training body helping organizations and professionals build trust, competence and operational excellence against recognized standards.",
  address: {
    lines: ["BQSR Quality Assurance Pvt Ltd", "B 11, 601, Vasant Vihar", "Thane West, Mumbai"],
    oneLine: "B 11, 601, Vasant Vihar, Thane West, Mumbai",
  },
  // Optional: set NEXT_PUBLIC_CONTACT_EMAIL / NEXT_PUBLIC_CONTACT_PHONE in .env.local to show them.
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact Us" },
];

export type ServiceIcon = "certification" | "training" | "cyber";

export type Service = {
  slug: string;
  icon: ServiceIcon;
  title: string;
  short: string;
  intro: string;
  highlights: { title: string; text: string }[];
  forWhom: string[];
  steps: { title: string; text: string }[];
};

export const services: Service[] = [
  {
    slug: "certification",
    icon: "certification",
    title: "Certification Services",
    short:
      "Structured, impartial assessments and audits that verify conformance with relevant standards, covering initial certification, surveillance and renewal.",
    intro:
      "Our certification services provide independent, third-party verification that your management system, process or product conforms to a recognized standard. Every assessment is conducted by qualified auditors, and every certification decision is made impartially, with no consulting conflict of interest.",
    highlights: [
      {
        title: "Initial certification",
        text: "A two-stage assessment of your system, from documentation and readiness review to an on-site or remote certification audit.",
      },
      {
        title: "Surveillance audits",
        text: "Periodic audits through the certificate cycle that confirm your system continues to conform and keeps improving.",
      },
      {
        title: "Re-certification",
        text: "A full re-assessment at the end of the cycle so your certification stays current and continuous.",
      },
      {
        title: "Verifiable certificates",
        text: "Every certificate we issue can be checked online by anyone, using the Check Certificate service on this website.",
      },
    ],
    forWhom: [
      "Organizations that need independent verification to satisfy customer, market or regulatory expectations",
      "Companies renewing or transferring an existing certification",
      "Businesses in manufacturing, services, technology, food, construction and other sectors",
    ],
    steps: [
      { title: "Application & quotation", text: "Share your scope, sites and standard. We review it and confirm the audit programme and timelines." },
      { title: "Stage 1 – readiness review", text: "We review your documented system and confirm you are ready for the certification audit." },
      { title: "Stage 2 – certification audit", text: "Auditors assess how your system works in practice, and any nonconformities are raised and closed." },
      { title: "Independent decision", text: "A person independent of the audit team reviews the evidence and decides on certification." },
      { title: "Surveillance & renewal", text: "Scheduled surveillance audits and re-certification keep your certificate valid and meaningful." },
    ],
  },
  {
    slug: "training",
    icon: "training",
    title: "Training Services",
    short:
      "Practical, standards-aligned courses and workshops that give teams and individuals the knowledge to implement and maintain effective systems.",
    intro:
      "Our training and skill development programmes are built around how standards are actually applied at work. They are delivered by trainers with real industry experience, so participants leave able to implement, audit and improve, not just recite clauses.",
    highlights: [
      {
        title: "Standards awareness & implementation",
        text: "Understand what a standard requires and how to build it into everyday operations.",
      },
      {
        title: "Internal auditor courses",
        text: "Equip your own people to plan, conduct and report effective internal audits.",
      },
      {
        title: "Lead auditor programmes",
        text: "Develop the competence needed to lead audits of management systems against recognized standards.",
      },
      {
        title: "Workshops for teams",
        text: "Focused, practical sessions tailored to your sector, your processes and your people.",
      },
    ],
    forWhom: [
      "Practitioners, managers and internal auditors building practical, recognized skills",
      "Quality, safety, environmental and information-security teams",
      "Professionals who want to build a career in auditing and assurance",
    ],
    steps: [
      { title: "Understand the need", text: "We learn about your people, your standard and the outcomes you want from the training." },
      { title: "Choose the format", text: "Public course, in-house session or workshop, in person or online." },
      { title: "Learn by doing", text: "Case studies, exercises and real examples rather than slide-reading." },
      { title: "Assess & recognise", text: "Participants are assessed on what they have learned and receive a record of completion." },
    ],
  },
  {
    slug: "cyber-security-audits",
    icon: "cyber",
    title: "Cyber Security Audits",
    short:
      "Independent audits of information security controls and practices, helping organizations identify gaps, manage risk and demonstrate assurance.",
    intro:
      "Information is one of your most valuable assets. Our cyber security audits give you an objective view of how well your controls, policies and practices protect it, measured against recognized frameworks such as ISO/IEC 27001.",
    highlights: [
      {
        title: "Information security audits",
        text: "Assess your information security management system against recognized standards and good practice.",
      },
      {
        title: "Gap & risk review",
        text: "Identify where controls are missing or ineffective, with findings prioritized by risk.",
      },
      {
        title: "Controls & process assessment",
        text: "Examine technical, organizational and physical controls as they operate in practice.",
      },
      {
        title: "Clear reporting",
        text: "A structured report with findings and recommendations that your team can act on.",
      },
    ],
    forWhom: [
      "Technology and software companies handling customer data",
      "Service providers asked by customers to demonstrate security assurance",
      "Any organization preparing for ISO/IEC 27001 or wanting an independent check of its security posture",
    ],
    steps: [
      { title: "Scope & planning", text: "Agree the systems, locations and standard in scope, and the audit plan." },
      { title: "Evidence gathering", text: "Document review, interviews and observation of controls in operation." },
      { title: "Findings & rating", text: "Gaps and risks are documented and rated so you know where to focus first." },
      { title: "Report & follow-up", text: "A clear audit report, with follow-up to verify that corrective actions are effective." },
    ],
  },
];

export const values = [
  {
    title: "Impartiality & Integrity",
    text: "We maintain strict independence and objectivity across audits, evaluations and certification decisions.",
  },
  {
    title: "Technical Competence",
    text: "We work with qualified auditors, assessors and trainers who understand real-world industry operations.",
  },
  {
    title: "Continuous Improvement",
    text: "We help clients move beyond box-checking to build sustainable processes, risk awareness and long-term performance.",
  },
];

export const audiences = [
  {
    title: "Organizations & Enterprises",
    text: "Businesses seeking independent verification of their systems, processes or products to meet customer, market or regulatory expectations.",
  },
  {
    title: "Professionals & Teams",
    text: "Practitioners, managers and internal auditors building practical skills and recognized credentials.",
  },
];

export const standards = [
  { code: "ISO 9001", name: "Quality Management" },
  { code: "ISO 14001", name: "Environmental Management" },
  { code: "ISO 45001", name: "Occupational Health & Safety" },
  { code: "ISO/IEC 27001", name: "Information Security" },
  { code: "ISO 22000", name: "Food Safety Management" },
  { code: "ISO 22301", name: "Business Continuity" },
  { code: "ISO 37001", name: "Anti-Bribery Management" },
  { code: "ISO 50001", name: "Energy Management" },
  { code: "ISO 41001", name: "Facility Management" },
];

export const journey = [
  { title: "Enquiry & application", text: "Tell us about your organization, scope and the standard you need." },
  { title: "Stage 1 review", text: "We review your documented system and confirm readiness." },
  { title: "Stage 2 audit", text: "Auditors assess how your system performs in practice." },
  { title: "Certification decision", text: "An independent review decides on certification." },
  { title: "Surveillance", text: "Periodic audits confirm continued conformity." },
  { title: "Re-certification", text: "A renewal assessment at the end of the cycle." },
];
