import { useMemo, useState } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { WheelCarousel, type WheelCarouselItem } from "@/components/ui/wheel-carousel";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Alumnus } from "@/data/alumni";

function BatchWheel({ alumni }: { alumni: Alumnus[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const mobile = useIsMobile();
  const items = useMemo<WheelCarouselItem[]>(() => alumni.map(a => ({ label: a.name, image: a.photo, imageAlt: `${a.name} — demonstration portrait` })), [alumni]);
  const selected = alumni[activeIndex];
  if (!selected) return <p>No alumni in this batch yet.</p>;
  const step = (amount: number) => setActiveIndex(index => (index + amount + alumni.length) % alumni.length);
  return <>
    <div className="alumni-composition">
      <div className="alumni-wheel">
        <WheelCarousel items={items} mode="custom" activeIndex={activeIndex} initialIndex={0} onActiveChange={(_, index) => setActiveIndex(index)}
          background="var(--paper)" panelColor="var(--paper)" textColor="var(--muted-foreground)" selectedColor="var(--black)" markerColor="var(--lime)"
          photoWidth={mobile ? 40 : 38} photoAspect="3/4" photoRadius={0} contentWidth={800} gap={mobile ? 10 : 24}
          radius={mobile ? 190 : 290} spacing={mobile ? 19 : 15} visibleItems={mobile ? 3 : 5} apexInset={mobile ? 18 : 20}
          markerGap={8} markerSize={8} edgeFade={false} appear={false} momentum={false} crossfadeDuration={0.18}
          photoClassName="wheel-photo" itemClassName="wheel-label" />
      </div>
      <article className="alumni-details" aria-live="polite" aria-atomic="true">
        <p className="font-mono text-xs uppercase">Class of {selected.graduationYear} <span className="text-muted-foreground">/ {String(activeIndex + 1).padStart(2, "0")} of {alumni.length}</span></p>
        <h3>{selected.name}</h3>
        <p className="role">Former {selected.formerRole}</p>
        <p className="bio">{selected.bio}</p>
        {selected.currentRole && <p className="mt-4 font-bold">{selected.currentRole}</p>}
        <div className="mt-4 flex gap-4">
          {selected.linkedinUrl && <a href={selected.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 underline">LinkedIn <ArrowUpRight className="size-4" /></a>}
          {selected.portfolioUrl && <a href={selected.portfolioUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 underline">Portfolio <ArrowUpRight className="size-4" /></a>}
        </div>
      </article>
    </div>
    <div className="alumni-controls">
      <Button variant="editorial" size="icon" className="min-h-11 min-w-11" onClick={() => step(-1)} aria-label="Previous alumnus"><ArrowLeft /></Button>
      <label><span className="sr-only">Select alumnus</span><select value={selected.id} onChange={e => { const index = alumni.findIndex(a => a.id === e.target.value); if (index >= 0) setActiveIndex(index); }}>{alumni.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}</select></label>
      <Button variant="editorial" size="icon" className="min-h-11 min-w-11" onClick={() => step(1)} aria-label="Next alumnus"><ArrowRight /></Button>
    </div>
  </>;
}

export function AlumniWheel({ alumni }: { alumni: Alumnus[] }) {
  const years = useMemo(() => [...new Set(alumni.map(a => a.graduationYear))].sort((a, b) => b - a), [alumni]);
  const [year, setYear] = useState(years[0] ?? 2026);
  const batch = useMemo(() => alumni.filter(a => a.graduationYear === year), [alumni, year]);
  return <section id="alumni" aria-labelledby="alumni-title" className="alumni-section light-section">
    <div className="page-container">
      <div className="alumni-heading"><div><p className="section-eyebrow">04 / The EDC legacy</p><h2 id="alumni-title" className="alumni-title">The ones<br />who built it.</h2></div><p>Different batches.<br />Different journeys.<br />One shared legacy.</p></div>
      <nav className="year-navigation" aria-label="Graduation year">{years.map(y => <Button key={y} variant={year === y ? "brand" : "editorial"} aria-pressed={year === y} onClick={() => setYear(y)}>{y}</Button>)}</nav>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3"><p className="font-mono text-xs uppercase">Batch {year} · {batch.length} alumni</p><p className="demo-note">Demonstration data · fictional profiles & stock portraits</p></div>
      <ClientOnly fallback={<div className="alumni-wheel" />}><BatchWheel key={year} alumni={batch} /></ClientOnly>
    </div>
  </section>;
}