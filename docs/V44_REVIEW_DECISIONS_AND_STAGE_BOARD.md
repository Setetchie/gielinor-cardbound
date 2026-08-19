# Cardbound v44 Review Decisions and Stage Board

**Status:** Active authoritative extension to `DESIGN_PROPOSAL_BOARD.md` for the v44 hands-on review cycle.

**Purpose:** Preserve all accepted decisions, test requirements, defects, and current stage state from the product-owner review so they do not remain only in chat history. Where this file adds detail to an older board entry, this newer accepted detail controls the v44 implementation/test pass.

## 1. Navigation and global UI

- **LOCKED:** One persistent horizontally scrollable primary navigation bar. Do not split primary destinations between upper/lower bars.
- **BUG:** Primary navigation must remain visible on every top-level page, including Bank.
- **LOCKED:** Future-content destinations should be represented in navigation/test structure so placement and traversal can be evaluated before final content exists, including Pets, Exploration/World, Settings/Options, Store, social systems, and other accepted destinations.
- **LOCKED:** Back controls on drill-down pages belong at the top, before current Skill/subset information.
- **LOCKED:** Filters/sorts/toggles across Bank, Activities, Codex/Collection, Pets, World, equipment, raids, trading, etc. must state what they do; do not rely on unexplained icons.
- **LOCKED:** `Locked` means revealed but unusable because one or more requirements are unmet, including owned/unowned Binding and level/mastery/region/equipment requirements. Undiscovered content is not merely `Locked`.

## 2. Skills, subsets, activities, and idle presentation

- **LOCKED:** Broad Skill → subset → activity structure. Subsets do not become separate permanent Skills; they have their own mastery/progression.
- **LOCKED:** The subset mastery/progression row itself is the navigation link to that subset's activities; no redundant subset menu.
- **LOCKED:** Do not explicitly label subset reward profiles. Players infer profiles from activity values.
- **LOCKED:** First subset in a broad Skill is a baseline/generalist profile. Later Region-discovered subsets specialize by improving one profile while reducing others; they are strategic horizontal alternatives, not universal upgrades.
- **LOCKED:** Remove long explanatory descriptions that merely say a subset awards parent-Skill XP, is linear, or is a baseline/specialization.
- **LOCKED:** Comparable activity cards share the same core fields: activity name, level requirement, unmet requirement/Binding state, parent-Skill XP/action, Pack Points/action, Idle Efficiency, and time/action.
- **LOCKED:** While idling a repeating activity, do not show `Next Activity`. Show XP/action, Pack Points/action, effective XP/hr, effective Pack Points/hr, time/action, and live per-action progress.
- **LOCKED:** Routine activity-completion reward popups appear at the top of the visible screen over all menus/content and auto-dismiss. Important summaries such as Welcome Back/offline settlement may use manually dismissed modal treatment.

## 3. Exploration and world navigation

- **LOCKED:** Exploration preview/details belong inside the selected Exploration, not before the list of Location/Exploration options.
- **LOCKED:** Preserve World → Region → Location → optional Point of Interest structure and the previously accepted discovery/reveal behavior.

## 4. Equipment, Bank, loadouts, and Pets

- **LOCKED:** Current equipment slots: Head, Body, Legs, Main Hand, Off Hand, Boots, Jewelry, Cape/Back. Gloves are removed.
- **LOCKED:** Equipped gear surrounds a player model/avatar. Equipped Pet has its own nearby position and links to the Pet menu; Pet is not a normal equipment slot.
- **LOCKED:** Tapping equipment in Bank opens an information view/popup with actions to equip to the currently equipped setup or to a specific saved loadout.
- **LOCKED:** Tapping currently equipped gear opens the same relevant information with an Unequip action.
- **LOCKED:** Loadout overview shows only player-given loadout name and tag. Selecting it opens detail/edit. Loadouts must also have an Equip action.
- **LOCKED:** Loadout detail allows equipment replacement/editing rather than forcing Bank-only management.

## 5. Codex, Stats, Collection, Shredding, and Forge

