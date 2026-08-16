# Cardbound Trading System

**Status: Accepted design rules / source-of-truth companion to `DESIGN_PROPOSAL_BOARD.md`.**

This document consolidates the trading rules recovered from the current project discussion and the accepted constraints restated by the product owner. It exists so the trading economy does not remain only in chat history. Where this document is more specific than older prototype assumptions, use this document for future trading/community implementation planning.

## Core purpose

Trading is a collection-completion and duplicate-utility system, not an unrestricted secondary market where every Binding can circulate forever.

The system should support friends/community collection comparison and deliberate exchange of eligible duplicate equipment/item cards while protecting progression, rare variants, activity unlocks, and the game economy.

## 1. Trade eligibility

### Tradeable category — LOCKED / ACCEPTED

Only eligible **item/equipment cards** are intended to be tradeable.

This includes equipment/gear and other item-type cards that are explicitly marked tradeable by content data. Tradeability must be explicit metadata rather than inferred only from rarity or name.

### Untradeable categories — LOCKED / ACCEPTED

The following must not be tradeable:

- **Perfect/Foil cards — never tradeable**, regardless of the underlying card's normal tradeability.
- **Activity Bindings / activity cards — not tradeable.** Activity/progression access must be earned through the intended gameplay path rather than transferred from another player.
- Ascendant/progression-specific cards remain untradeable unless a later accepted design explicitly creates an exception.

### Creature/monster Bindings — CURRENT DIRECTION / REQUIRES FINAL CONFIRMATION

Current direction is to keep creature/monster Bindings out of ordinary player trading and restrict normal trading to item/equipment cards. The product owner specifically raised monsters as a category that may remain untradeable. Treat creature/monster trading as **off by default** unless explicitly approved during the trading/economy review.

Boss, Raid-access, Hunt, Ascendant, or other progression-gating creature Bindings should especially not become casually transferable without a deliberate later exception.

## 2. Trade consumes the offered card — LOCKED / ACCEPTED

Trading does **not** transfer a reusable physical card copy from one player's Bank to another player's Bank.

When a trade completes:

1. the sender's offered tradeable duplicate/card copy is consumed;
2. the recipient permanently unlocks the associated Binding/item/equipment entitlement for their account/Collection;
3. the recipient does **not** receive a new tradeable duplicate that can simply be passed onward again.

Conceptually:

`sender tradeable duplicate → trade → duplicate consumed → recipient Binding/item unlock`

This makes trading an intentional card sink and prevents a single copy from circulating indefinitely through the player base.

The trade confirmation UI must state this behavior clearly before acceptance.

## 3. Duplicate requirement / ownership protection — ACCEPTED DIRECTION

Trading should normally operate on eligible duplicate copies rather than sacrificing the player's only collection unlock. The implementation must distinguish permanent account/Collection ownership from expendable tradeable duplicate inventory.

Bulk Shredding and trading must coexist safely. Bank management should support **Keep-X** rules so players can retain one or more eligible duplicates for future trades instead of accidentally shredding all excess copies.

Perfect/Foil copies must never enter trade selection and should remain separately protected in bulk-management flows.

## 4. Comparable-value trade matching — LOCKED / ACCEPTED DIRECTION

Trades must not allow arbitrary low-value-for-high-value exchanges merely because both cards are technically tradeable.

Offered and requested cards must be sufficiently similar in **rarity and value** according to server-authoritative trade rules.

The final economy pass must define the exact comparison model. Candidate inputs include:

- rarity;
- tier;
- card/item class;
- acquisition difficulty;
- Fragment/shred value;
- progression/Region placement;
- other explicit internal trade-value bands.

The UI should communicate whether a proposed exchange is valid and why a mismatched trade is rejected. Do not rely on free-form player judgment alone for value-equivalence enforcement.

Exact tolerance/bands and whether multi-card bundles can satisfy equivalence remain **OPEN / BALANCE**.

## 5. Community integration — ACCEPTED DIRECTION

Community is the player-facing home for social/trading functionality. Planned capabilities include:

- add/manage friends;
- player/friend profiles;
- view permitted portions of friends' Collections;
- compare Collections;
- identify potential trade matches;
- initiate a trade from a friend/profile/collection context;
- manage incoming, outgoing, completed, rejected, or countered trade offers as appropriate.

Community UI does not override trading eligibility/economy rules in this document.

Collection comparison should be able to surface cases where one player has an eligible tradeable duplicate of an item/equipment Binding another player has not unlocked, while respecting privacy and tradeability rules.

Do not expose another player's complete Bank or exact duplicate quantities by default merely because Collection viewing is allowed. Exact privacy controls remain a later UX/account decision.

## 6. Asynchronous trade direction — ACCEPTED DIRECTION

Prefer asynchronous trade offers rather than requiring both players to be online simultaneously.

A trade can be proposed, reviewed later, accepted/rejected, and potentially countered. Final execution must revalidate ownership, tradeability, Foil/Perfect status, and value equivalence at acceptance time.

## 7. Server-authoritative execution — REQUIRED BEFORE LIVE TRADING

Trading cannot rely on client-local state in a production environment.

Before live player trading exists, the backend must provide atomic/server-authoritative validation so that:

- offered copies actually exist;
- cards are still eligible and tradeable;
- no Perfect/Foil card is transferred;
- value/rarity rules are satisfied;
- the sender's copy is consumed exactly once;
- the recipient's Binding/item unlock is granted exactly once;
- duplicate/replay/race-condition exploits cannot duplicate cards or unlocks.

The current local-browser prototype is not sufficient for production trading.

## 8. Relationship to Forge and Shredding

Trading, Shredding, and Forge form complementary duplicate/collection paths:

- **Shred:** convert unwanted duplicates into Fragments.
- **Trade:** consume an eligible item/equipment duplicate to unlock an eligible comparable Binding/item for another player through an exchange.
- **Forge:** spend Fragments for eligible missing-card acquisition under the established random/Star Fragment rules.

These paths should create meaningful choices for duplicate cards rather than one option strictly dominating the others.

## 9. Explicitly open trading questions

Do not silently finalize these without a later economy/trading review:

- final confirmation that all creature/monster Bindings are untradeable, versus narrowly defined exceptions;
- exact rarity/value-equivalence formula and tolerance;
- whether tradeable item/equipment cards must match exact rarity or may trade within defined adjacent/value bands;
- whether multi-card-for-one-card or multi-card bundles are allowed;
- trade limits/cooldowns, if any;
- minimum account/progression requirements for trading;
- anti-abuse/fraud controls beyond atomic validation;
- whether any fees/sinks beyond consumption of the offered card are needed;
- final friend/collection privacy controls;
- exact counteroffer/expiration/history UX.

Until those questions are resolved, preserve the locked rules above: **Perfect/Foil never tradeable; Activities not tradeable; ordinary trading restricted to eligible item/equipment cards; trades consume the offered copy and grant the recipient the associated unlock rather than another circulating tradeable copy; and exchanges must satisfy enforced rarity/value comparability.**
