import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { ArrowUpRight, RotateCcw, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import "./EventLanyardGallery.css";

type EventId = "luminous" | "hult" | "bizcup" | "summit";

type EventInfo = {
  id: EventId;
  name: string;
  number: string;
  kicker: string;
  description: string;
  token: string;
  href?: string;
};

const EVENTS: EventInfo[] = [
  {
    id: "luminous",
    name: "Luminous",
    number: "01",
    kicker: "LIGHT UP THE CAMPUS",
    description: "Luminous is EDC’s celebration of Diwali: a bright, high-spirited campus gathering that brings the community together beyond the classroom.",
    token: "--primary",
  },
  {
    id: "hult",
    name: "Hult Prize",
    number: "02",
    kicker: "IDEAS FOR IMPACT",
    description: "The campus round of the world’s largest student social-enterprise competition. EDC brings student teams together to develop ventures that take on meaningful global challenges.",
    token: "--electric",
    href: "https://hult.edcnitd.co.in",
  },
  {
    id: "bizcup",
    name: "BizCup",
    number: "03",
    kicker: "THINK. PITCH. PLAY.",
    description: "EDC’s signature fresher’s event puts business instincts to the test through lively rounds of corporate quizzes, marketing, and problem-solving.",
    token: "--accent",
  },
  {
    id: "summit",
    name: "E-Summit",
    number: "04",
    kicker: "EASTERN INDIA’S STARTUP STAGE",
    description: "Eastern India’s second-largest entrepreneurship festival: three days of bold ideas, startup showcases, spirited pitches, and conversations with founders and leaders.",
    token: "--pink",
    href: "https://esummit.edcnitd.co.in",
  },
];

type Body = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rz: number;
};

type TextureSet = Map<string, THREE.CanvasTexture>;

function makeEventTextures(): TextureSet {
  const styles = getComputedStyle(document.documentElement);
  const foreground = styles.getPropertyValue("--foreground").trim() || "#171515";
  const textures: TextureSet = new Map();

  for (const event of EVENTS) {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 900;
    const context = canvas.getContext("2d");
    if (!context) continue;

    context.fillStyle = styles.getPropertyValue(event.token).trim() || foreground;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = foreground;
    context.fillRect(0, 0, canvas.width, 105);
    context.fillStyle = styles.getPropertyValue("--background").trim() || "white";
    context.font = "800 34px Barlow, sans-serif";
    context.fillText("EDC  /  NIT DURGAPUR", 42, 67);
    context.fillStyle = foreground;
    context.font = "800 30px Barlow, sans-serif";
    context.fillText(`EVENT ${event.number}`, 44, 175);

    const words = event.name.split(" ");
    const maxWidth = 560;
    context.font = `108px "Bebas Neue", sans-serif`;
    const lines = words.length > 1 ? words : [event.name];
    const lineSize = lines.length > 1 ? 99 : 118;
    lines.forEach((line, index) => {
      context.fillText(line.toUpperCase(), 40, 390 + index * lineSize, maxWidth);
    });

    context.fillStyle = foreground;
    context.fillRect(40, 676, 560, 4);
    context.font = "700 28px Barlow, sans-serif";
    const kickerWords = event.kicker.split(" ");
    let line = "";
    let y = 744;
    for (const word of kickerWords) {
      const candidate = line ? `${line} ${word}` : word;
      if (context.measureText(candidate).width > 550 && line) {
        context.fillText(line, 42, y);
        y += 39;
        line = word;
      } else {
        line = candidate;
      }
    }
    if (line) context.fillText(line, 42, y);
    context.font = "800 24px Barlow, sans-serif";
    context.fillText("IDEATE. INNOVATE. INCUBATE.", 42, 857);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    textures.set(event.id, texture);

    const idCanvas = document.createElement("canvas");
    idCanvas.width = 640;
    idCanvas.height = 900;
    const idContext = idCanvas.getContext("2d");
    if (!idContext) continue;
    idContext.fillStyle = foreground;
    idContext.fillRect(0, 0, 640, 900);
    idContext.fillStyle = styles.getPropertyValue(event.token).trim() || "white";
    idContext.fillRect(24, 24, 592, 852);
    idContext.fillStyle = foreground;
    idContext.fillRect(24, 24, 592, 118);
    idContext.fillStyle = styles.getPropertyValue("--background").trim() || "white";
    idContext.font = "800 34px Barlow, sans-serif";
    idContext.fillText("EDC  /  NIT DURGAPUR", 52, 96);
    idContext.fillStyle = foreground;
    idContext.beginPath();
    idContext.arc(320, 340, 132, 0, Math.PI * 2);
    idContext.fill();
    idContext.fillStyle = styles.getPropertyValue("--background").trim() || "white";
    idContext.beginPath();
    idContext.arc(320, 300, 45, 0, Math.PI * 2);
    idContext.fill();
    idContext.beginPath();
    idContext.ellipse(320, 408, 82, 58, 0, Math.PI, 0, true);
    idContext.fill();
    idContext.fillStyle = foreground;
    idContext.textAlign = "center";
    idContext.font = `72px "Bebas Neue", sans-serif`;
    idContext.fillText("TEAM MEMBER", 320, 572);
    idContext.font = "800 25px Barlow, sans-serif";
    idContext.fillText("ORGANISING COMMITTEE", 320, 626);
    idContext.fillText(event.name.toUpperCase(), 320, 668);
    idContext.fillRect(88, 710, 464, 3);
    idContext.font = "800 22px Barlow, sans-serif";
    idContext.fillText("EVENTS  /  NIT DURGAPUR", 320, 768);
    idContext.font = "700 20px Barlow, sans-serif";
    idContext.fillText("EDC • IDEATE. INNOVATE. INCUBATE.", 320, 822);
    const idTexture = new THREE.CanvasTexture(idCanvas);
    idTexture.colorSpace = THREE.SRGBColorSpace;
    idTexture.anisotropy = 4;
    textures.set(`${event.id}-id`, idTexture);
  }
  return textures;
}

