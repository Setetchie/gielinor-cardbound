# Cardbound v44 Owner Test Feedback — 2026-08-19

## Session rule

- Record Setetchie's observations during the active owner test without changing application code.
- Do not diagnose, implement, validate, commit, push, merge, or publish individual observations during the session unless Setetchie explicitly interrupts this rule.
- After Setetchie explicitly says testing is complete, reconcile the full list, identify conflicts/questions, agree the batch scope where needed, and then implement the changes together through the normal validation and publication gates.

## Active test build

- **Visible version:** `Cardbound v44`
- **Build:** `2026-08-17.v44-ux-test`
- **Published commit:** `0cadf902c64824b033d8512a0a3017dc801c7907`
- **Tester URL:** `https://setetchie.github.io/gielinor-cardbound/`
- **Deployment/access:** GitHub Pages successful; HTTP 200 verified.

## Queued observations

### V44-OWNER-001 — Persistent stacked header and navigation

- **Status:** `QUEUED`
- **Source:** Setetchie owner testing, 2026-08-19.
- **Observation/request:** Keep the app identity/status section containing the app name, points, and related account information visible at the top of the screen while content scrolls.
- **Required order:** The app identity/status header is the uppermost fixed/sticky section. The persistent primary navigation bar sits immediately beneath it, not above it.
- **Implementation timing:** Batch after Setetchie declares the owner test complete.
- **Code change made during testing:** No.

### V44-OWNER-002 — Preserve horizontal navigation position

- **Status:** `QUEUED`
- **Source:** Setetchie owner testing, 2026-08-19.
- **Observation/request:** When a primary navigation option is tapped, the horizontally scrollable navigation bar currently snaps back to its starting position and forces the user to scroll across the menu again.
- **Required behavior:** Preserve the navigation bar's horizontal scroll position across destination selection and rerendering. Keep the selected destination visible without resetting the menu to its first item.
- **Implementation timing:** Batch after Setetchie declares the owner test complete.
- **Code change made during testing:** No.

### V44-OWNER-003 — Restore account-summary-first Home page

- **Status:** `QUEUED`
- **Source:** Setetchie owner testing, 2026-08-19.
- **Observation:** Setetchie preferred the earlier first portion of the Home page.
- **Required content order:** Begin Home with a simple account snapshot showing collected-card progress, the account's current progression stage/Region, and general Skill levels. Follow that summary with quick-access buttons for the most commonly used navigation destinations.
- **Reconciliation note:** Confirm the final quick-access destination set after the owner test if the remaining observations do not make it unambiguous. Do not invent the roster during testing.
- **Implementation timing:** Batch after Setetchie declares the owner test complete.
- **Code change made during testing:** No.

### V44-OWNER-004 — Consolidate Activity groups

- **Status:** `QUEUED` with one `OPEN` placement question.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Required Activity groups:** Combat; Skilling; Raids; and possibly Exploration.
- **Skilling definition:** Combine Gathering and the other non-combat Skills under one player-facing Skilling group rather than presenting Gathering as the overarching Activity group.
- **Open placement question:** Decide after owner-test reconciliation whether Exploration belongs inside Activities as a group or remains its own larger primary menu/destination.
- **Implementation timing:** Batch after Setetchie declares the owner test complete and resolves the Exploration placement if it remains ambiguous.
- **Code change made during testing:** No.

### V44-OWNER-005 — Travel progression precedes Sailing

- **Status:** `QUEUED`; confirms the existing accepted architecture.
- **Source:** Setetchie owner testing, 2026-08-19; consistent with `docs/ARCHITECTURE_DECISIONS.md`.
- **Required hierarchy:** Travel is the broad Skill. Trails and Caravans are its early subsets. Sailing unlocks later as another Travel subset/discipline rather than appearing as its own permanent Skill.
- **Current-build issue:** Existing Sailing presentation/content should be reframed within this Travel progression and should not imply that Sailing is available before the early Travel subsets and its unlock requirements.
- **Implementation timing:** Batch after Setetchie declares the owner test complete.
- **Code change made during testing:** No.

### V44-OWNER-006 — Combat filter text has no controls

- **Status:** `QUEUED BUG`.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Observed behavior:** The Combat Activity screen contains text describing filters, but the corresponding filter controls are absent.
- **Required behavior:** Provide the actual visible and usable Combat filtering controls wherever the interface promises them. Labels/help text must correspond to the controls and their real behavior; do not leave instructional copy for nonexistent controls.
- **Implementation timing:** Batch after Setetchie declares the owner test complete.
- **Code change made during testing:** No.

### V44-OWNER-007 — Remove one-off Activity action

