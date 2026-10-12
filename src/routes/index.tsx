import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MEMBERS, TEAMS } from "@/data/team";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeamSection } from "@/components/team/TeamSection";
import { ALUMNI } from "@/data/alumni";
import { AlumniWheel } from "@/components/team/AlumniWheel";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Our Team — EDC NIT Durgapur" },
      { name: "description", content: "Meet the Entrepreneurship & Development Cell at NIT Durgapur: current teams and alumni legacy." },
      { property: "og:title", content: "Our Team — EDC NIT Durgapur" },
      { property: "og:description", content: "The people behind EDC NIT Durgapur: student-led ideas, innovation, and entrepreneurship." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TeamsPage,
});

function TeamsPage() {
  const [teamId, setTeamId] = useState("post-bearers");
  const activeTeam = TEAMS.find(team => team.id === teamId) ?? TEAMS[0];
  const total = TEAMS.reduce((n, team) => n + MEMBERS[team.id].length, 0);
  const links = [{ href: "#current-teams", label: "Current Teams" }, { href: "#alumni", label: "Alumni" }];
  return <>
    <header className="teams-hero">
      <div className="page-container">
        <div className="hero-meta"><span>EDC / NIT Durgapur</span><span>Entrepreneurship & Development Cell</span></div>
        <div className="hero-main">
          <h1 className="hero-title">Meet the<br /><span>team.</span><ArrowUpRight className="ml-3 inline size-16 align-bottom text-primary md:size-24" strokeWidth={1.5} /></h1>
          <div className="hero-aside"><p>The people who turn<br />“what if” into what’s next.<br />One cell. A collective ambition.</p><div className="hero-count"><strong>{total}</strong><span>Current members<br />Three teams / One EDC</span></div></div>
        </div>
        <div className="hero-jumps">{links.map((link, index) => <a key={link.href} href={link.href}><span>{String(index + 1).padStart(2, "0")}</span>{link.label}<ArrowDownRight className="size-4" /></a>)}</div>
        <p className="demo-note mt-3">Demonstration directory · fictional members and stock portraits</p>
      </div>
    </header>
    <Tabs id="current-teams" value={teamId} onValueChange={setTeamId} className="team-directory scroll-mt-4">
      <div className="page-container">
        <TabsList aria-label="Current team" className="team-options">
          {TEAMS.map(team => <TabsTrigger key={team.id} value={team.id} className="team-option"><span>{team.index}</span>{team.title}</TabsTrigger>)}
        </TabsList>
      </div>
      {activeTeam && <TabsContent key={activeTeam.id} value={activeTeam.id} className="mt-0"><TeamSection config={activeTeam} members={MEMBERS[activeTeam.id]} /></TabsContent>}
    </Tabs>
    <div className="legacy-transition" aria-hidden="true"><span>Built together. Carried forward.</span><ArrowDownRight className="size-7" /></div>
    <AlumniWheel alumni={ALUMNI} />
  </>;
}
