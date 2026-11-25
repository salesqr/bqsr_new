export const countries = [
  "India", "United Arab Emirates", "Saudi Arabia", "Kuwait", "Qatar", "Oman", "Bahrain", "Iraq", "Egypt", "Nigeria",
  "South Africa", "Kenya", "Ghana", "Ethiopia", "Tanzania", "Uganda", "Morocco", "Algeria", "Tunisia",
  "United Kingdom", "Ireland", "Germany", "France", "Italy", "Spain", "Portugal", "Netherlands", "Belgium",
  "Switzerland", "Austria", "Sweden", "Norway", "Denmark", "Finland", "Poland", "Turkey", "Greece", "Romania",
  "United States", "Canada", "Mexico", "Brazil", "Argentina", "Chile", "Colombia", "Peru",
  "Bangladesh", "Sri Lanka", "Nepal", "Pakistan", "Bhutan", "Maldives", "Malaysia", "Singapore", "Indonesia",
  "Thailand", "Vietnam", "Philippines", "China", "Hong Kong", "Japan", "South Korea", "Taiwan",
  "Australia", "New Zealand", "Russia", "Ukraine", "Kazakhstan", "Uzbekistan", "Jordan", "Lebanon", "Israel",
];

export const commonStandards = [
  "ISO 9001:2015",
  "ISO 14001:2015",
  "ISO 45001:2018",
  "ISO/IEC 27001:2022",
  "ISO 22000:2018",
  "ISO 22301:2019",
  "ISO 37001:2016",
  "ISO 50001:2018",
  "ISO 41001:2018",
];

export const statuses = ["Active", "Suspended", "Withdrawn", "Expired"] as const;
export type CertStatus = (typeof statuses)[number];
