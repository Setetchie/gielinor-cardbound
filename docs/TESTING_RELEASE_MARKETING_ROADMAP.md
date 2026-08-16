# Testing, Release, and Marketing Roadmap

**Status: Accepted planning direction; dates, budgets, platform packaging, and campaign commitments remain open.**

This roadmap defines how the project should progress from internal prototype review through outside testing, mobile-store distribution, launch, and marketing. It does not replace acceptance-gated engineering stages.

## 1. Product-owner UI review — current

- Use the current main/GitHub Pages build for product-owner hands-on UX/UI review.
- Record proposed UI/UX changes before implementation unless an explicit implementation pass is approved.
- Fix true functional regressions separately from subjective design feedback.
- Legacy RuneScape-derived names, icons, art, and terminology are placeholders to be removed through the original-IP conversion, World Bible, and Visual Bible work.

## 2. Friends & Family Alpha

**Target:** after the first approved UI/UX change pass, when the core loop is stable enough that testers are not mostly reporting known prototype problems.

- Begin with approximately 5–10 trusted testers who were not involved in designing the interface.
- Prefer a dedicated test distribution/channel rather than making the main development URL the long-term external-test endpoint.
- Testers should receive minimal instruction so onboarding and discoverability can be evaluated honestly.
- Collect both bugs and structured feedback: confusion points, fun/friction, desired next action, willingness to return, device/browser, and session observations.
- Do not treat Friends & Family feedback as statistically representative retention evidence.

## 3. Original vertical slice / Closed Alpha

**Target:** once the first original region/vertical slice has original or near-final terminology, visual language, progression loop, and representative content.

- Expand to roughly 25–100 invited testers.
- Include a mix of idle/incremental players, TCG/collection players, RuneScape-adjacent players, mobile players, and people without those backgrounds.
- Move toward a controlled test environment with version identification, feedback/reporting, analytics, and the ability to isolate test data from production data.
- Evaluate onboarding completion, return behavior, session cadence, activity choices, pack earning/opening, progression bottlenecks, economy behavior, and failure/confusion points.

## 4. Closed Beta

- Increase tester population only after alpha feedback demonstrates a coherent core loop.
- Use platform-native beta distribution where appropriate (for example TestFlight on Apple platforms and Google Play testing tracks on Android) once native/mobile packaging exists.
- Validate account/save migration, purchases in sandbox/test environments, rewarded-ad behavior, privacy disclosures, analytics, crash reporting, accessibility, performance, device compatibility, and store-policy compliance.
- Avoid large paid acquisition until retention and monetization behavior justify scaling.

## 5. Public beta / soft launch

- Use a limited public release, preregistration/wishlist funnel, or geographically/audience-limited soft launch where appropriate.
- Validate retention, economy, technical reliability, store conversion, monetization fairness, support load, and acquisition cost before a broad launch campaign.
- Treat soft launch as a production validation stage, not merely marketing.

## 6. Full launch

- Launch only after original-IP conversion is complete for shipped content and the game satisfies platform/store requirements.
- Scale creator and paid acquisition based on demonstrated retention and sustainable unit economics rather than assuming launch advertising will create retention.

## External test distribution policy

The public development build and external test builds should eventually be separated.

Near term, a dedicated web test deployment/subdomain or branch-based preview is preferable for Friends & Family so the test cohort can remain on a known build while main development continues. The test build should visibly identify its version/build number.

Once native mobile packaging is ready:

- Apple external testing should use TestFlight rather than distributing development binaries manually.
- Android testing should use Google Play internal/closed/open testing tracks as appropriate.
- Production App Store / Play Store listings should not be used as the first meaningful outside-test mechanism.

Exact hosting provider, CI/CD deployment mechanism, backend environment separation, tester authentication, analytics stack, and feedback tooling remain implementation decisions.

## App-store publication milestones

Store preparation should begin before public launch, but production publication should not happen during the current prototype stage.

### Apple

Before a production iOS/iPadOS App Store submission, plan for:

- Apple Developer Program enrollment and App Store Connect setup;
- final app identity, bundle identifier, signing/certificates/provisioning managed through the selected native build pipeline;
- an iOS-compatible packaged application rather than relying only on the GitHub Pages web build;
- privacy policy and accurate App Privacy disclosures;
- age rating/content declarations;
- store screenshots, description, keywords/category, support URL, and other required metadata;
- review of login/account deletion requirements if accounts are supported;
- review of in-app purchase requirements for digital goods/convenience upgrades;
- rewarded-ad/privacy/consent implementation that satisfies applicable Apple policies and privacy requirements;
- TestFlight internal/external testing before production submission;
- App Review submission and resolution of any review issues.

Apple review requirements can change, so current App Store Review Guidelines and App Store Connect requirements must be rechecked when implementation begins and immediately before submission.

### Android

Before a production Google Play release, plan for:

- Google Play Console account/application setup;
- Android App Bundle/native packaging and signing;
- privacy/Data safety declarations and required policies;
- store listing assets and content rating;
- Play Billing compliance for applicable digital purchases;
- rewarded-ad/privacy/consent compliance;
- internal/closed testing before production rollout;
- staged rollout where useful.

Google Play policies can change and must be rechecked at implementation/submission time.

## Marketing roadmap

### Audience building before launch

Begin public-facing audience development once the final game identity and enough original visual material exist to show the product without relying on RuneScape-derived assets.

Potential material includes original card-frame concepts, equipment/creature reveals, regional art, pack-opening presentation, development clips, progression demonstrations, and beta signups.

### Creator strategy

RuneScape/OSRS-adjacent creators may be a useful seed audience because the progression/collection concept can overlap with their viewers' interests, but the released product and marketing must clearly present an original game rather than an unofficial RuneScape game.

Broaden outreach beyond that audience to idle/incremental, TCG/CCG, collection-game, indie, and mobile creators.

Prefer authentic early-access play and creator fit over rigid sponsored scripts. Start with smaller/mid-sized creators where useful before committing to expensive campaigns.

### Paid advertising

Do not wait for organic traction before doing any marketing, but distinguish audience building from scaled paid acquisition.

- Pre-launch: community building, development content, beta recruitment, store wishlists/preregistration, and creator relationships.
- Alpha/beta: small controlled acquisition experiments may be used for learning.
- Soft launch: measure acquisition cost against retention and monetization.
- Full launch: scale paid advertising only when product data indicates acquired players retain well enough to justify the spend.

### Monetization positioning

If the product continues to follow the accepted monetization architecture, marketing may emphasize the absence of pay-to-win card power, paid rarity odds, and paid-exclusive core activities. Any such claims must accurately match the shipping product.

## Progress-board milestones

1. R2 complete / product-owner test build.
2. Product-owner UI/UX review board.
3. Approved UI/UX implementation pass.
4. Friends & Family Alpha test build (5–10).
5. R3/R4 architecture progression.
6. World Bible + Visual Bible / final game identity work.
7. Original vertical slice.
8. Closed Alpha (approximately 25–100).
9. Native mobile packaging + store-account preparation.
10. TestFlight / Google Play closed testing.
11. Larger Closed Beta.
12. Public beta / soft launch.
13. Full store launch.
14. Scaled creator/paid marketing based on retention evidence.