- **Status:** `QUEUED`; confirms the idle-first product direction.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Required behavior:** Remove the `Once` option from Activities. Routine Activities run through idle progression rather than individual manual action taps.
- **Active-play role:** Optional interactions may increase actions/progress while the Activity runs, but they are enhancements to the idle loop rather than a required per-action control.
- **Open implementation detail:** Do not invent the interaction types, frequency, acceleration amount, rewards, or balance during testing; reconcile those mechanics after the full feedback pass where not already authoritative.
- **Implementation timing:** Batch after Setetchie declares the owner test complete.
- **Code change made during testing:** No.

### V44-OWNER-008 — Phone Back follows menu history

- **Status:** `QUEUED REQUIREMENT` for navigation architecture/native packaging.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Required behavior:** Cardbound maintains a real menu/navigation history. In an Android packaged app, the system Back button moves to the prior Cardbound menu/view before app exit. Browser/PWA Back should follow the same meaningful history where supported.
- **iPhone behavior:** Support equivalent in-app Back navigation and the platform-appropriate back-swipe/navigation behavior; iPhones do not provide an Android-style hardware Back button.
- **Exit guardrail:** Android Back should exit only when no meaningful prior in-app destination remains; exact double-back/confirmation behavior can be chosen during native-shell design.
- **Implementation timing:** Reconcile with the post-test navigation batch and preserve as a native-app packaging acceptance requirement.
- **Code change made during testing:** No.

### V44-OWNER-009 — Skill list and subset-Mastery detail hierarchy

- **Status:** `QUEUED`.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Skills overview:** Show each broad Skill and its current Skill level.
- **Skill drill-down:** Tapping a Skill opens its detail view and reveals that Skill's subsets with their individual Masteries.
- **Persistent Skill progress in detail:** While viewing subsets/Masteries, continue displaying the parent Skill's current level, current XP, and XP required for the next Skill level.
- **Hierarchy guardrail:** Skill level/XP and subset Mastery are distinct progression layers and must not be visually or mechanically conflated.
- **Implementation timing:** Batch after Setetchie declares the owner test complete.
- **Code change made during testing:** No.

### V44-OWNER-010 — Combat level with style Masteries

- **Status:** `QUEUED`; Combat-specific application of `V44-OWNER-009` and the accepted single-Combat-Skill architecture.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Parent progression:** Combat displays one overall Combat level, current Combat XP, and XP required for the next Combat level.
- **Mastery progression:** Combat detail displays individual Melee, Ranged, and Magic Masteries beneath the parent Combat progression.
- **Hierarchy guardrail:** Melee, Ranged, and Magic are Combat styles/Masteries, not separate permanent Skills.
- **Implementation timing:** Batch after Setetchie declares the owner test complete.
- **Code change made during testing:** No.

### V44-OWNER-011 — Parent Skill progress on every subset/activity screen

- **Status:** `QUEUED`; extends `V44-OWNER-009` and `V44-OWNER-010`.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Required context:** Every subset detail/activity-list section displays the parent broad Skill's current level, current XP, and XP required for the next Skill level.
- **Reason:** Activities within a subset have different parent-Skill level requirements, so players must be able to compare those requirements against their current progression without backing out of the subset.
- **Activity presentation:** Retain each Activity's own level requirement/blocker alongside the persistent parent-Skill progress summary.
- **Implementation timing:** Batch after Setetchie declares the owner test complete.
- **Code change made during testing:** No.

### V44-OWNER-012 — Always display Activity level requirements

- **Status:** `QUEUED`; refines `V44-OWNER-011`.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Required behavior:** Every subset Activity action/row/card always shows its required parent-Skill level, including when the player has unlocked the Activity and already meets the requirement.
- **Presentation guardrail:** Availability/current blocker state may be shown separately, but `Available`, an unlocked Binding, or a met requirement must never replace or hide the numeric Skill-level requirement.
- **Implementation timing:** Batch after Setetchie declares the owner test complete.
- **Code change made during testing:** No.

### V44-OWNER-013 — Default Activity sorting by required level

- **Status:** `QUEUED`.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Required default:** Sort Activity lists by parent-Skill level requirement in ascending order, with the lowest required level first.
- **Sort behavior:** Other explicit sort choices may remain available, but the default/reset ordering returns to ascending level requirement and its label clearly communicates that direction.
- **Implementation timing:** Batch after Setetchie declares the owner test complete.
- **Code change made during testing:** No.

### V44-OWNER-014 — Action popups layer above sticky app chrome

