# Cardbound Decision Ledger

This ledger is the canonical index of Cardbound product and architecture decisions. It does not replace detailed design documents; it tells contributors which decisions are current, which have been superseded, and which remain open.

Last reconciled: 2026-08-18  
Owner: Setetchie

## How to use this ledger

- Add one row for every durable decision or material conflict.
- Use only `Current`, `Superseded`, or `Open`.
- A `Current` row is implementation authority unless Setetchie gives a newer explicit instruction.
- A `Superseded` row must identify its replacement. It remains as history and must not be implemented.
- An `Open` row must state the question and must not be resolved by assumption.
- Link to the detailed source and implementation evidence when available.
- If a source contains mixed current and superseded material, add separate rows rather than assigning one status to the entire document.
- Update this ledger in the same task that accepts, supersedes, or reopens a decision.

## Precedence

When sources conflict:

1. Setetchie's latest explicit instruction for the current task.
2. A `Current` entry in this ledger.
3. An accepted entry in `docs/ARCHITECTURE_DECISIONS.md` not marked `Superseded` here.
4. The newest non-conflicting continuity/handoff record.
5. Code, tests, and `README.md` as implementation evidence.
6. Older chats, extracts, and notes as historical context.

Conflicts that cannot be resolved by this order become `Open` and require Setetchie's decision.

## Status definitions

| Status | Meaning | Implementation rule |
|---|---|---|
| Current | Accepted and authoritative | May be implemented within the approved task scope |
| Superseded | Replaced by a newer accepted decision | Do not implement; follow the linked replacement |
| Open | Unresolved or conflicting | Do not make the product choice; ask Setetchie |

## Current migration and validation decisions

| ID | Status | Decision | Source / evidence | Replaces / notes |
|---|---|---|---|---|
| OPS-001 | Current | PR #5 on `agent/v44-ux-test-pass` is the active unmerged v44 test build. Do not merge it without a separate explicit instruction from Setetchie. | PR #5; migration instruction dated 2026-08-18 | Current stop point |
| OPS-002 | Current | Failed run #74 is the last recorded validation stop. Fix failures, then complete one full 1× validation run. Only a completely green 1× run permits a 50× run. Any failure or later code change resets the gate. | Continuity handoff; migration instruction dated 2026-08-18 | No corrective complete green 1× pass is recorded |
| OPS-003 | Current | Documentation-only Codex migration work may be added to the active branch, but this task must not change app behavior. | Migration instruction dated 2026-08-18 | Applies to creation of `AGENTS.md` and this ledger |
| OPS-004 | Current | Before an incomplete task changes chats/tasks or loses context, refresh a Markdown handoff with repository/branch/PR/commit, completed work, exact stop point, validation evidence, open decisions, prohibitions, and the next action. | Setetchie's continuity request; `AGENTS.md` | Address Setetchie by name and warn when continuity is slipping |
| GOV-001 | Current | This ledger controls decision status; detailed architecture remains in `docs/ARCHITECTURE_DECISIONS.md` unless a ledger entry marks a decision superseded or open. | `AGENTS.md`; this ledger | Prevents old accepted text from silently overriding newer decisions |

## Reconciliation queue

The following known conflicts require explicit ledger entries before related implementation work proceeds.

| ID | Status | Question / conflict | Historical source | Required next step |
|---|---|---|---|---|
| REC-001 | Open | Reconcile all detailed Companion/Pet decisions, including XP, equipment requirements and pack ownership behavior, milestones, duplicate conversion, Codex treatment, and underlying architecture. | Prior decision boards and continuity audit | Inventory each decision and mark it Current, Superseded, or Open |
| REC-002 | Open | Reconcile older separate Melee/Ranged/Magic progression text with the newer broad Combat category where encounter selection and equipped loadout determine style. | Older decisions; current continuity audit | Add separate current and superseded rows with precise source links |
| REC-003 | Open | Reconcile the Gloves utility slot in `docs/ARCHITECTURE_DECISIONS.md` with the newer v44 test-set direction that removes Gloves. | `docs/ARCHITECTURE_DECISIONS.md`; v44 decision record | Confirm final slot model with Setetchie, then mark the losing rule Superseded |

## Decision record template

Copy this section for new detailed entries.

### [ID] Short decision title

- **Status:** Current | Superseded | Open
- **Decision owner:** Setetchie
- **Decision date:** YYYY-MM-DD
- **Decision:** One unambiguous statement.
- **Scope:** Systems, files, stages, or releases affected.
- **Rationale:** Why the decision was accepted or why it remains open.
- **Source:** Link or repository path to the authoritative detailed record.
- **Supersedes:** Prior decision ID(s), or `None`.
- **Superseded by:** Replacement decision ID, or `None`.
- **Implementation evidence:** Commit, PR, test run, artifact, or `Not implemented`.
- **Validation gate:** Required tests and acceptance evidence.
- **Notes / open questions:** Remaining constraints without silently deciding them.

## Handoff checkpoint template

Use this in the current Markdown handoff whenever work pauses:

- **Repository:** `Setetchie/gielinor-cardbound`
- **Branch:** `agent/v44-ux-test-pass`
- **PR:** #5 (must remain unmerged unless separately authorized)
- **Latest commit:** [SHA]
- **Completed:** [work and files]
- **Current stop point:** [exact next step]
- **1× gate:** Not run | Failed | Green — [command/run/evidence]
- **50× gate:** Blocked until complete green 1× | Authorized after green 1× | Result
- **Open decisions/blockers:** [ledger IDs]
- **Do not:** Merge PR #5; run 50× before green 1×; infer an Open decision
- **Next action:** [one concrete action]
