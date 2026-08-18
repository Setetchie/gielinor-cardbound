# Cardbound Decision Ledger

Canonical reconciliation index for Cardbound product and architecture decisions. Detailed source documents retain the decision content; this ledger records authority and conflicts.

**Owner:** Setetchie

**Last reconciled:** 2026-08-18

**Coverage:** Governance and the known conflicts below only. The roughly 300 recovered historical decisions have **not** all been audited.

## Precedence

1. Setetchie's latest explicit instruction for the current task.
2. Latest explicitly accepted `CURRENT` ledger/current review decision.
3. `docs/DESIGN_PROPOSAL_BOARD.md`.
4. Current specialized system document, such as `docs/TRADING_SYSTEM.md`.
5. `docs/ARCHITECTURE_DECISIONS.md`, `docs/WORLD_BIBLE.md`, and supporting documentation.
6. Historical handoffs, extractions, chats, and notes.
7. Code, tests, and `README.md` as implementation evidence, not product authority.

Newer explicitly accepted decisions override conflicting older text. If this ordering cannot resolve a conflict, add an `OPEN` entry and ask Setetchie.

## Statuses

| Status | Meaning | Rule |
|---|---|---|
| `CURRENT` | Accepted and authoritative | May implement within approved scope |
| `SUPERSEDED` | Replaced historical decision | Preserve and link; do not implement |
| `OPEN` | Unresolved/conflicting | Ask Setetchie; do not choose |
| `BALANCE` | Direction exists; tuning is undecided | Do not invent final values |
| `FUTURE` | Intentionally deferred | Do not implement without approval |
| `REJECTED` | Explicitly declined | Do not implement unless reopened |

## Required entry fields

Every durable entry must include: Decision ID; system/category; decision; status; authoritative source; supersedes/superseded by; implementation status/stage where applicable; and notes/open questions. Retain superseded/rejected entries and update the ledger when a decision changes.

## Governance and engineering state

| ID | System/category | Decision | Status | Authoritative source | Supersession | Implementation/status | Notes/open questions |
|---|---|---|---|---|---|---|---|
| GOV-001 | Governance | Repository decision documents outrank chat memory; this ledger controls reconciliation using the precedence above. | `CURRENT` | Setetchie's 2026-08-18 instruction; `AGENTS.md` | Supersedes ad hoc chat reliance | Documented | Detailed sources retain content authority at their tier. |
| GOV-002 | Testing | Preserve accepted regressions; never weaken tests merely to obtain green. | `CURRENT` | `docs/V44_REVIEW_DECISIONS_AND_STAGE_BOARD.md`; `docs/v43-first-test-pass-baseline.md` | None | Applies to corrections | Stale assertions change only for accepted behavior with equivalent coverage. |
| OPS-001 | PR state | PR #5 on `agent/v44-ux-test-pass` remains intentionally unmerged; merge requires Setetchie's explicit approval. | `CURRENT` | v44 review board; Setetchie's instruction | None | Current stop | Documentation work does not authorize promotion. |
| OPS-002 | Validation | Diagnose/patch, run a complete 1× gate, fix and restart if red, and run 50× only after fully green 1×. | `CURRENT` | v44 review board, Testing process/current action state | Supersedes run #74 workflow | Not satisfied | Any later code change resets the gate. |
| OPS-003 | Validation state | Run #74/ID `32073559950`: five named shards failed and `v43-structure` was cancelled; no corrective green 1× is recorded. | `CURRENT` | v44 review board; `docs/CARDBOUND_NEW_CHAT_HANDOFF_2026-08-18.md` | None | Failure remediation not started here | Failed: `prototype-core`, `v44-ux`, `greenwake-progression`, `greenwake-terminology`, `prototype-ui`. |

## Reconciled product entries

