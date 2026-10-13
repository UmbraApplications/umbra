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

## Application rules
- Keep the UMBRA company site as a single-page experience at `/`, with in-page navigation to its content sections; the site tells one continuous company story.
- Define visual styles and semantic theme tokens in `src/styles.css`, and use the shared Button for actions; this keeps the brand consistent.
- The project inquiry form creates a local downloadable briefing and must never imply that it sends a message until a real contact integration is configured; no contact information was supplied.
- Import uploaded brand and founder media through asset pointers, and keep the derived favicon as a small real image in `public`; this preserves efficient media delivery and browser icon support.
