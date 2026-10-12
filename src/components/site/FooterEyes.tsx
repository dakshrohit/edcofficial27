import { useEffect, useRef, useState } from "react";
import { EyeTracking } from "@/components/ui/eye-tracking";

export function FooterEyes() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [colors, setColors] = useState<string[]>([]);
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const css = getComputedStyle(el);
    setColors(["--lime", "--blue", "--black", "--paper"].map(token => css.getPropertyValue(token).trim()));
    const observer = new IntersectionObserver(([entry]) => setVisible(entry?.isIntersecting ?? false));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const [irisColor, irisColorSecondary, pupilColor, scleraColor] = colors;
  return <div ref={ref} className="footer-eyes pointer-events-none" aria-hidden="true">
    {visible && irisColor && irisColorSecondary && pupilColor && scleraColor && <EyeTracking key={reduced ? "static" : "tracking"} variant="minimal" eyeSize={76} gap={16} irisColor={irisColor} irisColorSecondary={irisColorSecondary} pupilColor={pupilColor} scleraColor={scleraColor} pupilRange={reduced ? 0 : 0.35} blinkInterval={0} idleAnimation={false} reactivePupil={false} showReflection={false} showIrisDetail={false} showEyelids={false} />}
  </div>;
}