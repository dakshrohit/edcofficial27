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

- Keep the interactive event lanyards in one client-only React Three Fiber canvas with DOM-based event details, avoiding one WebGL renderer per card while keeping text accessible.
- Reuse a single client-only paper-crumple canvas and change its artwork only while folded, preventing multiple WebGL contexts and preserving the reveal between steps.
