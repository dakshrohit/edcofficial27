import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import type { Member } from "@/data/team";
import { PreviewPlayer } from "./PreviewPlayer";
import { Button } from "@/components/ui/button";

export function ProfileCard({ member, teamTitle, onClose }: { member: Member; teamTitle: string; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => { setImgFailed(false); }, [member.id]);
  useEffect(() => { closeRef.current?.focus({ preventScroll: true }); }, [member.id]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const initials = member.name.split(" ").map((p) => p[0]).join("");

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby={`${member.id}-name`}
      className="profile-card pop-in fixed bottom-3 right-3 left-3 z-40 max-h-[85dvh] overflow-y-auto bg-card p-4 brut md:left-auto md:right-8 md:bottom-8 md:w-[360px] md:shadow-brut-lg"
    >
      <div className="flex items-start gap-3">
        <div className="size-24 shrink-0 overflow-hidden border-[3px] border-ink bg-yellow">
          {imgFailed ? (
            <div className="grid size-full place-items-center font-display text-2xl">{initials}</div>
          ) : (
            <img src={member.photo} alt={member.name} className="size-full object-cover" onError={() => setImgFailed(true)} />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{teamTitle}</p>
          <h3 id={`${member.id}-name`} className="font-display text-xl uppercase leading-none">{member.name}</h3>
          <p className="mt-2 inline-block bg-yellow px-1.5 py-0.5 text-xs font-bold uppercase">{member.designation}</p>
          {member.batch && <p className="mt-1 font-mono text-[11px] text-muted-foreground">{member.batch}</p>}
        </div>
        <Button variant="editorial" size="icon" ref={closeRef} type="button" onClick={onClose} aria-label="Close profile" className="min-h-11 min-w-11 shrink-0">
          <X className="size-4" />
        </Button>
      </div>
      <p className="my-4 border-l-4 border-ink pl-3 text-sm leading-relaxed">{member.bio || "No bio yet."}</p>
      <PreviewPlayer member={member} />
    </div>
  );
}
