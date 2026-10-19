import { createFileRoute } from "@tanstack/react-router";
import Home from "@/components/homepage/Home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EDC NIT Durgapur | Build What’s Next" },
      {
        name: "description",
        content:
          "NIT Durgapur’s student-led entrepreneurship community. Ideate, innovate and incubate with EDC.",
      },
      { property: "og:title", content: "EDC NIT Durgapur" },
      { property: "og:description", content: "A launchpad for ambitious student founders." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});
