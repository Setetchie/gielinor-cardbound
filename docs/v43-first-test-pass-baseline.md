# v43 first-test-pass baseline

The v43 structure-fidelity testing build must inherit the bug fixes and UI corrections already established during the first prototype test/regression pass. These are baseline behavior, not optional polish for a later round.

## Runtime / regression fixes that must remain intact

- Bootstrap/navigation globals must initialize successfully; the prior `core-ui-fix.js` syntax/bootstrap failure must not regress.
- Greenwake build-stamp/update observers must not recursively rewrite the stamp or starve navigation/load completion.
- The R2 single-router ownership model remains authoritative for top-level Home/Bank/Codex(Activity/Collection legacy renderer) routing so multiple modules do not wrap and fight over global `render()`.
- Existing save compatibility and Greenwake/original-content bootstrap behavior remain preserved.
- PWA/service-worker cache versions must include every v43 testing asset so stale cached shells do not mask UI changes.

## Activity / navigation UI fixes to preserve

- Combat categories are rendered from the authoritative activity source rather than patched visually after render.
- Home/Activity combat grouping must not regress into the older broken split/navigation behavior.
- Sailing stays routed directly under the broader Activity/Skill hierarchy and must not reintroduce the prior Sailing navigation loop.
- Sailing idle rewards and live idle feedback remain functional.
- Universal idle tracking/feedback behavior and the existing idle progress presentation remain available while the newer idle-cap/return-summary structures are introduced.

## Pack opening / card reveal UI baseline

- Preserve the streamlined pack reveal flow and card-by-card presentation behavior already implemented.
- Preserve mobile pack-result scrolling and sizing fixes.
- Preserve differentiated pack-tier visual treatment while v43 replaces the legacy tier naming with Region × rarity-tier pack structure for testing.
- Preserve first-time pull feedback (`NEW` / prior foil-new behavior) and reconcile it with the v43 generalized `NEW` content-marker framework rather than removing it.
- Preserve pack purchase/reveal safety behavior from Greenwake original-mode work.
- Preserve existing pack animations/mobile polish where they do not conflict with subsequently locked reveal decisions.

## Bank / equipment / collection UI baseline

- Preserve the corrected equipment layout/grid and slot presentation.
- Preserve Bank/Collection search and filtering improvements; the Collection destination is relabeled/expanded into the Codex rather than losing those controls.
- Preserve loadout preset support and ensure v43 future Raid preset-selection concepts build on, rather than replace, the working preset structure.
- Preserve the correction preventing loadout code from overwriting the global build/version stamp.
- Preserve unified card/item imagery behavior across activity cards, Bank and collection/Codex views where the current prototype assets are still used.

## Greenwake / terminology baseline

- Preserve the existing Greenwake original-content mode and its original-IP terminology as the current prototype Region/content set.
- New v43 system names (Bindings, Codex, Pack Points, Regions, Exploration, etc.) should supersede outdated prototype terminology only where the newer locked design explicitly changed it; do not reintroduce deprecated naming simply because older modules still use it internally.

## Validation expectation for the next pass

The next UI/navigation test should treat any regression of the items above as a defect even if the new v43 destination itself appears correctly. Testing is therefore against two simultaneous baselines:

1. all previously accepted first-pass bug/UI fixes continue to work; and
2. all newly locked design structures appear in their intended navigation/interface locations.

Exact economy/balance/content-authoring values remain provisional unless separately locked.