- **LOCKED:** Codex landing includes overall account/collection summaries and links to deeper **Stats** and **Card Collection** spaces.
- **LOCKED:** Collection card grid should use smaller/icon-forward cards. Tap reveals detailed card information including pull rates.
- **LOCKED:** Card detail should show the foil version/treatment and counts for both Standard and Foil copies.
- **LOCKED:** Collection retains the accepted filtering and Shredding tools.
- **LOCKED:** Standard duplicate shredding produces universal normal Fragments; Foil duplicate shredding produces Prismatic Essence. Star Fragments remain the rare targeted-forge currency.
- **LOCKED:** Forge testing must include normal Fragments, Prismatic Essence, and Star Fragments.
- **LOCKED:** Forging a card uses a card-reveal popup comparable to pack opening. A random forge starts on the card back and is tapped to reveal. No extra dramatic rarity reveal is required because the player selected the forge tier.
- **LOCKED:** Standard Fragment forge creates a random eligible unowned card in the selected pool/tier; Star Fragment allows selecting an eligible unowned card; normal forge cannot create Foil.
- **LOCKED:** Prismatic Essence creates/upgrades to the Foil version only for an already-owned eligible standard card and does not bypass progression eligibility.

## 6. Packs

- **LOCKED:** Pack-selection cards remain concise: pack cost, cards obtained, plain-language rarity advantage, and comparative percentage differences/chances.
- **LOCKED:** Preserve previously accepted pack-opening/reveal behavior: low tiers restrained, high tiers more notable, Foil/Perfect strongest treatment.

## 7. Raids, Huntsmanship, Ascendants, and test content

- **LOCKED:** Raid browser shows specific raid name, originating Region, Tier, and progress/completion. Selecting a Raid opens requirement detail with satisfied/not-satisfied state.
- **TEST REQUIREMENT:** Include controlled Huntsmanship creatures covering Tracking → Stalking → Hunt, plus Special Creature Hunts and Locked/Available states.
- **TEST REQUIREMENT:** Include at least one practical end-to-end Huntsmanship creature chain.
- **TEST REQUIREMENT:** Include a test Pet with a deliberately very common acquisition rate so Pet receipt, Pet equipment, bonuses, and equipped-Pet UX can be exercised. The test build must identify which content awards it.
- **TEST REQUIREMENT:** Include a test Ascendant system and at least one prototype/test minigame so Ascendant navigation, unlock/progression presentation, and potential minigame attachment can be evaluated. Test names/values are not automatically final lore/content.

## 8. Friends, trading, Showcase, and notifications

- **TEST REQUIREMENT:** Provide a deterministic dummy Friend/test account.
- **TEST REQUIREMENT:** Dummy supports incoming/outgoing Friend Requests, accept/reject, multiple concurrent trade offers, accept/reject, counteroffer, countering a counteroffer, timeout/expiration, and state reset when terms change.
- **TEST REQUIREMENT:** Dummy inventory must support real trade safeguards and duplicate/eligibility tests.
- **TEST REQUIREMENT:** Showcase works both directions: player views dummy Showcase and dummy fixture can simulate viewing the player's selected Showcase.
- **LOCKED:** Notification bell is the central notification inbox for asynchronous account/social events. Bell shows unread indicator/badge; tapping opens concise notification list; tapping an entry opens details and/or deep-links to the relevant system.
- **LOCKED:** Test unread/read state, badge behavior, multiple notifications, detail navigation, and persistence after navigation/reload.
- **LOCKED:** Routine per-action reward overlays remain separate from the notification inbox.

## 9. Settings and developer utilities

- **BUG CLASS:** Every visible Settings control must be either functional, clearly test-only, or clearly disabled/not-yet-implemented. No silent nonfunctional toggles.
- **TEST REQUIREMENT:** Exercise persistence, reload behavior, defaults/reset, and the actual system effect for functional settings.
- **TEST REQUIREMENT:** Include Dev/Test `Grant All Bindings` so Binding-gated content can be tested without random pulls. Also retain a reset/clear path so missing-Binding states remain testable.
- **TEST REQUIREMENT:** Include test grants/reset capability for Forge currencies/entitlements as needed for repeatable QA.

## 10. Store, monetization test shell, and purchase gating

