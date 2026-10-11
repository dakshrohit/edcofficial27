import { useEffect, useMemo, useRef, type CSSProperties, type PointerEvent } from "react";

type SpiralItem = { src: string; alt: string; name?: string };

type InfiniteSpiralProps = {
  items: SpiralItem[];
  speed?: number;
  direction?: "up" | "down";
  animationMode?: "auto" | "scroll" | "all" | "drag";
  radius?: number;
  cardWidth?: number;
  cardHeight?: number;
  verticalSpacing?: number;
  perspective?: number;
  cardsPerTurn?: number;
  rotation?: number;
  cardTilt?: number;
  cardRadius?: number;
  centerScale?: number;
  pauseOnHover?: boolean;
  imageFit?: "cover" | "contain";
  grayscale?: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const modulo = (value: number, divisor: number) => ((value % divisor) + divisor) % divisor;

export default function InfiniteSpiral({
  items,
  speed = 0.55,
  direction = "up",
  animationMode = "auto",
  radius = 170,
  cardWidth = 100,
  cardHeight = 100,
  verticalSpacing = 60,
  perspective = 1000,
  cardsPerTurn = 7,
  rotation = 0,
  cardTilt = 0,
  cardRadius = 10,
  centerScale = 1.2,
  pauseOnHover = true,
  imageFit = "cover",
  grayscale = 1,
}: InfiniteSpiralProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const draggingRef = useRef(false);
  const hoveredRef = useRef(false);
  const lastPointerYRef = useRef(0);
  const dragMovedRef = useRef(false);
  const normalizedItems = useMemo(() => items, [items]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || normalizedItems.length === 0) return;
    let frameId = 0;
    let previousTime = performance.now();
    let bounds = root.getBoundingClientRect();
    let lastScrollY = window.scrollY;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scrollEnabled = animationMode === "scroll" || animationMode === "all";
    const autoEnabled = animationMode === "auto" || animationMode === "all";
    const resizeObserver = new ResizeObserver(() => (bounds = root.getBoundingClientRect()));
    resizeObserver.observe(root);
    const handleScroll = () => {
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      if (scrollEnabled)
        targetProgressRef.current += clamp(delta / Math.max(verticalSpacing * 2, 1), -1.5, 1.5);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const render = (time: number) => {
      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;
      const paused = draggingRef.current || (pauseOnHover && hoveredRef.current);
      if (autoEnabled && !reducedMotion.matches && !paused) {
        targetProgressRef.current += speed * (direction === "down" ? -1 : 1) * delta;
      }
      const followBlend = 1 - Math.exp(-delta * (draggingRef.current ? 22 : 11));
      progressRef.current += (targetProgressRef.current - progressRef.current) * followBlend;
      const count = normalizedItems.length;
      const half = count / 2;
      const fit = Math.min(
        1,
        bounds.width / (cardWidth * 2.8),
        bounds.height / (cardHeight * 2.35),
      );
      const responsiveRadius = Math.min(radius, Math.max(72, bounds.width * 0.36)) * fit;
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const offset = modulo(index - progressRef.current + half, count) - half;
        const focus = 1 - Math.min(Math.abs(offset) / Math.max(cardsPerTurn * 0.65, 1), 1);
        const scale = (1 + (centerScale - 1) * focus) * fit;
        const angle = offset * (360 / Math.max(cardsPerTurn, 1)) + rotation;
        const radians = (angle * Math.PI) / 180;
        const wave = Math.sin(radians);
        const x = offset * Math.min(cardWidth * 0.72, responsiveRadius * 0.72);
        const y = wave * responsiveRadius * 0.7 + offset * verticalSpacing * fit * 0.18;
        const z = Math.cos(radians) * responsiveRadius;
        const depthScale = clamp(perspective / Math.max(perspective - z, 1), 0.72, 1.45);
        card.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) rotateZ(${cardTilt}deg) scale(${scale * depthScale})`;
        card.style.opacity = "1";
        card.style.filter = "none";
        card.style.zIndex = String(
          Math.round(((z / Math.max(responsiveRadius, 1) + 1) / 2) * 100000) + index,
        );
        card.style.pointerEvents = "auto";
      });
      frameId = requestAnimationFrame(render);
    };
    frameId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [
    animationMode,
    cardHeight,
    cardWidth,
    cardsPerTurn,
    centerScale,
    direction,
    grayscale,
    normalizedItems,
    pauseOnHover,
    perspective,
    radius,
    rotation,
    speed,
    verticalSpacing,
    cardTilt,
  ]);

  const dragEnabled = animationMode === "drag" || animationMode === "all";
  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div
      ref={rootRef}
      className="infinite-spiral"
      style={
        {
          perspective: `${perspective}px`,
          "--infinite-spiral-card-radius": `${cardRadius}px`,
        } as CSSProperties
      }
      onMouseEnter={() => (hoveredRef.current = true)}
      onMouseLeave={() => (hoveredRef.current = false)}
      onPointerDown={(event) => {
        if (!dragEnabled || event.button !== 0) return;
        draggingRef.current = true;
        dragMovedRef.current = false;
        lastPointerYRef.current = event.clientY;
        targetProgressRef.current = progressRef.current;
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (!draggingRef.current) return;
        const difference = event.clientY - lastPointerYRef.current;
        lastPointerYRef.current = event.clientY;
        if (Math.abs(difference) > 0.5) dragMovedRef.current = true;
        targetProgressRef.current -= difference / Math.max(verticalSpacing, 1);
      }}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onClickCapture={(event) => {
        if (dragMovedRef.current) {
          event.preventDefault();
          event.stopPropagation();
          dragMovedRef.current = false;
        }
      }}
    >
      <div className="infinite-spiral__stage" role="list" aria-label="Infinite sponsor spiral">
        {normalizedItems.map((item, index) => (
          <div
            key={`${item.alt}-${index}`}
            ref={(node) => {
              cardRefs.current[index] = node;
            }}
            className="infinite-spiral__item"
            style={{ width: cardWidth, height: cardHeight, borderRadius: cardRadius }}
            role="listitem"
            aria-label={item.alt}
          >
            <img
              className="infinite-spiral__image"
              src={item.src}
              alt={item.alt}
              draggable={false}
              style={{ objectFit: imageFit, "--spiral-grayscale": grayscale } as CSSProperties}
            />
            {item.name ? <span className="infinite-spiral__name">{item.name}</span> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