| ID | System/category | Decision | Status | Authoritative source | Supersession | Implementation/status | Notes/open questions |
|---|---|---|---|---|---|---|---|
| COMBAT-001 | Skills/Combat | Melee, Ranged, and Magic are separate permanent Skills or player-selected family/subset navigation. | `SUPERSEDED` | Historical prototype/`README.md`; older architecture wording | Superseded by `COMBAT-002` | Legacy internals only | Do not restore the split from old code/prose. |
| COMBAT-002 | Skills/Combat | Combat is one broad category; player selects an enemy/encounter and equipped weapon/loadout determines style. | `CURRENT` | `docs/DESIGN_PROPOSAL_BOARD.md` A1; v44 review board | Supersedes `COMBAT-001` | Accepted target/test behavior | Styles remain combat concepts, not separate permanent paths. |
| EQUIP-001 | Equipment | Gloves are an equipment/utility slot. | `SUPERSEDED` | `docs/ARCHITECTURE_DECISIONS.md`, Utility slots | Superseded by `EQUIP-002` | Historical only | Old glove references are non-authoritative. |
| EQUIP-002 | Equipment | Slots: Head, Body, Legs, Main Hand, Off Hand, Boots, Jewelry, Cape/Back; no Gloves. | `CURRENT` | Design board C2; v44 review board §4 | Supersedes `EQUIP-001` | Accepted v44 structure | Two-handed Main Hand may disable Off Hand. |
| MON-001 | Monetization/idle | Paid convenience may add offline accumulation capacity, never superior equal-time reward/progression rates or direct XP/hr, Pack Points/hr, speed, odds, or power. | `CURRENT` | Architecture idle guardrails; v44 monetization principle | Supersedes/rejects older paid-rate proposals | Product guardrail | Exact packaging is `MON-002`. |
| MON-002 | Monetization/idle | Exact idle windows, extensions, limits, and pricing remain tuning work. | `BALANCE` | `docs/ARCHITECTURE_DECISIONS.md` | None | Not finalized | Must obey `MON-001`. |
| TERM-001 | Terminology | Vault, Bindery, and rarity-specific Essence Fragments are working/historical UI terms. | `SUPERSEDED` | `docs/WORLD_BIBLE.md` §§11–12 | Superseded by `TERM-002` | Historical/world context | Lowercase “vault” may remain visual flavor. |
| TERM-002 | Terminology/economy | Current UI terms: Bank, Forge, universal normal Fragments, Prismatic Essence, and Star Fragments. | `CURRENT` | Design board E2/F1–F4; v44 review board §5 | Supersedes `TERM-001` | Accepted v44 terminology | Exact costs are balance work. |
| PET-001 | Pets/Companions | Final XP, milestones, duplicate conversion, Codex treatment, equipment requirements, pack ownership behavior, and architecture require explicit reconciliation. | `OPEN` | Known continuity conflict; partial v43/v44 coverage | None | QA fixtures exist; final design incomplete | Do not promote QA-only names/rates/values. |
| PET-002 | Pets/DLC | Exact Pet XP curves, milestones, drop rates, DLC price, and rewards are not final. | `BALANCE` | v43 navigation scope/interface coverage | None | Provisional QA only | Does not resolve `PET-001`. |

## Audit queue

This seed is not complete reconciliation. Before changing an unaudited system: inventory relevant accepted-looking statements; create one entry per durable decision/conflict; link supersession chains; return unresolved choices to Setetchie. Priority: full Pet/Companion audit, then systematic review of the remaining recovered decisions. Some historical proposal dates/provenance are still missing.

## Detailed entry template

### [Decision ID] Title

- **System/category:**
- **Decision:**
- **Status:** `CURRENT` | `SUPERSEDED` | `OPEN` | `BALANCE` | `FUTURE` | `REJECTED`
- **Owner/date:** Setetchie / YYYY-MM-DD or Unknown
- **Authoritative source:**
- **Supersedes / superseded by:**
- **Implementation status/stage and evidence:**
- **Validation gate:**
- **Notes/open questions:**

## Handoff checkpoint

- Repository/branch/PR/latest commit
- Completed work/files and exact stop
- Complete 1× gate command/result/evidence
- 50× status (blocked until green 1× unless already authorized)
- Open decision IDs/blockers
- Prohibitions: do not merge PR #5; do not run 50× before green 1×; do not infer unresolved decisions
- One concrete next action
