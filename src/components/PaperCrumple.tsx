import { useRef, useState, type PointerEvent } from "react";

type PaperCrumpleProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sceneHeight?: number;
  releaseBehavior?: "restore" | "stay";
  crumpleAmount?: number;
  crumpleDuration?: number;
  releaseDuration?: number;
  foldCount?: number;
  foldSharpness?: number;
  wrinkleDepth?: number;
  creaseStrength?: number;
  paperColor?: string;
  paperTexture?: number;
  draggable?: boolean;
  returnToOrigin?: boolean;
  imageFit?: "contain" | "cover";
  roughness?: number;
  lightIntensity?: number;
  lightAngle?: number;
  shadow?: boolean;
  shadowOpacity?: number;
  dragRotation?: number;
  dragRadius?: number;
  rotation?: number;
  seed?: number;
  detail?: number;
  disabled?: boolean;
};

export default function PaperCrumple({
  src,
  alt,
  width = 400,
  height = 400,
  sceneHeight = 360,
  releaseBehavior = "restore",
  crumpleAmount = 0.85,
  crumpleDuration = 0.55,
  releaseDuration = 0.4,
  foldCount = 6,
  foldSharpness = 0.6,
  wrinkleDepth = 0.65,
  creaseStrength = 0.18,
  paperColor = "#f4f0e8",
  paperTexture = 0.08,
  draggable = true,
  returnToOrigin = true,
  imageFit = "contain",
  roughness = 0.92,
  lightIntensity = 1.8,
  lightAngle = -35,
  shadow = true,
  shadowOpacity = 0.16,
  dragRotation = 10,
  dragRadius = 180,
  rotation = 0,
  seed = 7,
  detail = 64,
  disabled = false,
}: PaperCrumpleProps) {
  const paperRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging || disabled || !draggable) return;
    const x = Math.max(-dragRadius, Math.min(dragRadius, event.clientX - window.innerWidth / 2));
    const y = Math.max(-dragRadius, Math.min(dragRadius, event.clientY - window.innerHeight / 2));
    setOffset({ x, y });
  };

  const release = () => {
    setDragging(false);
    if (returnToOrigin && releaseBehavior === "restore") setOffset({ x: 0, y: 0 });
  };

  return (
    <div className="paper-crumple-scene" style={{ minHeight: sceneHeight }}>
      <div
        ref={paperRef}
        className={`paper-crumple ${dragging ? "is-crumpling" : ""}`}
        onPointerDown={(event) => {
          if (!disabled && draggable) {
            event.currentTarget.setPointerCapture(event.pointerId);
            setDragging(true);
          }
        }}
        onPointerMove={handlePointerMove}
        onPointerUp={release}
        onPointerCancel={release}
        role={draggable ? "button" : undefined}
        tabIndex={draggable ? 0 : undefined}
        aria-label={draggable ? `${alt}. Drag to crumple` : alt}
        style={
          {
            width,
            height,
            "--paper-color": paperColor,
            "--paper-texture": paperTexture,
            "--crumple-amount": crumpleAmount,
            "--crumple-duration": `${crumpleDuration}s`,
            "--release-duration": `${releaseDuration}s`,
            "--fold-count": foldCount,
            "--fold-sharpness": foldSharpness,
            "--wrinkle-depth": wrinkleDepth,
            "--crease-strength": creaseStrength,
            "--roughness": roughness,
            "--light-intensity": lightIntensity,
            "--light-angle": `${lightAngle}deg`,
            "--shadow-opacity": shadow ? shadowOpacity : 0,
            "--drag-rotation": `${dragRotation}deg`,
            "--rotation": `${rotation}deg`,
            "--seed": seed,
            "--detail": detail,
            "--drag-x": `${offset.x}px`,
            "--drag-y": `${offset.y}px`,
          } as React.CSSProperties
        }
      >
        <img src={src} alt="" draggable={false} style={{ objectFit: imageFit }} />
        <span className="paper-crumple-copy">DRAG ME / E-SUMMIT ARCHIVE</span>
      </div>
    </div>
  );
}
