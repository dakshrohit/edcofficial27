import * as React from "react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "../../styles/homepage/program-orbit.css";

const programs = [
  [
    "ROR",
    "Ring of Rivals",
    "A high-energy clash of strategy, instinct and entrepreneurial nerve.",
    "purple",
    "ROR-01",
    "2025",
  ],
  [
    "PITCH",
    "Pitchfest",
    "Put your boldest idea on the line and get real feedback from people who build.",
    "orange",
    "PF-02",
    "2025",
  ],
  [
    "SPARK",
    "Spark-a-thon",
    "A rapid-fire sprint where rough ideas become tested, tangible possibilities.",
    "blue",
    "SA-03",
    "2025",
  ],
  [
    "ARC",
    "Auction Arcadia",
    "Bid, bargain and build your way through a playful entrepreneurial challenge.",
    "green",
    "AA-04",
    "2025",
  ],
  [
    "TALK",
    "E-Talks",
    "Unfiltered conversations with founders who have failed, learned and built again.",
    "purple",
    "ET-05",
    "2025",
  ],
  [
    "EXPO",
    "Startup Expo",
    "Discover student ventures, meet their makers and find the next big thing early.",
    "orange",
    "SE-06",
    "2025",
  ],
  [
    "FAIR",
    "Internship Fair",
    "Make your next move with opportunities from startups, builders and ambitious teams.",
    "blue",
    "IF-07",
    "2025",
  ],
  [
    "QUIZ",
    "Quiz-a-preneur",
    "A fast, funny test of business instincts, culture and startup street-smarts.",
    "green",
    "QP-08",
    "2025",
  ],
] as const;
export default function ProgramOrbit() {
  const total = programs.length;
  const slot = total ? 360 / total : 0;
  const [activeIndex, setActiveIndex] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const counters = useRef<Array<HTMLDivElement | null>>([]);
  const gondolas = useRef<Array<HTMLDivElement | null>>([]);
  const drag = useRef<{ x: number; y: number; id: number; captured: boolean } | null>(null);
  const suppressClickUntil = useRef(0);
  const angle = useRef(0);
  const command = useRef<(index: number) => void>(() => undefined);
  const active = programs[activeIndex] ?? programs[0];

  const wrap = useCallback(
    (index: number) => (total > 0 ? ((Math.trunc(index) % total) + total) % total : 0),
    [total],
  );

  const move = useCallback(
    (direction: number) => {
      if (total) setActiveIndex((current) => wrap(current + direction));
    },
    [total, wrap],
  );

  useLayoutEffect(() => {
    if (!total) return;
    let shown = 0;
    let target = 0;
    let frame = 0;
    let disposed = false;
    let sways: Animation[] = [];

    const paint = (value: number) => {
      angle.current = value;
      if (wheelRef.current) wheelRef.current.style.transform = `rotate(${value}deg)`;
      counters.current.forEach((node) => {
        if (node) node.style.transform = `rotate(${-value}deg)`;
      });
    };

    const stopSway = () => {
      sways.forEach((animation) => animation.cancel());
      sways = [];
    };

    const sway = (direction: number) => {
      const swing = [0, -2.6, 0, 1.7, 0, -0.9, 0, 0.35, 0];
      sways = gondolas.current.flatMap((node) =>
        node
          ? [
              node.animate(
                swing.map((value) => ({ transform: `rotate(${value * direction}deg)` })),
                { duration: 340, easing: "ease-in-out" },
              ),
            ]
          : [],
      );
    };

    const begin = () => {
      if (shown === target || disposed || total < 2) return;
      stopSway();
      let distance = wrap(target - shown);
      if (distance > total / 2) distance -= total;
      const step = Math.sign(distance);
      const next = wrap(shown + step);
      const from = angle.current;
      const to = from + step * slot;
      const started = performance.now();

      const tick = (now: number) => {
        const progress = Math.min(1, (now - started) / 650);
        const tail = progress - 1;
        const spring = 1 + 2.2 * tail ** 3 + 1.2 * tail ** 2;
        paint(from + (to - from) * spring);

        if (progress < 1) {
          frame = requestAnimationFrame(tick);
          return;
        }

        frame = 0;
        paint(to);
        shown = next;
        if (shown !== target) begin();
        else if (!disposed) sway(step);
      };

      frame = requestAnimationFrame(tick);
    };

    paint(0);
    command.current = (index: number) => {
      target = wrap(index);
      if (!frame) begin();
    };

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      stopSway();
    };
  }, [slot, total, wrap]);

  useEffect(() => {
    command.current(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let lastWheel = -Infinity;
    let amount = 0;

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;
      event.preventDefault();
      const now = performance.now();
      if (now - lastWheel < 730) return;
      amount += Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      if (Math.abs(amount) < 14) return;
      move(Math.sign(amount));
      amount = 0;
      lastWheel = now;
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [move]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [move]);

  if (!active) return null;

  // Existing program tuple: [shortName, name, description, tone, code, year]
  type Palette = { top: string; bottom: string; accent: string };
  const defaultPalette: Palette = {
    top: "#0052FF",
    bottom: "#00F59B",
    accent: "#0052FF",
  };
  const toneClasses: Record<string, Palette> = {
    purple: { top: "#7916C4", bottom: "#D1FAA4", accent: "#7916C4" },
    orange: { top: "#FF5E1A", bottom: "#FFE600", accent: "#FF5E1A" },
    blue: { top: "#0052FF", bottom: "#00F59B", accent: "#0052FF" },
    green: { top: "#10B981", bottom: "#FDE047", accent: "#10B981" },
    pink: { top: "#EC4899", bottom: "#FBCFE8", accent: "#EC4899" },
  };

  const paletteFor = (tone: string): Palette => toneClasses[tone] ?? defaultPalette;

  return (
    <section className="program-orbit program-gallery-shell mx-auto w-full max-w-250 bg-[#0B0B0E] px-5 py-4 text-[#F4F4F6] antialiased lg:px-7">
      <header className="mb-3 flex items-end justify-between gap-4 border-b-2 border-[#272730] pb-3">
        <div>
          <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#8E8E9E]">
            A collection in motion
          </p>
          <h3 className="text-2xl font-extrabold uppercase tracking-tight text-white">
            Round &amp; round.
          </h3>
        </div>
        <span className="mb-0.5 border-2 border-[#383846] bg-[#16161D] px-2.5 py-1 font-mono text-[10px] font-bold text-[#00F59B] shadow-[3px_3px_0px_#000]">
          {String(total).padStart(2, "0")} EVENTS
        </span>
      </header>

      <div className="program-gallery-layout grid items-center gap-6 md:grid-cols-[1.6fr_1fr] md:gap-10">
        <div>
          <div
            ref={stageRef}
            className="relative mx-auto w-full max-w-100 select-none overflow-hidden pb-4 cursor-grab active:cursor-grabbing md:max-w-none"
            style={{ touchAction: "none" }}
            onPointerDown={(event) => {
              if (!event.isPrimary || event.button !== 0) return;
              drag.current = {
                id: event.pointerId,
                x: event.clientX,
                y: event.clientY,
                captured: false,
              };
            }}
            onPointerMove={(event) => {
              const start = drag.current;
              if (!start || start.id !== event.pointerId) return;
              if (
                !start.captured &&
                Math.hypot(event.clientX - start.x, event.clientY - start.y) > 8
              ) {
                event.currentTarget.setPointerCapture(event.pointerId);
                start.captured = true;
              }
            }}
            onPointerUp={(event) => {
              const start = drag.current;
              drag.current = null;
              if (!start || start.id !== event.pointerId) return;
              if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId);
              }
              const dx = event.clientX - start.x;
              const dy = event.clientY - start.y;
              const distance = Math.abs(dx) >= Math.abs(dy) ? dx : dy;
              if (start.captured) suppressClickUntil.current = performance.now() + 300;
              if (Math.abs(distance) >= 30) move(-Math.sign(distance));
            }}
            onPointerCancel={() => {
              drag.current = null;
            }}
          >
            <div className="program-orbit-canvas relative aspect-square">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 flex flex-col items-center gap-0.5 text-[#8E8E9E]"
              >
                <span className="border border-[#383846] bg-[#16161D] px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-[0.2em] text-[#00F59B] shadow-[2px_2px_0px_#000]">
                  ON VIEW
                </span>
                <svg
                  className="h-3.5 w-3.5 text-[#00F59B]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>

              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full text-white/15"
                viewBox="0 0 400 400"
                fill="none"
              >
                <path
                  d="M200 184 146 362M200 184 254 362M124 362H276"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>

              <div
                ref={wheelRef}
                className="program-wheel absolute left-[17%] top-[13%] h-[66%] w-[66%] rounded-full border-2 border-white/20"
                style={{ transform: "rotate(0deg)" }}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-[6%] rounded-full border border-white/10"
                />
                {Array.from({ length: 24 }, (_, light) => (
                  <span
                    key={`light-${light}`}
                    className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00F59B] shadow-[0_0_6px_#00F59B]"
                    style={{
                      left: `${50 + Math.sin((light * Math.PI) / 12) * 50}%`,
                      top: `${50 - Math.cos((light * Math.PI) / 12) * 50}%`,
                    }}
                  />
                ))}

                {programs.map(([shortName, name, , tone], index) => {
                  const radians = (-index * slot * Math.PI) / 180;
                  const isActive = index === activeIndex;
                  const palette = paletteFor(tone);
                  return (
                    <React.Fragment key={shortName}>
                      <span
                        aria-hidden="true"
                        className="absolute left-1/2 top-1/2 h-[1.5px] w-1/2 origin-left bg-white/15"
                        style={{ transform: `rotate(${-90 - index * slot}deg)` }}
                      />
                      <div
                        className="program-gondola-anchor absolute z-10"
                        style={{
                          left: `${50 + Math.sin(radians) * 50}%`,
                          top: `${50 - Math.cos(radians) * 50}%`,
                          width: "34%",
                          zIndex: isActive ? 20 : 10,
                        }}
                      >
                        <div
                          ref={(node) => {
                            counters.current[index] = node;
                          }}
                          className="relative origin-top-left"
                        >
                          <div className="program-gondola absolute left-0 top-0 w-full">
                            <div
                              ref={(node) => {
                                gondolas.current[index] = node;
                              }}
                              className="relative origin-top"
                            >
                              <span
                                aria-hidden="true"
                                className="mx-auto block h-2.5 w-0.5 bg-white/40"
                              />
                              <button
                                type="button"
                                aria-label={`View ${name}`}
                                onClick={() => {
                                  if (performance.now() >= suppressClickUntil.current)
                                    setActiveIndex(index);
                                }}
                                className={`program-event-card program-poster-card tone-${tone} relative block w-full cursor-pointer overflow-hidden border-2 bg-black p-1 text-left transition-all ${
                                  isActive
                                    ? "border-[#00F59B] ring-2 ring-[#00F59B]/40 shadow-[5px_5px_0px_#00F59B]"
                                    : "border-black shadow-[4px_4px_0px_#000] hover:border-white/50"
                                }`}
                                style={{
                                  transform: `scale(${isActive ? 1.12 : 1})`,
                                  transformOrigin: "top center",
                                  transition: "transform 320ms ease",
                                }}
                              >
                                <span
                                  className="program-card-art relative block"
                                  style={{ backgroundColor: palette.top }}
                                >
                                  <span className="program-card-art-mark" aria-hidden="true">
                                    {shortName.slice(0, 1)}
                                  </span>
                                </span>
                                <span
                                  className="program-card-body flex flex-col text-black"
                                  style={{ backgroundColor: palette.bottom }}
                                >
                                  <strong className="program-card-title">{name}</strong>
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-[46%] z-10 flex h-[18%] w-[18%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-2 border-[#383846] bg-[#16161D] shadow-[4px_4px_0px_#000]"
              >
                <strong className="font-mono text-lg font-bold leading-none tracking-tight text-white">
                  {String(total).padStart(2, "0")}
                </strong>
                <span className="mt-1 text-[8px] font-bold leading-none tracking-[0.14em] text-[#8E8E9E]">
                  EVENTS
                </span>
              </div>
            </div>
          </div>
          <p className="mt-1 text-center font-mono text-[10px] font-bold tracking-wide text-[#8E8E9E]">
            Drag to explore <span className="px-1.5 text-[#383846]">/</span> Scroll or use ← →
          </p>
        </div>

        <motion.article
          key={active[0]}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="grid min-w-0 grid-cols-1 gap-5"
        >
          <div className="relative flex aspect-[1.15] flex-col justify-between overflow-hidden border-[3px] border-black shadow-[8px_8px_0px_#000]">
            <div
              className="flex items-center justify-between border-b-2 border-black p-4"
              style={{ backgroundColor: paletteFor(active[3]).top }}
            >
              <span className="border-2 border-black bg-black px-2 py-1 font-mono text-xs font-black text-white shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">
                EDC / EVENT / {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <div className="flex gap-1">
                <i className="h-3 w-3 rounded-full bg-black" />
                <i className="h-3 w-3 rounded-full bg-black/40" />
              </div>
            </div>
            <div
              className="flex flex-1 flex-col justify-between p-6 text-black"
              style={{ backgroundColor: paletteFor(active[3]).bottom }}
            >
              <div className="flex items-center justify-between border-b-2 border-black/30 pb-2">
                <strong className="bg-black px-2 py-0.5 font-mono text-sm text-white">
                  {active[4]}
                </strong>
                <strong className="font-mono text-sm">{active[5]}</strong>
              </div>
              <div>
                <h3 className="text-4xl font-black uppercase leading-[0.9] tracking-tight md:text-5xl">
                  {active[1]}
                </h3>
                <p className="mt-3 border-l-4 border-black pl-3 text-xs font-bold leading-relaxed opacity-90 md:text-sm">
                  {active[2]}
                </p>
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <div className="mt-2 flex items-center gap-2.5">
              <button
                type="button"
                aria-label="Previous event"
                onClick={() => move(-1)}
                className="flex h-9 w-9 cursor-pointer items-center justify-center border-2 border-[#383846] bg-[#16161D] text-white shadow-[3px_3px_0px_#000] hover:border-white active:translate-x-px active:translate-y-px active:shadow-none"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="square"
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next event"
                onClick={() => move(1)}
                className="flex h-9 w-9 cursor-pointer items-center justify-center border-2 border-black bg-[#00F59B] text-black shadow-[3px_3px_0px_#000] hover:brightness-110 active:translate-x-px active:translate-y-px active:shadow-none"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="square"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
              <span className="ml-auto font-mono text-[11px] font-bold tabular-nums text-[#8E8E9E]">
                <strong className="text-white">{String(activeIndex + 1).padStart(2, "0")}</strong>
                <span className="px-1 text-[#383846]">/</span>
                {String(total).padStart(2, "0")}
              </span>
            </div>
          </div>
        </motion.article>
      </div>

      <footer className="mt-4 flex min-h-8 items-center justify-between gap-3 border-t-2 border-[#272730] pt-2 font-mono text-[10px] font-bold text-[#8E8E9E]">
        <span>Eight events. A different point of view.</span>
        <button
          type="button"
          onClick={() => setActiveIndex(0)}
          className="flex cursor-pointer items-center gap-1.5 border border-[#383846] bg-[#16161D] px-2.5 py-1 text-white shadow-[2px_2px_0px_#000] hover:border-[#00F59B]"
        >
          <svg
            className="h-3 w-3 text-[#00F59B]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="square"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          Replay demo
        </button>
      </footer>
    </section>
  );
}
