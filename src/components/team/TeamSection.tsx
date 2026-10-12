import { useCallback, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ClientOnly } from "@tanstack/react-router";
import type { Member, TeamConfig } from "@/data/team";
import { TeamInfiniteMenu } from "./TeamInfiniteMenu";
import { ProfileCard } from "./ProfileCard";
import { Button } from "@/components/ui/button";


export function TeamSection({ config, members }: { config: TeamConfig; members: Member[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [listIndex, setListIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const selected = useMemo(() => members.find((m) => m.id === selectedId) ?? null, [members, selectedId]);

  const close = useCallback(() => {
    setSelectedId(null);
    stageRef.current?.querySelector<HTMLElement>(".infinite-menu")?.focus({ preventScroll: true });
  }, []);

  const step = (d: number) => {
    if (!members.length) return;
    const i = (listIndex + d + members.length) % members.length;
    setListIndex(i);
    const next = members[i];
    if (selectedId && next) setSelectedId(next.id);
  };

  const active = members[listIndex];

  return (
    <section id={config.id} data-accent={config.accent} aria-labelledby={`${config.id}-title`} className="team-section scroll-mt-4">
      <div className="page-container">
        <div className="team-heading">
          <span className="team-number">{config.index}</span>
          <div>
            <h2 id={`${config.id}-title`}>{config.title}</h2>
            <p>{config.description}</p>
          </div>
          <span className="team-count">
            {members.length} MEMBERS
          </span>
        </div>
      </div>

      <div ref={stageRef} className="page-container relative">
        <div className="team-stage">
          <ClientOnly fallback={<div className="grid size-full place-items-center font-mono text-sm">LOADING DIRECTORY…</div>}>
            <TeamInfiniteMenu
              members={members}
              teamTitle={config.title}
              accentColor="var(--lime)"
              selectedMemberId={selectedId}
              onActiveChange={setListIndex}
              onMemberSelect={(m) => { setSelectedId(m.id); setListIndex(members.indexOf(m)); }}
            />
          </ClientOnly>
        </div>

        {/* Accessible list navigation — complements the sphere on any device */}
        <div className="member-navigation">
          <Button variant="editorial" size="icon" onClick={() => step(-1)} disabled={!active} aria-label={`Previous ${config.title} member`} className="min-h-11 min-w-11"><ChevronLeft /></Button>
          <Button
            variant="editorial"
            onClick={() => { if (active) setSelectedId(active.id); }}
            disabled={!active}
            className="member-select"
          >
            <span>{String(listIndex + 1).padStart(2, "0")}/{members.length}</span>{" "}
            <b>{active?.name ?? "No members"}</b> <span>{active?.designation}</span>
          </Button>
          <Button variant="editorial" size="icon" onClick={() => step(1)} disabled={!active} aria-label={`Next ${config.title} member`} className="min-h-11 min-w-11"><ChevronRight /></Button>
        </div>

        {selected && <ProfileCard member={selected} teamTitle={config.title} onClose={close} />}
      </div>
    </section>
  );
}
