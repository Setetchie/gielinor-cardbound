# Cardbound — Original IP Vertical Slice v0.1

Status: **Design target**

Purpose: define the first small, fully original playable progression slice. This slice proves that the existing Cardbound systems work without RuneScape/OSRS names, assets, encounter identities, or progression assumptions.

## Design goals

- Preserve the proven loop: Discover → Bind → Equip → Venture → Master → Refine → Collect.
- Make card ownership meaningfully unlock activities.
- Give Melee, Ranged, and Magic starter identities without cloning a source-game ladder.
- Include Woodcraft, Mining, Fishing, Sailing, and Huntsmanship early enough to prove the original world supports non-combat play.
- Use only original names/concepts/art placeholders in the converted slice.
- Keep all names below as working names pending later clearance.

## Starter region: Greenwake Frontier

A temperate frontier surrounding a Binder outpost, old forest, shallow mine, river, and small coast. Greenwake is intentionally compact: every starter profession can be introduced without requiring a world map rewrite.

Subareas:

- **Waystone Outpost** — tutorial hub and Vault/Bindery access.
- **Bramblewood** — Woodcraft and early creature hunting.
- **Greyvein Delve** — Mining and Deepkin encounters.
- **Glasswater Run** — Fishing and river creatures.
- **Tidecross Haven** — starter Sailing port.
- **Oldwatch Ruins** — first mini-boss/collection checkpoint.

## Starter equipment

### Melee
- `field_blade` — **Field Blade** — Common — starter one-handed weapon.
- `ironbound_buckler` — **Ironbound Buckler** — Common — starter off-hand defense.
- `wayfarer_mail` — **Wayfarer Mail** — Common — starter body armor.
- `wayfarer_greaves` — **Wayfarer Greaves** — Common — starter legs.

### Ranged
- `ashwood_bow` — **Ashwood Bow** — Common — starter ranged weapon.
- `field_quiver` — **Field Quiver** — Common — starter ammunition slot.
- `trailhide_jerkin` — **Trailhide Jerkin** — Common — light ranged body armor.
- `trailhide_leggings` — **Trailhide Leggings** — Common.

### Magic
- `emberglass_focus` — **Emberglass Focus** — Common — starter magical focus.
- `binder_rod` — **Binder Rod** — Common — starter magic weapon.
- `sigilweave_robe` — **Sigilweave Robe** — Common.
- `sigilweave_wraps` — **Sigilweave Wraps** — Common.

### Profession tools
- `woodcutter_hatchet` — **Woodcutter's Hatchet** — Common.
- `delvers_pick` — **Delver's Pick** — Common.
- `reedline_rod` — **Reedline Rod** — Common.
- `deckhands_kit` — **Deckhand's Kit** — Common Sailing tool/facility starter.

## Starter creatures

### Bramblewood
- `bramble_rat` — **Bramble Rat** — Common — low HP tutorial creature.
- `thornback_boar` — **Thornback Boar** — Common — tougher early beast.
- `briarling` — **Briarling** — Uncommon — Briarborn creature with light resistance mechanics later.
- `mossfang_wolf` — **Mossfang Wolf** — Uncommon — Fangkin pack hunter.

### Greyvein Delve
- `shardcrawler` — **Shardcrawler** — Common — Deepkin cave scavenger.
- `gloom_bat` — **Gloom Bat** — Common — evasive cave creature.
- `stonehide_mauler` — **Stonehide Mauler** — Rare — first tougher Deepkin target.

### Glasswater / coast
- `reedjaw` — **Reedjaw** — Common — river predator.
- `tideclaw` — **Tideclaw** — Uncommon — coastal Tideborn.

### First mini-boss
- `warden_of_oldwatch` — **Warden of Oldwatch** — Rare — original Binding-damaged guardian at Oldwatch Ruins. Requires several Greenwake encounter cards to challenge.

## Huntsmanship introduction

