import logo from "@/assets/edc-logo.png.asset.json";

// Destinations not present in this project stay null until WebD supplies a real URL.
export const SITE_NAV = [
  { label: "Home", href: "https://edcnitd.co.in/" },
  { label: "Startups", href: null },
  { label: "Internships", href: null },
  { label: "Consultancy", href: null },
  { label: "Sponsors", href: "https://edcnitd.co.in/sponsors/" },
  { label: "E-Quest", href: "https://edcnitd.co.in/EQuest/" },
  { label: "SoTM", href: "https://edcnitd.co.in/sotm/" },
  { label: "Our Team", href: "/" },
  { label: "IIC", href: "https://nitdgp.ac.in/iicpage/" },
] as const;

// Verified against https://edcnitd.co.in/ on 12 October 2026.
export const EDC = {
  logo: logo.url,
  name: "Entrepreneurship & Development Cell",
  institution: "NIT Durgapur",
  address: "Mahatma Gandhi Avenue, A-Zone, Durgapur, West Bengal 713209",
  email: "edc@nitdgp.ac.in",
  phone: "+91 70076 47720",
  phoneContact: "Sanvie Singhal",
  joinUrl: "https://audition.edcnitd.co.in",
  instagram: "https://www.instagram.com/edc.nitd",
  linkedin: "https://www.linkedin.com/company/edcnitd/",
};