<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Team data lives in `src/data/team.ts` as typed arrays; components only consume the types so real club data can replace mocks without component changes.
- The current-team view uses shared controlled Tabs with a single keyed TeamSection; changing teams remounts the directory to clear profile, audio, and selection state.
- ReactBits InfiniteMenu is vendored untouched in `src/components/reactbits/` (WebGL, rendered inside ClientOnly) because it needs browser APIs; member photos must be CORS-enabled for its texture atlas.

- Shared EDC navigation, contacts, and asset references live in `src/data/site.ts`; unknown destinations remain disabled until configured to avoid invented routes.
- Alumni records live in `src/data/alumni.ts`, separate from current teams; year selection remounts the official controlled WheelCarousel so profile and wheel selection stay synchronized.
- Componentry components are installed from the official shadcn registry; source changes are limited to safety guards and reduced-motion/color compatibility.
- Shared header/footer and the single main landmark live in the root layout; Teams owns section-specific dark-to-light styling.
- Footer eyes mount only while visible; reduced motion sets zero pupil travel, and idle animation/blinking remain disabled to prevent background work.
