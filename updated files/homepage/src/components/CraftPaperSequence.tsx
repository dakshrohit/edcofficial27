import { useEffect, useRef, useState } from "react";
import PaperCrumple from "@/components/PaperCrumple";
import ideateArtwork from "@/assets/paper-ideate.png.asset.json";
import innovateArtwork from "@/assets/paper-innovate.jpg.asset.json";
import incubateArtwork from "@/assets/paper-incubate.png.asset.json";

const papers = [
  { name: "IDEATE", src: ideateArtwork.url },
  { name: "INNOVATE", src: innovateArtwork.url },
  { name: "INCUBATE", src: incubateArtwork.url },
] as const;

const SHOW_TIME = 2200;
const OPEN_TIME = 1450;
const FOLD_TIME = 980;

export default function CraftPaperSequence() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [foldTrigger, setFoldTrigger] = useState(0);
  const [releaseTrigger, setReleaseTrigger] = useState(0);
  const [artworkReady, setArtworkReady] = useState(false);
  const timers = useRef<number[]>([]);
  const mounted = useRef(true);
  const initialArtworkReady = useRef(false);
  const awaitingArtwork = useRef(false);

  const later = (callback: () => void, delay: number) => {
    const timer = window.setTimeout(() => {
      timers.current = timers.current.filter((id) => id !== timer);
      if (mounted.current) callback();
    }, delay);
    timers.current.push(timer);
  };

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      timers.current.forEach(window.clearTimeout);
      timers.current = [];
    };
  }, []);

  const onArtworkReady = () => {
    setArtworkReady(true);
    if (!initialArtworkReady.current) {
      initialArtworkReady.current = true;
      later(scheduleFold, SHOW_TIME);
      return;
    }
    if (!awaitingArtwork.current) return;
    awaitingArtwork.current = false;
    later(() => {
      setReleaseTrigger((value) => value + 1);
      later(scheduleFold, OPEN_TIME);
    }, 260);
  };

  const scheduleFold = () => {
    setFoldTrigger((value) => value + 1);
    later(() => {
      awaitingArtwork.current = true;
      setArtworkReady(false);
      setActiveIndex((value) => (value + 1) % papers.length);
    }, FOLD_TIME);
  };

  const activePaper = papers[activeIndex] ?? papers[0];

  return (
    <div className="craft-paper-experience" aria-label="Ideate, innovate, incubate paper sequence">
      <div className="craft-paper-heading">
        <span className="craft-paper-index">0{activeIndex + 1} / 03</span>
        <span className="craft-paper-name" aria-live="polite">{activePaper.name}</span>
      </div>
      <div className="craft-paper-stage">
        <PaperCrumple
          src={activePaper.src}
          alt={`${activePaper.name} paper artwork`}
          width={390}
          height={390}
          sceneHeight={430}
          imageFit="contain"
          releaseBehavior="restore"
          crumpleDuration={0.72}
          releaseDuration={0.72}
          foldCount={7}
          foldSharpness={0.72}
          wrinkleDepth={0.82}
          paperTexture={0.04}
          shadowOpacity={0.18}
          autoFoldTrigger={foldTrigger}
          autoFoldDuration={10000}
          autoFoldReleaseTrigger={releaseTrigger}
          onArtworkReady={onArtworkReady}
        />
        <span className="craft-paper-loading" data-ready={artworkReady} aria-hidden="true">
          PAPER / {activePaper.name}
        </span>
      </div>
      <div className="craft-paper-rail" aria-hidden="true">
        {papers.map((paper, index) => (
          <span className={index === activeIndex ? "is-current" : ""} key={paper.name}>
            {paper.name}
          </span>
        ))}
      </div>
    </div>
  );
}