- **Status:** `QUEUED BUG`; reinforces the accepted v44 popup contract.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Required behavior:** The temporary popup/toast produced after an action appears at the top of the visible screen and layers above both the sticky app identity/status header and the persistent navigation menu.
- **Interaction behavior:** Routine action popups remain temporary and auto-dismiss; sticky header/navigation elements must not cover or clip them.
- **Implementation timing:** Batch after Setetchie declares the owner test complete.
- **Code change made during testing:** No.

### V44-OWNER-015 — Displayed Activity requirements must match enforcement

- **Status:** `QUEUED BUG`; correctness requirement extending `V44-OWNER-011`–`013`.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Required behavior:** The parent-Skill level requirement displayed for an Activity exactly matches the level requirement actually used by eligibility/blocker enforcement.
- **Data guardrail:** Display and enforcement must derive from one authoritative requirement value/source rather than parallel values that can drift.
- **Coverage expectation:** Post-test implementation should verify representative locked, Binding-missing, level-met, and unlocked Activities, including default level sorting against the same requirement data.
- **Implementation timing:** Batch after Setetchie declares the owner test complete.
- **Code change made during testing:** No.

### V44-OWNER-016 — Travel/Sailing uses the standard Activity idle bar

- **Status:** `QUEUED BUG`; presentation consistency requirement.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Observed issue:** The active idle bar for current Travel/Sailing Activities does not display like the idle bar used by standard Activities such as Woodcutting.
- **Required behavior:** Travel/Sailing uses the same shared active-idle component, layout, progress presentation, controls, and information hierarchy as Woodcutting and other normal Activities. Only Activity-specific names, values, requirements, and rewards differ.
- **Architecture guardrail:** Do not preserve or create a separate Sailing-only idle presentation path when the standard Activity idle presentation can represent Travel/Sailing.
- **Implementation timing:** Batch after Setetchie declares the owner test complete.
- **Code change made during testing:** No.

### V44-OWNER-017 — Huntsmanship uses standard Activity information and idle timing

- **Status:** `QUEUED`.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Required Activity information:** Huntsmanship Activities display their idle time/duration and the same standard comparison information used by other Activities, including applicable Skill requirement, XP/action, Pack Points/action, Idle Efficiency, and Time/action.
- **Active idle presentation:** When Huntsmanship is running, use the shared standard Activity idle-bar structure and live progress presentation rather than a Huntsmanship-only abbreviated format.
- **Identity guardrail:** Track, Stalk, Hunt, and Special Hunt distinctions may retain their authored mechanics/labels, but they do not omit the common Activity information hierarchy.
- **Implementation timing:** Batch after Setetchie declares the owner test complete.
- **Code change made during testing:** No.

### V44-OWNER-018 — Pet events notify in-game and by push

- **Status:** `QUEUED`.
- **Source:** Setetchie owner testing, 2026-08-19.
- **In-game channel:** Important Pet events, especially first/new Pet acquisition, always create a visible in-game notification and durable entry in the notification inbox.
- **Push channel:** The same event also produces a device push notification when the player has enabled the relevant notification setting and granted device/browser permission.
- **Channel guardrail:** Push is supplemental and must never replace or suppress the in-game notification record. Denied/unavailable push permission must not prevent the in-game event.
- **Implementation timing:** Reconcile exact Pet event categories in the post-test batch where needed; preserve as a native/PWA notification requirement.
- **Code change made during testing:** No.

### V44-OWNER-019 — Raid idle information, active bar, and confirmed stop

- **Status:** `QUEUED`; one token-consequence detail remains for reconciliation.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Raid information:** Raid selection/requirement detail includes its applicable idle timing and the same relevant standard Activity comparison information.
- **Active presentation:** While a Raid is running, display the shared active idle bar with Raid-specific progress and values.
- **Stop behavior:** An active Raid may provide `Stop Activity`, but stopping requires an explicit confirmation because beginning/attempting Raids consumes a Raid token.
- **Confirmation content:** Clearly state the consequence to the current Raid attempt and token before confirmation. Do not invent whether a token is retained, refunded, or consumed on manual stop; reconcile that exact rule against the authoritative Raid design after the feedback pass.
- **Implementation timing:** Batch after Setetchie declares the owner test complete and the token consequence is confirmed if still unresolved.
- **Code change made during testing:** No.

### V44-OWNER-020 — Raid section returns to Activity Groups

- **Status:** `QUEUED BUG`.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Required behavior:** The Raid section includes a clearly labeled `Back to Activity Groups` control that returns to the grouped Activities overview.
- **Navigation integration:** The transition participates in the same meaningful navigation history required by `V44-OWNER-008`, so in-app Back and platform/browser Back behavior remain consistent.
- **Implementation timing:** Batch after Setetchie declares the owner test complete.
- **Code change made during testing:** No.

