# Premium EDC loading sequence

## Goal
Add a short, cinematic opening animation without changing the existing homepage design.

## Experience
- Recreate the attached folded coral paper plane as crisp inline SVG artwork.
- Animate it along a responsive curved SVG path, with continuous direction-aware rotation and a restrained fading trail.
- Reveal “EDC” and “Entrepreneurship Development Cell” progressively as the plane approaches the center.
- Hold the completed identity briefly, then smoothly uncover the existing homepage beneath it.
- Keep the sequence around 3.6 seconds and skip it automatically for visitors who prefer reduced motion.

## Implementation
- Create an isolated, reusable `EDCLoader` React component.
- Use the existing Framer Motion dependency and SVG motion paths for performant transform and opacity animation.
- Define timing, plane size, reveal points, paths, and exit duration as editable constants.
- Use separate desktop and mobile trajectories so the plane and branding remain fully visible.
- Integrate the loader at the homepage root while preserving all existing homepage sections and behavior.

## Validation
- Confirm the full sequence and handoff at desktop and mobile viewport sizes.
- Check that the homepage is usable after dismissal, no elements are cropped, and reduced-motion users receive an immediate restrained reveal.
