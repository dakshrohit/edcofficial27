declare module "@/components/PaperCrumple" {
  import type { CSSProperties, ReactElement } from "react";

  type PaperCrumpleProps = {
    src?: string;
    backSrc?: string;
    alt?: string;
    width?: number;
    height?: number;
    sceneHeight?: number;
    imageFit?: "cover" | "contain";
    releaseBehavior?: "restore" | "stay" | "creased";
    crumpleDuration?: number;
    releaseDuration?: number;
    foldCount?: number;
    foldSharpness?: number;
    wrinkleDepth?: number;
    paperTexture?: number;
    shadowOpacity?: number;
    autoFoldTrigger?: number;
    autoFoldDuration?: number;
    autoFoldReleaseTrigger?: number;
    onArtworkReady?: () => void;
    onStateChange?: (state: string) => void;
    className?: string;
    style?: CSSProperties;
  };

  export default function PaperCrumple(props: PaperCrumpleProps): ReactElement;
}