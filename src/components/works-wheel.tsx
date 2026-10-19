// Adapted from CrafterUI's Works Wheel: https://crafterui.com/r/works-wheel.json
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WorksWheel({
  items,
  renderItem,
}: {
  items: { title: string }[];
  renderItem: (index: number) => ReactNode;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const turn = useRef(1);
  const target = useRef(1);
  const drag = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [overview, setOverview] = useState(false);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const move = useCallback(
    (next: number) => {
      target.current = Math.max(0, Math.min(items.length, next));
      setOverview(target.current === 0);
    },
    [items.length],
  );

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    const observer = new ResizeObserver(read);
    read();
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!size.w) return;
    const el = stageRef.current;
    if (!el) return;
    let frame = 0;
    let visible = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
    });
    observer.observe(el);
    const cardW = Math.min(340, size.w * 0.86);
    const cardH = 410;
    const drumR = cardH * 2.22;
    const ringR = Math.min(size.w * 0.3, 230);
    const ringScale = Math.min(0.45, (((2 * Math.PI * ringR) / items.length) * 0.82) / cardW);
    el.style.perspective = `${cardH * 2.7}px`;
    const draw = () => {
      frame = requestAnimationFrame(draw);
      if (!visible) return;
      const gap = target.current - turn.current;
      turn.current =
        Math.abs(gap) < 0.0005 ? target.current : turn.current + gap * (reduced.matches ? 1 : 0.12);
      const m = Math.min(1, turn.current);
      const pos = Math.max(0, turn.current - 1);
      if (wheelRef.current) wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`;
      cards.current.forEach((card, i) => {
        if (!card) return;
        const d = i - pos;
        const deg = d * 40;
        const bow = -cardH * 1.82 * (1 - Math.cos((deg * Math.PI) / 180));
        card.style.width = `${cardW}px`;
        card.style.height = `${cardH}px`;
        card.style.marginLeft = `${-cardW / 2}px`;
        card.style.marginTop = `${-cardH / 2}px`;
        card.style.transform = `translateX(${m * bow}px) rotateZ(${((1 - m) * d * 360) / items.length}deg) translateY(${-(1 - m) * ringR}px) rotateX(${m * deg}deg) translateZ(${m * drumR}px)`;
        card.style.opacity = m > 0.5 && Math.abs(d) > 1.6 ? "0" : "1";
        card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
        const face = card.firstElementChild;
        if (face instanceof HTMLElement)
          face.style.transform = `scale(${ringScale + (1 - ringScale) * m})`;
      });
      setActive(Math.max(0, Math.min(items.length - 1, Math.round(pos))));
    };
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [size, items.length]);

  return (
    <section
      className="works-wheel"
      aria-label="Internship Fair startups carousel"
      aria-roledescription="carousel"
    >
      <div
        className="works-stage"
        ref={stageRef}
        tabIndex={0}
        onKeyDown={(event) => {
          if (["ArrowDown", "ArrowRight"].includes(event.key)) {
            event.preventDefault();
            move(Math.round(target.current) + 1);
          }
          if (["ArrowUp", "ArrowLeft"].includes(event.key)) {
            event.preventDefault();
            move(Math.max(1, Math.round(target.current) - 1));
          }
          if (event.key === "Home") {
            event.preventDefault();
            move(1);
          }
          if (event.key === "End") {
            event.preventDefault();
            move(items.length);
          }
        }}
        onPointerDown={(event) => {
          drag.current = event.clientX;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={(event) => {
          if (drag.current === null) return;
          const delta = drag.current - event.clientX;
          if (Math.abs(delta) > 30)
            move(Math.max(1, Math.round(target.current) + (delta > 0 ? 1 : -1)));
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        <div className="works-wheel-axis" ref={wheelRef}>
          {items.map((item, i) => (
            <div
              className="works-wheel-slot"
              key={item.title}
              aria-hidden={overview || i !== active}
              ref={(node) => {
                cards.current[i] = node;
              }}
            >
              {renderItem(i)}
            </div>
          ))}
        </div>
        {overview && (
          <span className="works-overview-label">
            FOUNDERS
            <br />× TALENT
          </span>
        )}
      </div>
      <div className="works-index">
        {items.map((item, i) => (
          <Button
            variant="ghost"
            className={`works-index-link ${i === active && !overview ? "is-active" : ""}`}
            key={item.title}
            onClick={() => move(i + 1)}
            aria-pressed={i === active && !overview}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            {item.title}
          </Button>
        ))}
      </div>
      <div className="wheel-controls">
        <span aria-live="polite">
          {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="brutal-icon"
          title="Previous startup"
          aria-label="Previous startup"
          disabled={!overview && active === 0}
          onClick={() => move(Math.max(1, active))}
        >
          <ArrowLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="brutal-icon"
          title="Show wheel overview"
          aria-label="Show wheel overview"
          aria-pressed={overview}
          onClick={() => move(overview ? active + 1 : 0)}
        >
          <RotateCcw />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="brutal-icon"
          title="Next startup"
          aria-label="Next startup"
          disabled={!overview && active === items.length - 1}
          onClick={() => move(overview ? 1 : active + 2)}
        >
          <ArrowRight />
        </Button>
      </div>
    </section>
  );
}