### V44-OWNER-021 — Exploration idle bar shows non-stoppable commitment

- **Status:** `QUEUED`; consistent with committed Exploration behavior.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Active presentation:** While Exploration is running, display the shared idle Activity bar with applicable Exploration name, timing, progress, and checkpoint/context information.
- **Stop behavior:** Clearly show that the active Exploration cannot be stopped/cancelled during its committed segment. Do not present an enabled `Stop Activity` action.
- **Explanation:** The idle bar communicates why stopping is unavailable and, where applicable, when the next checkpoint or permissible decision point occurs.
- **Implementation timing:** Batch after Setetchie declares the owner test complete.
- **Code change made during testing:** No.

### V44-OWNER-022 — Scrollable World map with three-stage cloud reveal

- **Status:** `QUEUED PRODUCT DIRECTION`.
- **Source:** Setetchie owner testing, 2026-08-19.
- **World entry:** The World menu begins on a map the player can pan/scroll around. The navigable map expands as world progression exposes additional territory.
- **Undiscovered state:** Locations/territory not yet discovered are covered by a dense, opaque cloud layer. The player cannot see the underlying environment, Location identity, names, or information.
- **Discovered but unexplored state:** The relevant map environment becomes partially visible beneath a thinner, translucent cloud layer. This provides environmental context without revealing Location names/identities or full details.
- **Explored state:** Clouds clear and the Location/environment is fully revealed, including its name and available explored information.
- **Progression effect:** The world reveals gradually in two meaningful steps—discovery provides a veiled environmental preview; completed Exploration provides full reveal.
- **Interaction/accessibility expectation:** Cloud states and Location state must remain understandable through more than opacity alone, with touch-friendly map movement and clear explored/discovered state feedback.
- **Implementation timing:** Reconcile map production/asset scope after Setetchie declares the owner test complete; implement through the post-test batch or its deliberately scoped World-map follow-up.
- **Code/image change made during testing:** No.

### V44-OWNER-023 — Expand Stats with Region records and Achievements

- **Status:** `QUEUED`; detailed category audit required before implementation.
- **Source:** Setetchie owner testing, 2026-08-19; references previously discussed Stats/Achievement structures.
- **Required scope:** Stats is a deeper account-record area that includes Region-specific statistics/progression and Achievements in addition to general account, activity, pack, and collection records already represented or previously accepted.
- **Navigation expectation:** Region Stats and Achievements are discoverable from within the Stats section through clear categories/drill-downs rather than being reduced to one flat summary.
- **Reconciliation requirement:** After the owner test, audit the authoritative design/history for the previously discussed Stats categories, Region records, Achievement structure, names, and reward/display rules. Do not invent or silently omit categories based only on the current thin QA fixture.
- **Implementation timing:** Batch after Setetchie declares the owner test complete and the prior design is reconciled.
- **Code change made during testing:** No.

### V44-OWNER-024 — Expand Codex Collection filters

- **Status:** `QUEUED`.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Required filters:** Add equipment slot, associated Activity, and Region filters to Codex → Card Collection alongside the existing collection controls.
- **Metadata requirement:** Filter membership derives from authoritative card/content-registry metadata, including equipment slot, Activity Binding/association, and Region ownership/eligibility, rather than duplicated presentation-only lists.
- **Interaction expectation:** Filters are clearly labeled, may be combined where supported, communicate active selections/result counts, and provide a clear reset path.
- **Implementation timing:** Batch after Setetchie declares the owner test complete; reconcile cards with missing/legacy metadata during implementation rather than silently misclassifying them.
- **Code change made during testing:** No.

### V44-OWNER-025 — Collection equipment details close on backdrop tap

- **Status:** `QUEUED BUG`.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Required behavior:** When equipment/card information is opened from Codex → Card Collection, tapping the backdrop/outside the information panel closes the popup.
- **Interaction guardrail:** Tapping or scrolling inside the information panel does not dismiss it accidentally. The explicit close control remains available.
- **Implementation timing:** Batch after Setetchie declares the owner test complete.
- **Code change made during testing:** No.

### V44-OWNER-026 — Collection tiles show standard and premium-variant counts