function EventCards({
  selected,
  flipped,
  onSelect,
  onFlip,
  textures,
}: {
  selected: EventId | null;
  flipped: EventId | null;
  onSelect: (id: EventId) => void;
  onFlip: (id: EventId) => void;
  textures: TextureSet;
}) {
  const { viewport } = useThree();
  const dragging = useRef<number | null>(null);
  const pointerSample = useRef({ x: 0, y: 0, time: 0 });
  const bodies = useRef<Body[]>(EVENTS.map((_, index) => ({
    x: (index - 1.5) * 1.55,
    y: -0.05,
    vx: 0,
    vy: 0,
    rz: 0,
  })));
  const groups = useRef<Array<THREE.Group | null>>([]);
  const cardFaces = useRef<Array<THREE.Group | null>>([]);
  const anchors = useRef<Array<THREE.Mesh | null>>([]);
  const straps = useRef<Array<Array<THREE.Mesh | null>>>(EVENTS.map(() => Array.from({ length: 8 }, () => null)));
  const strapScratch = useMemo(() => EVENTS.map(() => Array.from({ length: 8 }, () => ({
    start: new THREE.Vector3(),
    end: new THREE.Vector3(),
    direction: new THREE.Vector3(),
  }))), []);
  const selection = useRef(selected);
  const flippedSelection = useRef(flipped);
  const introStart = useRef<number | null>(null);
  const wasDragged = useRef(false);

  useEffect(() => {
    selection.current = selected;
  }, [selected]);

  useEffect(() => {
    flippedSelection.current = flipped;
  }, [flipped]);

  const cardWidth = Math.min(1.9, viewport.width * 0.2);
  const cardHeight = cardWidth * 1.42;
  const step = Math.max(cardWidth, Math.min(cardWidth + 0.56, viewport.width * 0.22, (viewport.width * 0.9 - cardWidth) / 3));

  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 0.04);
    const active = selection.current;
    if (introStart.current === null) introStart.current = state.clock.elapsedTime;
    const introTime = Math.max(0, state.clock.elapsedTime - introStart.current);
    const introDecay = Math.exp(-introTime * 1.45);
    const targetX = active ? -viewport.width * 0.215 : 0;

    bodies.current.forEach((body, index) => {
      const id = EVENTS[index]?.id;
      if (!id) return;
      const isSelected = active === id;
      const homeX = (index - 1.5) * step;
      const restX = active && isSelected ? targetX : homeX;
      const restY = -0.12;

      if (dragging.current !== index) {
        const introSway = !active ? Math.sin(introTime * 4 + index * 1.25) * 0.42 * introDecay : 0;
        const swayX = restX + introSway;
        const swayY = restY + (!active ? Math.sin(introTime * 4 + index * 1.25 + 0.8) * 0.14 * introDecay : 0);
        const ax = (swayX - body.x) * 11 - body.vx * 2.8;
        const ay = (swayY - body.y) * 11 - body.vy * 2.8 - 1.1;
        body.vx += ax * dt;
        body.vy += ay * dt;
        body.x += body.vx * dt;
        body.y += body.vy * dt;
      }

      const targetTilt = THREE.MathUtils.clamp(-body.vx * 0.035, -0.32, 0.32);
      body.rz += (targetTilt - body.rz) * (1 - Math.exp(-5 * dt));
      const group = groups.current[index];
      group?.position.set(body.x, body.y, 0);
      group?.rotation.set(THREE.MathUtils.clamp(body.vy * 0.018, -0.18, 0.18), 0, body.rz + (!active ? Math.sin(introTime * 3.4 + index) * 0.18 * introDecay : 0));
      const scale = isSelected ? 1.18 : active ? 0.001 : 1;
      group?.scale.setScalar(scale);

      const anchorX = isSelected ? body.x : homeX;
      const anchor = anchors.current[index];
      if (anchor) anchor.position.x = anchorX;
      const cardTopY = body.y + cardHeight / 2 + 0.04;
      const cardFace = cardFaces.current[index];
      const flipTarget = flippedSelection.current === id ? Math.PI : 0;
      if (cardFace) cardFace.rotation.y += (flipTarget - cardFace.rotation.y) * (1 - Math.exp(-10 * dt));
      for (let part = 0; part < 8; part += 1) {
        const mesh = straps.current[index]?.[part];
        if (!mesh) continue;
        mesh.visible = !active || isSelected;
        const t0 = part / 8;
        const t1 = (part + 1) / 8;
        const strapTension = isSelected ? 0 : 1;
        const sway = (body.x - anchorX) * strapTension;
        const sag = Math.sin(Math.PI * (t0 + t1) / 2) * Math.min(Math.abs(sway) * 0.14, 0.16);
        const scratch = strapScratch[index]?.[part];
        if (!scratch) continue;
        const { start, end, direction } = scratch;
        start.set(THREE.MathUtils.lerp(anchorX, body.x, t0), THREE.MathUtils.lerp(2.72, cardTopY, t0) - sag, -0.05);
        end.set(THREE.MathUtils.lerp(anchorX, body.x, t1), THREE.MathUtils.lerp(2.72, cardTopY, t1) - sag, -0.05);
        direction.subVectors(end, start);
        mesh.position.copy(start).add(end).multiplyScalar(0.5);
        mesh.quaternion.setFromUnitVectors(THREE.Object3D.DEFAULT_UP, direction.normalize());
        mesh.scale.y = Math.max(direction.length(), 0.01);
      }
    });
  });

  const beginDrag = (index: number, event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    const body = bodies.current[index];
    if (!body) return;
    onSelect(EVENTS[index]?.id ?? "luminous");
    dragging.current = index;
    body.vx = 0;
    body.vy = 0;
    wasDragged.current = false;
    pointerSample.current = { x: event.point.x, y: event.point.y, time: performance.now() };
    event.target.setPointerCapture(event.pointerId);
  };

  const moveDrag = (index: number, event: ThreeEvent<PointerEvent>) => {
    if (dragging.current !== index) return;
    event.stopPropagation();
    const body = bodies.current[index];
    if (!body) return;
    const now = performance.now();
    if (Math.hypot(event.point.x - pointerSample.current.x, event.point.y - pointerSample.current.y) > 0.025) wasDragged.current = true;
    const elapsed = Math.max((now - pointerSample.current.time) / 1000, 1 / 120);
    body.vx = THREE.MathUtils.clamp((event.point.x - pointerSample.current.x) / elapsed * 0.45, -20, 20);
    body.vy = THREE.MathUtils.clamp((event.point.y - pointerSample.current.y) / elapsed * 0.45, -20, 20);
    body.x = event.point.x;
    body.y = event.point.y;
    pointerSample.current = { x: event.point.x, y: event.point.y, time: now };
  };

  const endDrag = (index: number, event: ThreeEvent<PointerEvent>) => {
    if (dragging.current !== index) return;
    event.stopPropagation();
    dragging.current = null;
    event.target.releasePointerCapture(event.pointerId);
  };

  return <>
    <ambientLight intensity={1.25} />
    <directionalLight position={[-3, 6, 8]} intensity={2.2} />
    <directionalLight position={[5, 1, -3]} intensity={0.7} />
    {EVENTS.map((event, index) => {
      const homeX = (index - 1.5) * step;
      const texture = textures.get(event.id);
      return <group key={event.id}>
        {Array.from({ length: 8 }, (_, part) => <mesh
          key={`${event.id}-strap-${part}`}
          ref={(mesh) => {
            const strapRow = straps.current[index];
            if (strapRow) strapRow[part] = mesh;
          }}
          castShadow
        >
          <boxGeometry args={[cardWidth * 0.075, 1, 0.035]} />
          <meshStandardMaterial color="#171515" roughness={0.74} />
        </mesh>)}
        <group
          ref={(group) => { groups.current[index] = group; }}
        >
          <group ref={(group) => { cardFaces.current[index] = group; }}>
          <mesh castShadow>
            <boxGeometry args={[cardWidth, cardHeight, 0.075]} />
            <meshStandardMaterial color="#171515" roughness={0.55} />
          </mesh>
          {texture && <mesh position={[0, 0, 0.041]}>
            <planeGeometry args={[cardWidth - 0.09, cardHeight - 0.1]} />
            <meshPhysicalMaterial map={texture} roughness={0.48} clearcoat={0.48} clearcoatRoughness={0.3} />
          </mesh>}
          {textures.get(`${event.id}-id`) && <mesh position={[0, 0, -0.041]} rotation-y={Math.PI}>
            <planeGeometry args={[cardWidth - 0.09, cardHeight - 0.1]} />
            <meshPhysicalMaterial map={textures.get(`${event.id}-id`)} roughness={0.55} clearcoat={0.38} clearcoatRoughness={0.34} />
          </mesh>}
          <mesh position={[0, cardHeight * 0.46, 0.07]} rotation={[0, 0, 0]}>
            <torusGeometry args={[0.095, 0.018, 8, 20]} />
            <meshStandardMaterial color="#c8ccd2" metalness={0.76} roughness={0.24} />
          </mesh>
          </group>
          <mesh
            position={[0, 0, 0.09]}
            onClick={(event3d) => {
              event3d.stopPropagation();
              if (wasDragged.current) { wasDragged.current = false; return; }
              onSelect(event.id);
              onFlip(event.id);
            }}
            onPointerDown={(event3d) => beginDrag(index, event3d)}
            onPointerMove={(event3d) => moveDrag(index, event3d)}
            onPointerUp={(event3d) => endDrag(index, event3d)}
            onPointerCancel={(event3d) => endDrag(index, event3d)}
          >
            <planeGeometry args={[cardWidth, cardHeight]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>
        </group>
        <mesh
          ref={(mesh) => { anchors.current[index] = mesh; }}
          position={[homeX, 2.74, 0]}
          rotation={[0, 0, Math.PI / 4]}
          castShadow
        >
          <boxGeometry args={[0.15, 0.15, 0.11]} />
          <meshStandardMaterial color="#171515" roughness={0.5} />
        </mesh>
      </group>;
    })}
  </>;
}

