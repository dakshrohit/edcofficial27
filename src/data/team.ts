import { DEMO_PORTRAITS } from "./portraits";
// Mock club data. Replace these arrays with real club data — components only depend on the types.

export type TeamId = "post-bearers" | "senior-coordinators" | "junior-coordinators";

export interface Member {
  id: string;
  name: string;
  photo: string;
  designation: string;
  team: TeamId;
  bio: string;
  batch?: string | undefined;
  songTitle: string;
  songArtist: string;
  previewUrl?: string | undefined;
  fullSongUrl?: string | undefined;
  fullSongProvider?: string | undefined;
}

export interface TeamConfig {
  id: TeamId;
  index: string;
  title: string;
  description: string;
  accent: "yellow" | "cobalt" | "coral";
}

const photo = (i: number) => DEMO_PORTRAITS[i % DEMO_PORTRAITS.length] ?? "";

const FIRST = ["Aarav", "Diya", "Kabir", "Ishita", "Rohan", "Meera", "Vihaan", "Ananya", "Arjun", "Saanvi", "Reyansh", "Tara", "Neel", "Kiara", "Dev", "Zoya", "Aditya", "Riya", "Kunal", "Nisha", "Yash", "Pooja", "Siddharth", "Aisha", "Rahul", "Sneha", "Om", "Lavanya", "Ved", "Mira"];
const LAST = ["Sharma", "Iyer", "Banerjee", "Mehta", "Rao", "Kapoor", "Nair", "Ghosh", "Patel", "Das", "Singh", "Menon", "Chatterjee", "Joshi", "Reddy", "Bose", "Kulkarni", "Sen", "Verma", "Pillai"];

const SONGS: [string, string, string][] = [
  ["Midnight City", "M83", "https://open.spotify.com/search/Midnight%20City%20M83"],
  ["Blinding Lights", "The Weeknd", "https://open.spotify.com/search/Blinding%20Lights"],
  ["Kun Faya Kun", "A.R. Rahman", "https://open.spotify.com/search/Kun%20Faya%20Kun"],
  ["Electric Feel", "MGMT", "https://open.spotify.com/search/Electric%20Feel"],
  ["Tum Hi Ho", "Arijit Singh", "https://open.spotify.com/search/Tum%20Hi%20Ho"],
  ["Do I Wanna Know?", "Arctic Monkeys", "https://open.spotify.com/search/Do%20I%20Wanna%20Know"],
  ["Levitating", "Dua Lipa", "https://open.spotify.com/search/Levitating"],
  ["Amplifier", "Imran Khan", "https://open.spotify.com/search/Amplifier%20Imran%20Khan"],
];

// Royalty-free sample tracks used as stand-in previews.
const PREVIEWS = Array.from({ length: 8 }, (_, i) => `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${i + 1}.mp3`);

const BIOS = [
  "Runs on chai and deadlines. Turns chaotic ideas into events people remember.",
  "Designs the posters you stop to read. Believes kerning is a moral issue.",
  "Logistics brain of the club — if it showed up on time, thank them.",
  "Writes the copy, edits the reels, and somehow still makes every meeting.",
  "Started as a volunteer, stayed for the people. Now mentors the new batch.",
  "Codes the club website by night, debates film theory by day.",
];

const ROLES: Record<TeamId, string[]> = {
  "post-bearers": ["President", "Vice President", "General Secretary", "Treasurer", "Joint Secretary", "Creative Head", "Tech Head", "Events Head", "PR Head", "Design Head", "Content Head", "Operations Head", "Sponsorship Head", "Outreach Head", "Media Head", "Logistics Head", "Finance Lead", "Community Lead", "Workshop Lead", "Archive Lead"],
  "senior-coordinators": ["Senior Coordinator"],
  "junior-coordinators": ["Junior Coordinator"],
};
const DOMAINS = ["Design", "Tech", "Events", "Media", "Content", "Outreach", "Ops"];

function makeTeam(team: TeamId, offset: number, batch: string): Member[] {
  return Array.from({ length: 20 }, (_, i) => {
    const n = i + offset;
    const song = SONGS[n % SONGS.length] ?? SONGS[0] ?? ["", "", ""];
    const roles = ROLES[team];
    const designation = roles.length > 1 ? roles[i] ?? "Coordinator" : `${roles[0] ?? "Coordinator"} · ${DOMAINS[i % DOMAINS.length]}`;
    return {
      id: `${team}-${i + 1}`,
      name: `${FIRST[n % FIRST.length]} ${LAST[(n * 7) % LAST.length]}`,
      photo: photo(n),
      designation,
      team,
      bio: BIOS[n % BIOS.length] ?? "",
      batch,
      songTitle: song[0],
      songArtist: song[1],
      previewUrl: n % 5 === 3 ? "" : PREVIEWS[n % PREVIEWS.length],
      fullSongUrl: song[2],
      fullSongProvider: "Spotify",
    };
  });
}

export const TEAMS: TeamConfig[] = [
  { id: "post-bearers", index: "01", title: "Post Bearers", description: "The core council. They set the direction, hold the budget, and answer the hard emails.", accent: "yellow" },
  { id: "senior-coordinators", index: "02", title: "Senior Coordinators", description: "Domain leads who turn plans into posters, code, stages and sold-out workshops.", accent: "cobalt" },
  { id: "junior-coordinators", index: "03", title: "Junior Coordinators", description: "The newest crew. Loud ideas, fast hands, and the future of the club.", accent: "coral" },
];

export const MEMBERS: Record<TeamId, Member[]> = {
  "post-bearers": makeTeam("post-bearers", 0, "Batch of 2027"),
  "senior-coordinators": makeTeam("senior-coordinators", 20, "Batch of 2028"),
  "junior-coordinators": makeTeam("junior-coordinators", 40, "Batch of 2029"),
};
