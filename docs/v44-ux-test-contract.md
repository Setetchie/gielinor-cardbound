# Cardbound v44 UX / Systems Test Contract

**Status:** Accepted product-owner review decisions implemented for the next hands-on test pass. This document supplements the Design Proposal Board and the v43 regression baseline; it does not replace underlying gameplay/economy decisions.

## Navigation and page hierarchy

- Use one persistent, horizontally scrollable primary navigation bar across every top-level destination. Bank must never hide or replace it.
- Drill-down order is Back navigation first, then current Skill/subset information, then filters/sorts, then content.
- Gathering subset mastery/progression rows are the links to their activities; do not add redundant subset-selection menus.
- Avoid explanatory prose that narrates obvious subset/activity behavior.

## Activity information and idle presentation

Every comparable activity exposes activity name, parent-Skill level requirement and current blocker, parent-Skill XP/action, Pack Points/action, Idle Efficiency, and Time/action.

During normal repeating idle activity, do not show Next Activity. Show XP/action, Points/action, effective XP/hour, effective Points/hour, Time/action, and a live per-action progress indicator.

Routine activity-completion reward pop-ups appear at the top of the visible viewport over all navigation/content and auto-dismiss. Important summaries such as Welcome Back/offline settlement remain a separate class and may require dismissal.

## World / Exploration

Exploration preview belongs inside the selected Exploration, after choosing the route/Location option. The preview may show environmental hint, duration, checkpoints, requirements and allowed pre-start information.

## Packs / Codex / Collection

Pack cards are concise: Pack cost, cards obtained, plain-language rarity advantage, and the relevant percentage difference.

Codex landing page contains Stats and Card Collection. Card Collection uses compact icon-focused tiles. Tapping a card opens details including featured Foil presentation when owned, Standard count, Foil count, and per-pack pull rates. Collection retains filters/sorts and Shredding; last-copy protection remains authoritative.

## Equipment / Bank / Loadouts / Pets

Approved player equipment slots: Head, Body, Legs, Main Hand, Off Hand, Boots, Jewelry, Cape/Back. Gloves are removed. Equipped gear surrounds a player model/avatar. A separate equipped-Pet position links to Pets.

Tapping Bank equipment opens item information and actions to equip to current equipment or a specific Loadout. Tapping currently equipped gear opens the same information with Unequip. Loadout overview shows only player-given name + tag; Loadout detail supports Equip Loadout, editing/replacing equipment, rename/tag and occupied-slot info/replace/unequip behavior.

## Raids

Raids browser shows each Raid's name, originating Region, Tier and completion/progress. Selecting a Raid opens its requirement evaluation with clear satisfied/not-satisfied states before Start Raid.

## Social fixture

Next test build includes deterministic dummy Friend **Test Ranger** for outgoing/incoming Friend Requests, accept/reject, multiple offers, accept/reject, counteroffer, countered counteroffer, timeout/expiration, state persistence, trade eligibility restrictions, and Showcase viewing in both directions.

## Huntsmanship / Pet fixture

Test creatures cover Tracking → Stalking → Hunt plus Special Creature Hunts and multiple requirement states. **Bramblefox** is the primary full-chain fixture.

Test Pet: **Bramblefox Cub** (QA placeholder). Source: completed Bramblefox Hunt. QA acquisition rate: **50% per completed Hunt**. The Pet Expansion must be purchased in the Store before Pet content is usable. Test Pet equipment/bonus surfaces are included; values are QA-only.

## Ascendant fixture

Include one clearly marked Test Ascendant with persistent Favor/progression and a short active choice/timing minigame. Test failure/retry/progress/reset behavior without treating the Test Ascendant/minigame as final world content.

## Notifications

Notification bell is the central notification inbox. Badge indicates unread events. Tapping bell opens summaries; tapping an event can inspect/deep-link further. Routine activity-completion toasts do not flood the notification inbox.

## Store and purchase gates

Store is a top-level destination for QA. All transactions are clearly marked **Test / $0** while running through entitlement/state flows.

QA products include:
- Pet Expansion;
- Star Fragment purchase;
- Premium Upgrade package;
- simulated rewarded-ad / Daily Focus activation.

Purchase-gated features remain discoverable before purchase. Their gated content is visibly disabled/grayed out with an explicit reason and a deep-link to the relevant Store product. After purchase, returning to the feature immediately reflects the entitlement without an app restart. Free/base functionality must not be grayed out when only an expansion/improvement is premium.

## Forge testing

Forge testing uses universal normal Fragments plus Prismatic Fragments and Star Fragments. Dev/Test controls provide currencies without changing normal eligibility rules. Standard forge remains random eligible unowned card; Star Fragment remains targeted eligible unowned card; Prismatic behavior follows its established purpose.

Random forge result uses pack-like card presentation: card back first, tap to reveal, then normal card result. It does not need dramatic tier suspense because the player selected the Forge tier. Targeted Star Fragment forge can use the same result presentation without pretending the chosen identity is unknown.

## Developer / QA utilities

- Grant All Bindings.
- Grant Forge test currencies.
- Reset test fixtures/entitlements/progression sufficiently to re-test locked/missing/first-acquisition states.
- Settings presented as functional must work and persist; future placeholders must be disabled/labeled rather than silently doing nothing.

## Acceptance

v43's 1,400-execution baseline remains mandatory. v44 adds a dedicated 100-execution UX/system shard, raising the branch acceptance gate to **1,500 executions**. Intended v44 navigation changes may update stale assertions, but behavioral coverage must not be weakened simply to pass CI.