export default function EventLanyardGallery() {
  const [selected, setSelected] = useState<EventId | null>(null);
  const [flipped, setFlipped] = useState<EventId | null>(null);
  const textures = useMemo(makeEventTextures, []);
  const activeEvent = EVENTS.find((event) => event.id === selected);

  useEffect(() => () => {
        textures.forEach((texture) => texture.dispose());
  }, [textures]);

  return <div className={`event-lanyard-experience${selected ? " has-selection" : ""}`}>
    <div className="event-lanyard-stage">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 10], fov: 32 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      >
        <EventCards selected={selected} flipped={flipped} onSelect={setSelected} onFlip={(id) => setFlipped((current) => current === id ? null : id)} textures={textures} />
      </Canvas>

      {activeEvent && <motion.aside
        className="event-lanyard-detail"
        key={activeEvent.id}
        initial={{ opacity: 0, x: 32 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.38, ease: [0.2, 0.8, 0.2, 1] }}
        aria-live="polite"
      >
        <button className="event-lanyard-close" type="button" onClick={() => setSelected(null)} aria-label="Close event details">
          <X size={20} />
        </button>
        <span className="event-lanyard-eyebrow">EDC EVENT / {activeEvent.number}</span>
        <h3>{activeEvent.name}</h3>
        <p>{activeEvent.description}</p>
        {activeEvent.href && <a className="event-lanyard-link" href={activeEvent.href} target="_blank" rel="noreferrer">
          EXPLORE EVENT <ArrowUpRight size={18} />
        </a>}
      </motion.aside>}
    </div>

    <div className="event-lanyard-controls" aria-label="Choose an event">
      {EVENTS.map((event) => <button
        key={event.id}
        type="button"
        className={`event-lanyard-choice${selected === event.id ? " is-active" : ""}`}
          onClick={() => setSelected((current) => {
          if (current === event.id) {
            setFlipped(null);
            return null;
          }
          setFlipped(event.id);
          return event.id;
        })}
        aria-pressed={selected === event.id}
      >
        <span>{event.number}</span>{event.name}
      </button>)}
      {selected && <button className="event-lanyard-reset" type="button" onClick={() => setSelected(null)} aria-label="Show all four events">
        <RotateCcw size={17} /> <span>ALL EVENTS</span>
      </button>}
    </div>
  </div>;
}