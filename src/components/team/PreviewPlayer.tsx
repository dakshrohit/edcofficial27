import { useEffect, useRef, useState } from "react";
import { Pause, Play, Loader2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Member } from "@/data/team";

let activePreview: HTMLAudioElement | null = null;

type Status = "idle" | "loading" | "playing" | "paused" | "error";

export function PreviewPlayer({ member }: { member: Member }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const hasPreview = Boolean(member.previewUrl);

  // Stop & release audio whenever the member changes or the card unmounts.
  useEffect(() => {
    setStatus("idle");
    setProgress(0);
    return () => {
      const a = audioRef.current;
      if (a) {
        a.pause();
        if (activePreview === a) activePreview = null;
        a.removeAttribute("src");
        a.load();
      }
      audioRef.current = null;
    };
  }, [member.id]);

  const toggle = async () => {
    if (!member.previewUrl) return;
    let a = audioRef.current;
    if (!a) {
      a = new Audio(member.previewUrl);
      a.preload = "auto";
      const audio = a;
      a.addEventListener("timeupdate", () => {
        const max = Math.min(audio.duration || 30, 30);
        setProgress(Math.min(1, audio.currentTime / max));
        if (audio.currentTime >= 30) { audio.pause(); audio.currentTime = 0; setProgress(0); setStatus("paused"); }
      });
      a.addEventListener("pause", () => setStatus("paused"));
      a.addEventListener("ended", () => { setStatus("paused"); setProgress(0); });
      a.addEventListener("error", () => setStatus("error"));
      audioRef.current = a;
    }
    if (!a.paused) { a.pause(); setStatus("paused"); return; }
    try {
      setStatus("loading");
      if (activePreview && activePreview !== a) activePreview.pause();
      activePreview = a;
      await a.play();
      if (audioRef.current !== a) { a.pause(); return; }
      setStatus("playing");
    } catch {
      setStatus("error");
    }
  };

  const label = !hasPreview ? "PREVIEW UNAVAILABLE"
    : status === "error" ? "PLAYBACK FAILED"
    : status === "loading" ? "LOADING…"
    : status === "playing" ? "NOW PLAYING" : "30s PREVIEW";

  return (
    <div className="border-[3px] border-ink bg-ink p-3 text-paper">
      <div className="flex items-center gap-3">
        <Button
          variant="brand"
          type="button"
          onClick={toggle}
          disabled={!hasPreview || status === "error"}
          aria-label={status === "playing" ? `Pause ${member.songTitle}` : `Play preview of ${member.songTitle}`}
          aria-pressed={status === "playing"}
          className="grid size-12 shrink-0 place-items-center border-2 border-paper bg-yellow text-ink brut-press disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status === "loading" ? <Loader2 className="size-5 animate-spin" /> : status === "playing" ? <Pause className="size-5" /> : <Play className="size-5" />}
        </Button>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] tracking-widest text-yellow" aria-live="polite">{label}</p>
          <p className="truncate font-display text-sm uppercase">{member.songTitle}</p>
          <p className="truncate text-xs opacity-75">{member.songArtist}</p>
        </div>
        {status === "playing" && (
          <div className="flex h-6 items-end gap-0.5" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="w-1 animate-pulse bg-yellow" style={{ height: `${40 + ((i * 23) % 60)}%`, animationDelay: `${i * 120}ms` }} />
            ))}
          </div>
        )}
      </div>
      <div className="mt-3 h-1.5 w-full bg-paper/20" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)} aria-label="Preview progress">
        <div className="h-full bg-yellow transition-[width]" style={{ width: `${progress * 100}%` }} />
      </div>
      {member.fullSongUrl ? (
        <a
          href={member.fullSongUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1 border-2 border-paper px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider hover:bg-paper hover:text-ink"
        >
          Listen to full song on {member.fullSongProvider ?? "streaming"} <ArrowUpRight className="size-3.5" />
        </a>
      ) : (
        <p className="mt-3 font-mono text-xs opacity-60">No full-song link provided.</p>
      )}
      <p className="mt-3 font-mono text-[10px] text-paper">Demo audio: royalty-free sample, not the named song.</p>
    </div>
  );
}
