import { DEMO_PORTRAITS } from "./portraits";

export interface Alumnus {
  id: string;
  name: string;
  photo: string;
  graduationYear: number;
  formerRole: string;
  bio: string;
  currentRole?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
}

// DEMONSTRATION DATA ONLY. These are fictional names and stock portraits, not EDC alumni.
// Replace records with club-approved alumni information. Professional/social fields are intentionally omitted.
const names = ["Aarav Sharma", "Diya Iyer", "Kabir Banerjee", "Ishita Mehta", "Rohan Rao", "Meera Kapoor", "Vihaan Nair", "Ananya Ghosh", "Arjun Patel", "Saanvi Das", "Reyansh Singh", "Tara Menon", "Neel Chatterjee", "Kiara Joshi", "Dev Reddy", "Zoya Bose", "Aditya Sen", "Riya Verma"];
const roles = ["President", "General Secretary", "Tech Head", "Design Head", "Events Head", "Coordinator"];
export const ALUMNI: Alumnus[] = [2026, 2025, 2024, 2023, 2022].flatMap((graduationYear, y) => names.map((name, i) => ({
  id: `demo-alumni-${graduationYear}-${i + 1}`,
  name,
  photo: DEMO_PORTRAITS[(i + y * 3) % DEMO_PORTRAITS.length] ?? "",
  graduationYear,
  formerRole: roles[i % roles.length] ?? "Coordinator",
  bio: "A demonstration profile celebrating the people who turn ideas into a shared legacy. Replace this biography with the alumnus’s own story.",
})));