- **Status:** `QUEUED`; one terminology reconciliation point.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Required tile information:** Every Codex → Card Collection option/tile shows how many copies of that Binding/card are owned without requiring the detail popup.
- **Standard count treatment:** Display the standard-copy count as a simple high-contrast white/neutral number in one tile corner (top or bottom left is acceptable during visual design).
- **Premium/perfect count treatment:** Display the count of the premium/perfect variant in the opposite corner (top or bottom right) using a distinct rainbow/iridescent treatment.
- **Layout guardrail:** Counts remain legible at phone tile sizes, do not obscure card identity/art/status, and use consistent corner placement across the Collection.
- **Terminology question:** Reconcile whether Setetchie's `perfect` wording refers to the currently named `Foil` variant or establishes/recalls a separate/final `Perfect` term. Do not rename or merge variants by assumption.
- **Implementation timing:** Batch after Setetchie declares the owner test complete and terminology is resolved if necessary.
- **Code change made during testing:** No.

### V44-OWNER-027 — Collection tiles label cards by name

- **Status:** `QUEUED`.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Required tile label:** Codex → Card Collection tiles display the Binding/card name as their primary text label rather than displaying rarity in that position.
- **Rarity treatment:** Rarity may remain communicated through border/color/icon treatment, filters, accessibility text, or the detail view, but it does not replace the card's name on the tile.
- **Layout expectation:** Card names remain readable at compact phone tile sizes alongside the copy counters from `V44-OWNER-026`.
- **Implementation timing:** Batch after Setetchie declares the owner test complete.
- **Code change made during testing:** No.

### V44-OWNER-028 — Pulled-card frames match rarity colors

- **Status:** `QUEUED`.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Required reveal treatment:** When a card/Binding is pulled or forged, its visible frame/border is color-coded to the card's actual rarity using the established rarity palette.
- **Result consistency:** The revealed/result card retains its matching rarity frame through the pull result sequence rather than reverting to a generic border.
- **Correctness/accessibility guardrail:** Frame color derives from authoritative rarity data, and rarity remains available through text/accessibility treatment so color is not the only indicator.
- **Implementation timing:** Batch after Setetchie declares the owner test complete; audit the final rarity palette during visual reconciliation.
- **Code/visual change made during testing:** No.

### V44-OWNER-029 — Foil pulls reveal the holographic card front

- **Status:** `QUEUED BUG`.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Observed behavior:** A Foil card can remain displaying only its card back when pulled instead of revealing its identity/front.
- **Required behavior:** After the normal card-back reveal interaction, a Foil pull displays the actual card front with the foil/holographic visual treatment and the correct rarity frame.
- **Result consistency:** The foil/holographic front remains visible in the pull result and subsequent relevant detail/result presentation; foil status does not substitute the back for the front.
- **Implementation timing:** Batch after Setetchie declares the owner test complete.
- **Code/visual change made during testing:** No.

### V44-OWNER-030 — Search typing preserves mobile keyboard and focus

- **Status:** `QUEUED BUG`.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Observed behavior:** Entering a letter in a search bar causes the input to lose focus and the phone keyboard to close, requiring the player to reactivate the field for every character.
- **Required behavior:** Search inputs retain focus, the current text selection/cursor position, and the open mobile keyboard across keystrokes while results update.
- **Implementation guardrail:** Live filtering may update without replacing/recreating the focused input element. If a deliberate debounce is used, it must not introduce lost characters or visible input lag.
- **Coverage expectation:** Verify multi-character typing and deletion in the Collection and every other live search field on a phone-sized/touch context.
- **Implementation timing:** Batch after Setetchie declares the owner test complete.
- **Code change made during testing:** No.

### V44-OWNER-031 — Foil treatment must not obstruct Collection modal close

- **Status:** `QUEUED BUG`.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Observed behavior:** The Foil bar/overlay in a Codex Collection item's information popup overlaps and blocks the close button.
- **Required behavior:** The modal close control remains fully visible, unobstructed, and touchable above or outside all Foil/holographic decorative layers.
- **Interaction/layering guardrail:** Foil effects remain pointer-transparent where decorative and stay clipped/scoped to the card presentation rather than covering modal controls. Backdrop dismissal from `V44-OWNER-025` also remains available.
- **Implementation timing:** Batch after Setetchie declares the owner test complete.
- **Code/visual change made during testing:** No.

### V44-OWNER-032 — Capitalize player-facing equipment-slot labels

- **Status:** `QUEUED`.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Required behavior:** Equipment-slot names displayed on cards, Collection details, Bank/equipment information, filters, and related player-facing surfaces begin with appropriate capitalization and use the accepted readable slot names.
- **Examples:** `Head`, `Body`, `Legs`, `Main Hand`, `Off Hand`, `Boots`, `Jewelry`, `Cape / Back`.
- **Data guardrail:** Preserve stable lowercase/internal slot IDs where needed for saves and logic; format through one shared player-facing label mapping rather than altering identifiers or applying inconsistent ad hoc casing.
- **Implementation timing:** Batch after Setetchie declares the owner test complete.
- **Code change made during testing:** No.