- **LOCKED FOR QA:** Add Store as a top-level destination in the persistent navigation.
- **QA ONLY:** Current purchase selections are `$0 / Test` and simulate successful purchase/entitlement behavior; they are not final prices or billing implementation.
- **TEST PRODUCTS:** Pet Expansion, Star Fragment purchase, Premium Upgrade package, and test Daily Focus/rewarded-ad boosts.
- **LOCKED:** Daily Focus test activation simulates successful rewarded-ad completion without requiring a real ad in the QA build.
- **LOCKED:** Store testing covers successful purchase, already-owned state, repeatable purchase where allowed, non-repeatable purchase, entitlement persistence/restoration after reload, and Dev/Test reset of purchases/entitlements.
- **LOCKED:** Purchase-gated content is discoverable before purchase rather than hidden. The gated content/menu is visible but disabled/grayed with a concise purchase requirement and direct `View/Unlock in Store` action.
- **LOCKED:** Store links from gated content deep-link to the specific relevant product, not merely the Store landing page.
- **LOCKED:** After successful purchase, returning to the gated screen immediately refreshes/unlocks the content without app restart.
- **LOCKED:** If a purchase only improves an existing free feature, only the premium improvement is gated; do not gray out functionality the player already owns for free.
- **EXAMPLE:** Pets menu may be opened before Pet Expansion ownership; expansion content is grayed/disabled with `Pet Expansion required` and a direct Store link. Purchase should immediately activate the expansion state.
- **MONETIZATION PRINCIPLE PRESERVED:** Do not sell superior core progression efficiency, paid rarity odds, exclusive stronger cards, or inaccessible core power. Exact prices/quantities/limits remain open unless separately accepted.

## 11. Testing process — mandatory future gate

- **LOCKED PROCESS:** Every future regression/stress test cycle must use a clean-pass gate:
  1. Implement/fix the intended change.
  2. Run **one complete full test pass (1×)**.
  3. Proceed to **50× repetition/stress testing only if the 1× pass is 100% green**.
  4. If any test fails in the 1× pass, stop. Fix the failure and restart with a new 1× full pass.
  5. Never use the 50× run to discover failures that should have blocked at the 1× gate.
- **LOCKED PROCESS:** Do not weaken assertions or bypass acceptance coverage simply to make a gate green. Update stale assertions only when an intentionally accepted behavior changed, preserving equivalent behavioral coverage.

## 12. Current implementation/stage status at chat handoff — 2026-08-18

### Completed before v44

- v43 structure-fidelity baseline was previously reported clean at the expanded regression gate and merged to `main`.
- Prior first-pass UI fixes remain mandatory regression baseline.

### v44 implementation branch

- Current work is on **PR #5**, branch `agent/v44-ux-test-pass`, titled **v44 consolidated UX and systems test pass**.
- v44 was intentionally kept **unmerged** while validation was failing.
- The v44 branch introduced/attempted the consolidated test-facing UX/system layer covering the decisions above, including Store/purchase gates, Pet/Huntsmanship/Ascendant fixtures, dummy social/trading/Showcase, notification inbox, developer utilities, Codex/equipment/loadout/Raid/pack revisions, and persistent navigation.

### Latest completed regression state

Latest inspected workflow: **Cardbound Regression run #74 / run ID `32073559950`**.

Successful shards:
- `greenwake-ip` — success;
- `greenwake-content` — success;
- `prototype-integrity` — success;
- `ip-inventory` — success;
- `prototype-progression` — success.

Failed shards:
- `prototype-core` — failure;
- `v44-ux` — failure;
- `greenwake-progression` — failure;
- `greenwake-terminology` — failure;
- `prototype-ui` — failure.

Cancelled:
- `v43-structure` — cancelled before completion.

Overall `1,500-execution acceptance gate` — **failed**.

### Important correction to testing sequence

Run #74 used repeated shard executions before the later clean-pass rule was accepted. **Do not repeat that workflow for the next validation.** The next chat must first fix the known failures and run one complete 1× gate. Only after that is fully green should the workflow proceed to 50× repetitions.

### Current action state

- Product owner explicitly requested that the current fix/patch attempt be **stopped** to hand work to a new chat.
- No new corrective patch should be assumed complete from this chat.
- No new 1× validation has been run after the failed #74 state.
- PR #5 must remain unmerged until the corrected validation sequence passes.

## 13. Next-chat starting sequence

1. Read `DESIGN_PROPOSAL_BOARD.md`, this v44 board, `v43-first-test-pass-baseline.md`, `v43-decision-interface-coverage.md`, `v43-testing-navigation-scope.md`, `TESTING_RELEASE_MARKETING_ROADMAP.md`, and the chat handoff file.
2. Inspect PR #5 and confirm current head before editing.
3. Pull raw logs for the five failed run #74 shards and identify the first actionable failure/root cause in each.
4. Separate genuine regressions from stale assertions caused by accepted v44 behavior changes.
5. Patch source behavior and only update tests when the accepted behavior intentionally changed.
6. Run a **single full 1× pass**.
7. If anything fails, stop and fix; rerun 1×.
8. Only after a completely green 1× pass, run **50×** stress/repetition testing.
9. Merge/promote v44 only after the required acceptance gates are green.
10. Resume hands-on product-owner testing from the promoted tested build and automatically capture new accepted findings on the boards.
