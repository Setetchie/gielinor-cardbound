# Cardbound — Original IP Conversion Roadmap

Status: **Active**

Goal: convert the current RuneScape/OSRS-derived gameplay prototype into a commercially publishable original fantasy collectible progression game while preserving the proven gameplay architecture.

This roadmap is a production checklist, not a legal clearance opinion.

## Ground rules

1. Preserve the current prototype until a replacement system is verified.
2. Convert by **content domain**, not random individual renames.
3. Do not create thin one-to-one reskins of distinctive third-party characters/items/bosses.
4. Replace third-party visual/audio assets completely.
5. Keep stable internal migrations so existing development saves can be converted during testing.
6. Maintain automated regression coverage throughout conversion.
7. Run an automated prohibited-term/asset audit before any public commercial build.

---

## Stage 0 — Stabilize architecture

- [x] Establish 50x browser regression baseline.
- [x] Consolidate Activity + Sailing navigation/rendering.
- [x] Consolidate Home/Bank/Collection routing.
- [x] Consolidate idle settlement/progress.
- [x] Consolidate content registration into data-focused modules.

Reason: separating content data from UI/gameplay logic makes the IP conversion dramatically safer.

## Stage 1 — Original world foundation

- [x] Create `docs/WORLD_BIBLE.md`.
- [x] Define Binding/Codex fiction for the card-unlock mechanic.
- [x] Define broad combat disciplines.
- [x] Define original profession direction.
- [x] Define original Ascendant/allegiance concept.
- [x] Define original Expeditions/Trials endgame direction.
- [ ] Select final world name after clearance.
- [ ] Select final game title after clearance.
- [ ] Create final Ascendant roster/names/symbols.
- [ ] Create region/biome roster.
- [ ] Create creature-family taxonomy.

## Stage 2 — Build the conversion ledger

Create `data/ip-conversion.json` as the authoritative mapping for every prototype entity.

Each entry should track:

```json
{
  "legacyId": "prototype_id",
  "legacyName": "Prototype Name",
  "domain": "equipment|monster|resource|activity|deity|location|pack|ui|other",
  "replacementId": null,
  "replacementName": null,
  "replacementConcept": null,
  "artStatus": "needed",
  "codeStatus": "legacy",
  "clearanceStatus": "unreviewed",
  "notes": ""
}
```

Checklist:

- [x] inventory all cards in `C`/`B`;
- [x] inventory all activities in `A`;
- [x] inventory equipment;
- [x] inventory monsters/bosses;
- [x] inventory resources and skilling nodes;
- [x] inventory Sailing facilities/actions;
- [x] inventory gods/allegiance content;
- [x] inventory raids/gauntlets/encounter sequences;
- [x] inventory pack names/rarities;
- [x] inventory UI terminology;
- [x] inventory external image/asset URLs;
- [x] inventory remaining RuneScape/Jagex terms in source files.

## Stage 3 — Original content database

Convert the runtime from historical patch-style content additions to data-first registries.

Suggested target structure:

```text
data/
  cards/
    equipment.js
    creatures.js
    resources.js
    facilities.js
    ascendants.js
  activities/
    combat.js
    huntsmanship.js
    woodcraft.js
    mining.js
    fishing.js
    sailing.js
    expeditions.js
  progression.js
  packs.js
  ip-conversion.json
```

Checklist:

- [ ] establish stable original IDs;
- [ ] add save-ID migration table;
- [ ] replace prototype item ladder;
- [ ] replace prototype creature roster;
- [ ] replace boss roster;
- [ ] replace resource roster;
- [ ] replace Huntsmanship progression;
- [ ] replace Sailing content where source-specific;
- [ ] replace Ascendants;
- [ ] replace Expeditions/Trials;
- [ ] replace pack identities;
- [ ] replace source-specific requirements with original balance targets.

## Stage 4 — Visual asset conversion

No commercial build may reference third-party game asset hosts.

Create an original art specification before generating final assets:

- [ ] card illustration dimensions/aspect ratio;
- [ ] equipment icon style;
- [ ] creature portrait style;
- [ ] resource/node style;
- [ ] Ascendant art direction;
- [ ] rarity frame language;
- [ ] Perfect/Foil treatment;
- [ ] pack art system;
- [ ] Vault equipment-slot visuals;
- [ ] original app icon/logo;
- [ ] original loading/splash artwork.

Asset ledger fields:

```text
asset ID
entity ID
artist/source
creation date
license/ownership
source file
export file
approved
```

Every production asset must have provenance recorded.

Art development proceeds gradually alongside original content production: establish the visual grammar first, then create and review representative Region, card, creature, equipment, resource, Pet, and Pack assets before scaling each family. Friends & Family may use owned original placeholders where final polish is incomplete, but must not receive third-party-derived assets or imagery.

## Stage 5 — Gameplay differentiation

After the content conversion is structurally safe:

