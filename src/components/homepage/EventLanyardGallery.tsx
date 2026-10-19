import { useEffect, useState } from "react";
import type { ComponentType } from "react";

export default function EventLanyardGallery() {
  const [Gallery, setGallery] = useState<ComponentType | null>(null);

  useEffect(() => {
    let active = true;
    import("@/components/EventLanyardGallery").then(({ default: component }) => {
      if (active) setGallery(() => component);
    });
    return () => {
      active = false;
    };
  }, []);

  return Gallery ? <Gallery /> : <div className="event-lanyard-loading" aria-hidden="true" />;
}