### V44-OWNER-033 — Loadouts must not cause Bank horizontal overflow

- **Status:** `QUEUED BUG`.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Observed behavior:** Loadout equipment content is wider than the phone screen, causing the entire Bank page to scroll left and right.
- **Required behavior:** Bank and Loadout pages remain constrained to the viewport with no unintended document-level horizontal scrolling.
- **Responsive layout:** Loadout equipment slots/items wrap responsively; use two rows on narrow screens when needed instead of forcing every item into one row. Labels/content may shrink or wrap only while remaining readable and touchable.
- **Coverage expectation:** Verify representative full Loadouts at narrow phone widths and confirm the Bank document width does not exceed the viewport.
- **Implementation timing:** Batch after Setetchie declares the owner test complete.
- **Code change made during testing:** No.

### V44-OWNER-034 — Guided Loadout save with category and custom name

- **Status:** `QUEUED`; category-list audit required.
- **Source:** Setetchie owner testing, 2026-08-19; references the previously discussed Loadout categories/tags.
- **Save flow:** When saving a Loadout, present the accepted Loadout category/tag options, then prompt the player to enter a custom Loadout name, then save the current/edited equipment configuration.
- **Result:** Saved Loadouts retain both the selected category/tag and the player-defined name; the compact overview can continue showing name + tag as previously accepted.
- **Reconciliation requirement:** Audit the authoritative prior design for the exact category/tag roster, naming, selection limits, defaults, and editing behavior. Do not invent a substitute category list from the current QA fixture.
- **Validation expectation:** Verify creation, cancellation, required/optional fields, rename/category edit, persistence, and duplicate-name handling against the reconciled rules.
- **Implementation timing:** Batch after Setetchie declares the owner test complete and the prior category design is reconciled.
- **Code change made during testing:** No.

### V44-OWNER-035 — Equip to Specific Loadout must function

- **Status:** `QUEUED BUG`.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Observed behavior:** The `Equip to Specific Loadout` action does not perform the assignment.
- **Required flow:** Selecting the action opens a usable Loadout picker; choosing a Loadout assigns the selected eligible item to its correct slot in that Loadout.
- **Replacement/persistence:** If the slot is occupied, show the existing item and require a clear replace/cancel decision. Persist the chosen Loadout update and provide visible confirmation without changing the currently equipped setup unless the player separately equips that Loadout.
- **Eligibility guardrail:** Ineligible slot/item assignments remain blocked with a clear reason. The flow uses the accepted slot mapping and the reconciled Loadout model from `V44-OWNER-034`.
- **Implementation timing:** Batch after Setetchie declares the owner test complete.
- **Code change made during testing:** No.

### V44-OWNER-036 — Active Pet and owned-Pet home hierarchy

- **Status:** `QUEUED`; final owned-Pet area name remains open.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Pet-page hierarchy:** Show an `Active Pet` section at the top, followed by a dedicated area containing the player's owned but inactive Pets.
- **Equip behavior:** Equipping an owned Pet moves/presents it in the top Active Pet section and removes it from the inactive owned-Pet listing while active.
- **Unequip behavior:** Unequipping the active Pet clears the Active Pet position and returns that Pet to the owned-Pet listing.
- **Working terminology:** `Menagerie`, `Pet House`, or another original setting-appropriate name; choose the final term during post-test IP/content reconciliation rather than by assumption.
- **State guardrail:** Ownership persists independently of active/equipped state; moving between sections never grants, duplicates, or removes Pet ownership.
- **Implementation timing:** Batch after Setetchie declares the owner test complete; coordinate with the broader Pet Expansion reconciliation.
- **Code/content change made during testing:** No.

### V44-OWNER-037 — Active Pet displays effective benefits and gear bonuses

- **Status:** `QUEUED`; exact values remain subject to Pet-system reconciliation/balance.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Required display:** The Active Pet section shows the Pet's currently active benefits/effects.
- **Breakdown:** Distinguish the Pet's inherent/base benefits from bonuses contributed by each equipped Pet-gear item, then show the effective combined result where applicable.
- **State behavior:** Equipping, replacing, or removing Pet gear updates the displayed effective benefits immediately and persists consistently. Unequipping the Pet makes clear that its benefits are no longer active without losing owned Pet/gear state.
- **Accuracy guardrail:** Displayed benefits derive from the same authoritative effect calculation used by gameplay; do not show QA-only values as final balance.
- **Implementation timing:** Batch after Setetchie declares the owner test complete and coordinate with the broader Pet Expansion reconciliation.
- **Code/content change made during testing:** No.

