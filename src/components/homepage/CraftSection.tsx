import * as React from "react";
import { useEffect, useState } from "react";
export default function CraftSection() {
  return (
    <section className="craft-section" aria-labelledby="craft-heading">
      <div className="craft-inner mx-auto max-w-345 px-5 lg:px-9">
        <div className="craft-headline">
          <h2 id="craft-heading">
            LET’S CRAFT
            <br />
            SUCCESS
            <br />
            STORIES WITH
            <br />
            <span className="circled">YOUR</span>
            <br />
            IDEAS
          </h2>
        </div>
        <CraftPaperExperience />
      </div>
    </section>
  );
}

function CraftPaperExperience() {
  const [Sequence, setSequence] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    let active = true;
    import("@/components/CraftPaperSequence").then(({ default: component }) => {
      if (active) setSequence(() => component);
    });
    return () => {
      active = false;
    };
  }, []);

  return Sequence ? <Sequence /> : <div className="craft-paper-loading-shell" aria-hidden="true" />;
}