Huntsmanship begins at level 1. No dead-start requirement.

Starter contracts:

1. **Frontier Vermin** — Bramble Rat / Shardcrawler — Huntsmanship 1.
2. **Fang and Thorn** — Thornback Boar / Mossfang Wolf — Huntsmanship 5.
3. **Deep Delve** — Gloom Bat / Stonehide Mauler — Huntsmanship 12.
4. **Oldwatch Disturbance** — Warden of Oldwatch — Huntsmanship 20 + required encounter card.

Contracts should award normal points plus Huntsmanship XP and later support family-specific rewards.

## Woodcraft progression

Original resource ladder for the slice:

- `greenwake_sapling` — **Greenwake Sapling** — level 1.
- `ironbark_tree` — **Ironbark Tree** — level 15.
- `whisperwillow` — **Whisperwillow** — level 30.
- `gloamwood_tree` — **Gloamwood Tree** — level 50.

The idle ETA should naturally show the next unlock in this sequence.

## Mining progression

- `softstone_outcrop` — **Softstone Outcrop** — level 1.
- `ironvein` — **Ironvein Deposit** — level 15.
- `gloam_ore` — **Gloam Ore Seam** — level 30.
- `starshard_node` — **Starshard Node** — level 55.

## Fishing progression

- `silverfin_shoal` — **Silverfin Shoal** — level 1.
- `reedscale_pool` — **Reedscale Pool** — level 15.
- `glasswater_eel` — **Glasswater Eel Run** — level 30.
- `tideglass_school` — **Tideglass School** — level 50.

## Sailing progression

Starter Sailing remains a category-based profession but receives original actions/facilities.

### Facilities
- `deckhands_kit` — Deckhand's Kit — level 1.
- `salvage_winch` — **Salvage Winch** — level 15.
- `trawl_rig` — **Trawl Rig** — level 25.
- `charting_table` — **Charting Table** — level 35.

### Actions
- **Harbor Deliveries** — Port Tasks — Sailing 1 — Deckhand's Kit.
- **Coastal Soundings** — Charting — Sailing 5 — Deckhand's Kit.
- **Driftwood Recovery** — Salvaging — Sailing 15 — Salvage Winch.
- **Glasswater Trawling** — Trawling — Sailing 25 — Trawl Rig.
- **Outer-Reach Survey** — Charting — Sailing 35 — Charting Table.

## First packs

Working vertical-slice identities:

- **Wayfarer's Cache** — low-cost starter pack; Common/Uncommon focused.
- **Binder's Cache** — mid-tier pack with improved Rare odds.
- **Frontier Reliquary** — higher-cost Greenwake pack with improved Epic/Legendary odds.

Real-money randomized packs are not part of this slice. Packs use gameplay-earned points.

## Conversion strategy

The vertical slice should be implemented behind an original-content data layer rather than renaming live prototype entities in place.

1. Add stable original IDs.
2. Add original cards/activities as data-first registries.
3. Add a development content-mode flag.
4. In original mode, render only original vertical-slice content where implemented.
5. Keep prototype mode temporarily for regression comparison.
6. Replace external art with owned placeholder/original art before any public commercial build.
7. Compare progression pacing with the prototype.
8. Expand domain by domain after the slice passes 50x regression.

## Vertical-slice completion gate

- [ ] All starter cards use original IDs/names.
- [ ] All starter activities use original IDs/names.
- [ ] No third-party asset URLs render in original mode.
- [ ] Melee/Ranged/Magic starter equipment works.
- [ ] Huntsmanship starts at level 1 and progresses.
- [ ] Woodcraft/Mining/Fishing next-unlock ETA works.
- [ ] Sailing navigation, requirements, once, and idle work.
- [ ] Packs can unlock slice cards.
- [ ] Bank/Vault and loadouts work with original equipment.
- [ ] Collection/Codex displays original entities.
- [ ] Duplicate shredding/fragments work.
- [ ] 50x regression clean.
