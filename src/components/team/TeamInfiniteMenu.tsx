import { memo, useMemo } from "react";
import InfiniteMenu from "@/components/reactbits/InfiniteMenu";
import type { Member } from "@/data/team";

interface Props {
  members: Member[];
  teamTitle: string;
  accentColor: string;
  selectedMemberId: string | null;
  onMemberSelect: (m: Member) => void;
  onActiveChange?: (index: number) => void;
}

function resolveColor(v: string) {
  if (typeof window === "undefined" || !v.startsWith("var(")) return v;
  const name = v.slice(4, -1);
  const el = document.createElement("div");
  el.style.color = `var(${name})`;
  document.body.appendChild(el);
  const c = getComputedStyle(el).color;
  el.remove();
  return c;
}

/** Wraps the ReactBits Infinite Menu, mapping club members to its item format. */
export const TeamInfiniteMenu = memo(function TeamInfiniteMenu({ members, teamTitle, accentColor, onMemberSelect, onActiveChange }: Props) {
  const items = useMemo(
    () => members.map((m) => ({ id: m.id, image: m.photo, title: m.name, description: m.designation })),
    [members],
  );
  const accent = useMemo(() => resolveColor(accentColor), [accentColor]);
  const bg = useMemo(() => resolveColor("var(--black)"), []);
  const byId = useMemo(() => new Map(members.map((m) => [m.id, m])), [members]);

  return (
    <div className="team-menu size-full" aria-label={`${teamTitle} directory`}>
      <InfiniteMenu
        items={items}
        theme="dark"
        accentColor={accent}
        backgroundColor={bg}
        roundness={0}
        autoplay={0}
        onActiveChange={(_: unknown, i: number) => onActiveChange?.(i)}
        onItemClick={(item: { id: string }) => {
          const m = byId.get(item.id);
          if (m) onMemberSelect(m);
        }}
      />
    </div>
  );
});
