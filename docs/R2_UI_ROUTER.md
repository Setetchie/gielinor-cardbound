# R2 UI Router Consolidation

R2 establishes `core-ui-fix.js` as the single owner of the application shell and top-level page routing.

## Ownership

- `core-ui-fix.js` owns the shared shell, top-level tab routing, Home page body, Activity navigation, Packs, and fallback legacy page renderers.
- `bank-collection-v18.js` owns Bank and Collection page-body rendering and registers those bodies through `cbRegisterPage()`.
- `home-groups-v23.js` retains only Home navigation compatibility helpers and no longer wraps `render()`.

## Guardrails

- Do not add another global `render()` wrapper to specialize Home, Bank, or Collection.
- Page modules should register page-body renderers with the core router rather than duplicate the app shell.
- Preserve `localStorage.cardbound` compatibility.
- Broad-Skill, universal-equipment, and monetization redesigns remain future-stage work and are not implemented by R2.

## Acceptance

R2 is complete only when Home, Bank, Collection, Activity/Sailing, save persistence, Greenwake/original mode, and the full 1,000-execution acceptance gate remain green.