- [ ] monster weaknesses/resistances;
- [ ] meaningful Melee/Ranged/Magic differences;
- [ ] weapon traits;
- [ ] armor/set synergies;
- [ ] original boss mechanics;
- [ ] Huntsmanship contract mechanics;
- [ ] Ascendant active/passive benefits;
- [ ] Expedition mechanics;
- [ ] profession-specific resource loops;
- [ ] collection milestones;
- [ ] improved targeted fragment crafting;
- [ ] economy/balance simulation.

## Stage 6 — Automated IP audit

Add CI checks that fail commercial builds if prohibited legacy content remains.

Audit categories:

- known RuneScape/OSRS names;
- Jagex references;
- legacy IDs not explicitly migration-only;
- known third-party asset domains;
- source-specific deity/boss/location names;
- old branding strings such as `Gielinor`;
- production references to prototype-only art files.

Exceptions must be explicitly allowlisted for migration tooling/tests and must never render to players.

Target gate:

**0 prohibited player-facing strings + 0 third-party production assets.**

## Stage 7 — Brand clearance

Before committing to final public branding:

- [ ] search candidate game title on general web;
- [ ] search Apple App Store / Google Play / Steam;
- [ ] search USPTO and other launch-market trademark registries;
- [ ] check confusingly similar game/software marks;
- [ ] check studio name separately;
- [ ] check domains/social handles;
- [ ] retain clearance notes;
- [ ] seek trademark counsel before relying commercially on the final mark.

Do not assume `Cardbound`, `The Shattered Reach`, `Ascendants`, or other working names are cleared merely because they appear in design documents.

## Stage 8 — Commercial/mobile infrastructure

- [ ] choose mobile wrapper/native architecture;
- [ ] Android package/application ID;
- [ ] iOS bundle ID;
- [ ] production save migrations;
- [ ] cloud save strategy;
- [ ] privacy policy;
- [ ] terms of service;
- [ ] analytics/crash reporting policy;
- [ ] account deletion if accounts exist;
- [ ] store billing for Supporter/cosmetics;
- [ ] rewarded-ad provider only if retained;
- [ ] consent/privacy flows where required;
- [ ] offline behavior;
- [ ] anti-tamper/server authority decision for paid entitlements;
- [ ] accessibility pass;
- [ ] tablet layouts;
- [ ] physical Android/iPhone testing.

## Stage 9 — Monetization target

Initial recommended model:

**Free core game + optional one-time Supporter upgrade + cosmetics.**

Avoid at initial launch:

- mandatory interstitial advertising;
- direct purchase of best-in-slot combat power;
- real-money randomized card packs;
- progression designed around ad friction.

Possible Supporter benefits:

- ad-free experience if rewarded ads are present;
- premium card backs;
- Vault themes;
- profile cosmetics;
- pack-opening visual themes;
- advanced collection statistics;
- additional cosmetic loadout slots/themes.

## Stage 10 — Release gates

A commercial beta cannot ship until all are true:

- [ ] 50x regression suite clean;
- [ ] IP audit clean;
- [ ] all production art provenance recorded;
- [ ] no third-party game assets in production bundle;
- [ ] final brand clearance completed;
- [ ] privacy/store requirements completed;
- [ ] monetization flows tested;
- [ ] save migration tested;
- [ ] Android physical-device pass;
- [ ] iPhone physical-device pass;
- [ ] store screenshots/metadata use only original IP.

---

## Immediate next development order

1. Finish architecture cleanup from Stage 0.
2. Generate the complete conversion ledger automatically from the current content database/source tree.
3. Publish an architecture-stable owner build and complete Setetchie's next hands-on app-testing pass.
4. Reconcile the final original-content production scope from those findings, including the initial Region roster, alpha card catalog, Pack catalog/pools, and Pet Expansion contract.
5. Design the first original vertical slice: starter equipment + starter creatures + Woodcraft/Mining/Fishing + first Sailing activities.
6. Establish the Visual Bible and begin representative image designs alongside that slice.
7. Replace the prototype content for that vertical slice behind a development flag and verify stable save-ID migration.
8. Expand the original data/content domain-by-domain into multiple complete Regions.
9. Develop every card and Pack intended for Friends & Family with explicit acquisition sources and validated eligible pools.
10. Flesh out the Pet Expansion sufficiently for full acquisition/progression/equipment/bonus/purchase-gate testing.
11. Remove all remaining legacy player-facing content and third-party-derived assets; pass the automated IP/asset audit.
12. Freeze and validate the Friends & Family build with focused, full 1×, and approved repetition testing before inviting external testers.

## Friends & Family original-content target

Friends & Family testing is an original-content alpha gate, not an IP-conversion work session. Entry requires multiple end-to-end original Regions, the full card and Pack scope selected for that build, appropriate Pack pools, a mostly fleshed-out Pet Expansion, and zero prohibited player-facing RuneScape/OSRS/Jagex-derived content or third-party game assets.

Still to resolve before scope freeze:

- exact number, order, names, themes, and mechanical profiles of the initial Regions;
- exact alpha card count and per-Region/domain distribution;
- exact Pack roster, pool boundaries, rarity distributions, and acquisition cadence;
- final Pet Expansion architecture, roster, progression, equipment, bonuses, sources, entitlement details, and balance;
- which images must be final versus owned original placeholders for Friends & Family.