### V44-OWNER-038 — Dedicated Pet Equipment storage

- **Status:** `QUEUED`; exact final name/layout remains part of Pet-system reconciliation.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Required area:** The Pet section includes a dedicated Pet Equipment inventory/storage view, analogous to a small Bank but scoped specifically to owned Pet gear.
- **Core behavior:** Show owned Pet-equipment items/copy state; allow item inspection; make eligible gear available for equipping, replacing, or removing from the active Pet; and clearly distinguish equipped versus available items.
- **Separation:** Pet Equipment storage is accessible from the Pet section and does not force players to manage Pet gear through the ordinary player-equipment Bank interface. Underlying ownership must remain single-source and must not duplicate items between inventories.
- **Usability expectation:** Provide appropriate Pet-slot/category filters and phone-safe responsive layout where the Pet gear catalog requires them.
- **Implementation timing:** Batch after Setetchie declares the owner test complete and coordinate with the broader Pet Expansion/storage model.
- **Code/content change made during testing:** No.

### V44-OWNER-039 — Active idle bar shows applicable bonus sources

- **Status:** `QUEUED`; exact benefit math remains subject to authoritative system/balance rules.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Required display:** The active idle Activity bar shows the bonuses/effects currently applying to that specific Activity.
- **Source breakdown:** Attribute applicable effects to player equipment, the active Pet, and equipped Pet gear; identify the contributing item/Pet and the affected output where practical.
- **Effective result:** Keep the standard per-action/per-hour/timing information and make the final effective values consistent with the listed active bonuses.
- **Applicability guardrail:** Do not present owned/equipped bonuses as active when they do not apply to the current Skill, subset, Activity, Region, encounter, or reward type. Display and gameplay calculations must use the same authoritative applicability/effect pipeline.
- **Usability expectation:** Keep the primary idle progress readable; the detailed bonus breakdown may use a concise expandable/details treatment on phone screens.
- **Implementation timing:** Batch after Setetchie declares the owner test complete and coordinate with equipment/Pet effect reconciliation.
- **Code/content change made during testing:** No.

### V44-OWNER-040 — Dedicated pending Requests section

- **Status:** `QUEUED`; exact request-type coverage should be reconciled with the social/trading design.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Required section:** Community includes a dedicated `Requests` section that clearly separates or labels pending incoming requests and the player's pending outgoing requests.
- **Pending lifecycle:** A request appears only while unresolved. It is removed from the pending Requests section immediately when either side accepts or rejects it, and that state persists across reloads/devices as supported.
- **Actions/status:** Incoming requests expose the actions available to the recipient; outgoing requests show their pending direction/status without presenting recipient-only controls.
- **History/notification guardrail:** Removing a resolved item from the pending list does not require erasing any separate durable notification/audit/history record if the authoritative social/trading design retains one.
- **Implementation timing:** Batch after Setetchie declares the owner test complete; audit whether the section covers Friend Requests, Trade Requests, or all supported request types rather than guessing from the current dummy fixture.
- **Code/content change made during testing:** No.

### V44-OWNER-041 — Expandable Friends list

- **Status:** `QUEUED`.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Default presentation:** Friends appear in a compact, vertically scannable list rather than displaying every action/detail for every friend at once.
- **Expansion behavior:** Tapping a friend expands that friend entry to show the applicable details and actions. Tapping the expanded entry again, an explicit collapse control, or another friend may collapse it according to the final interaction pattern.
- **Action scope:** Expanded actions use the reconciled Community design (for example profile/Showcase, trade eligibility/start, remove/block/privacy-appropriate actions) rather than inventing options from the QA fixture.
- **Mobile/accessibility expectation:** Expanded state is visually and programmatically clear; controls are touch-friendly; expansion does not cause unintended horizontal overflow or lose the user's list position.
- **Implementation timing:** Batch after Setetchie declares the owner test complete and reconcile the final friend-action roster.
- **Code/content change made during testing:** No.

### V44-OWNER-042 — Visual Friend Showcase with selected Achievements and Loadout

