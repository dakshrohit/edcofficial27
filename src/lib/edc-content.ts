export const initiatives = [
  {
    name: "E-SUMMIT",
    category: "Our flagship festival",
    description:
      "Eastern India's second-largest entrepreneurship fest brings student innovation to the forefront through competitions, discussions, and a meeting of entrepreneurial minds.",
  },
  {
    name: "E-TALKS",
    category: "Stories that spark ideas",
    description:
      "A highlight of E-Summit, E-Talks brings influential speakers and successful entrepreneurs to share their journeys, insights, and advice.",
  },
  {
    name: "STARTUP-EXPO",
    category: "Ideas meet investors",
    description:
      "Real-life startups visit our campus to showcase their innovations and pitch their ideas to seasoned investors.",
  },
  {
    name: "PITCHFEST",
    category: "Pitch your next big thing",
    description:
      "E-Summit's flagship pitching event connects aspiring entrepreneurs with experienced professionals, giving participants a platform to present their ideas.",
  },
  {
    name: "INTERNSHIP FAIR",
    category: "Talent meets opportunity",
    description:
      "Companies connect with students at E-Summit to offer internships across fields including sales and video editing.",
  },
  {
    name: "HULT PRIZE",
    category: "Business for a better world",
    description:
      "The world's largest student social entrepreneurship competition, run in partnership with the United Nations, encourages students to tackle global challenges.",
  },
  {
    name: "BIZZCUP",
    category: "Our signature fresher's event",
    description:
      "Three strategic rounds put corporate knowledge, marketing, and problem-solving skills to the test.",
  },
] as const;

export type Initiative = (typeof initiatives)[number];