- **Status:** `QUEUED`; final visual language and selection limits require reconciliation.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Showcase presentation:** Opening a friend's Showcase displays a polished, visually distinctive profile/showcase rather than generic placeholder slots.
- **Displayed content:** Feature the Achievements that the friend selected for display and the Loadout that the friend selected to showcase, with readable item/equipment presentation and relevant public-facing context.
- **Ownership/control:** The profile owner chooses and edits their showcased Achievements and showcased Loadout. Viewers inspect the published selection and cannot alter it.
- **Privacy/state guardrail:** Display only information permitted by the authoritative privacy/friend rules, and show sensible empty/partial states when a friend has not selected every Showcase element.
- **Implementation timing:** Batch after Setetchie declares the owner test complete; reconcile Achievement selection count, Loadout details exposed, visual theme, and editing flow with the earlier Showcase design.
- **Code/visual/content change made during testing:** No.

### V44-OWNER-043 — Two-sided Trade Offer card selection

- **Status:** `QUEUED`; exact authorization/trade-eligibility rules require reconciliation with `docs/TRADING_SYSTEM.md`.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Offer builder:** Sending a Trade Offer presents both the player's cards eligible to give and the friend's cards authorized/eligible to be requested.
- **Selection model:** The offer clearly separates `You give` and `You request` (or equivalent wording), supports selecting multiple eligible cards/copies where allowed, and provides a concise review before sending.
- **Eligibility/authorization:** Only cards/copies permitted by ownership, last-copy protection, locks/equipment/loadout state, expansion ownership, trade restrictions, friend authorization/privacy, and other authoritative trading rules are selectable. Unavailable entries are hidden or visibly disabled with a reason according to the reconciled design.
- **Data/state guardrail:** Friend-authorized availability is a valid shared/trading view, not unrestricted access to the friend's private Bank. Revalidate both sides when sending/accepting so stale availability cannot create an invalid trade.
- **Implementation timing:** Batch after Setetchie declares the owner test complete and reconcile the full Trading System rules.
- **Code/social-state change made during testing:** No.

### V44-OWNER-044 — Incoming and outgoing Trade Requests lifecycle

- **Status:** `QUEUED`; extends `V44-OWNER-040` and requires Trading System reconciliation.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Requests integration:** Trade Offers/Requests appear in the same dedicated Requests experience as Friend Requests, with clear request type and incoming/outgoing direction.
- **Incoming state:** Show the offered/requested cards and only the actions appropriate to the recipient and current trade state, such as Accept, Reject, or Counter where authoritative rules permit them.
- **Outgoing state:** Show the sent terms and a clear status such as `Awaiting friend's response`; expose only sender-appropriate actions (for example cancellation/withdrawal if the reconciled rules allow it).
- **Lifecycle:** Update both sides after accept, reject, counter, withdrawal, expiration, or invalidation. Resolved offers leave the pending list while any required notification/history record remains separately available.
- **State/eligibility guardrail:** Persist request state and revalidate card availability/eligibility at every actionable transition; do not present actions that no longer apply.
- **Implementation timing:** Batch after Setetchie declares the owner test complete and reconcile exact buttons, counter states, expiry, cancellation, and history behavior with `docs/TRADING_SYSTEM.md`.
- **Code/trade-state change made during testing:** No.

### V44-OWNER-045 — Restore accessible Forge menu

- **Status:** `QUEUED BUG`.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Observed behavior:** The Forge menu/entry point is not present in the current accessible navigation.
- **Required behavior:** Provide a clearly labeled Forge destination reachable through the reconciled primary/common navigation structure and meaningful Back/history behavior.
- **Feature guardrail:** Restoring navigation must expose the existing accepted Forge functions and applicable eligibility/progression/currency gates; it must not silently bypass gating or substitute the QA currency controls for normal play.
- **Reconciliation note:** Place Forge consistently with `V44-OWNER-003` common Home shortcuts and the final navigation roster after the owner test; do not remove another accepted destination merely to fit it.
- **Implementation timing:** Batch after Setetchie declares the owner test complete.
- **Code change made during testing:** No.

### V44-OWNER-046 — Special Track notification deep-links to Huntsmanship

- **Status:** `QUEUED`.
- **Source:** Setetchie owner testing, 2026-08-19.
- **Notification content:** `Special Track Discovered` identifies the relevant discovered Special Track/creature with enough context to understand the event.
- **Tap/deep-link behavior:** Tapping the in-game notification, or the corresponding push notification when enabled, opens the relevant Huntsmanship Activity/detail state where the player can inspect or continue the appropriate next step.
- **State guardrail:** Deep-linking reflects the current persisted discovery/progression state, remains valid after app launch/resume, and falls back to the Huntsmanship overview with a clear message if the exact target is no longer actionable.
- **Inbox behavior:** The event remains represented in the in-game notification inbox according to read/history rules; push supplements the in-game record.
- **Implementation timing:** Batch after Setetchie declares the owner test complete and coordinate with Huntsmanship/notification state design.
- **Code/notification change made during testing:** No.
