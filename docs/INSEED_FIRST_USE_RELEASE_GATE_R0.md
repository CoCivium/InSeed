# InSeed human-first landing candidate R0

**Status:** REVIEW BRANCH ONLY. NOT LIVE, NOT CONTRACTUAL, NOT APPROVED FOR DEPLOYMENT.

## Observed current boundary (November 17, 2026, one HTTPS test route)
- `https://inseed.com/`: HTTP 200, page body ~1.7 KB. Mainline matches the source; it contains hidden AI-facing copy and a click handler that says a request was logged without demonstrating an effect.
- `https://www.inseed.com/`: redirects to the apex with HTTP 200.
- These individual observations do not prove traffic, usability or independent service delivery.

## Changes in candidate
- Replace opaque ritual/AI-facing copy with a human-first description of possible governance, process and evidence-led work.
- State the commercial/open-commons boundary from [the existing CoCommons/InSeed policy](https://github.com/CoCivium/CoCivium/blob/main/docs/Governance/COCOMMONS_INSEED_DUAL_LANE_R0_20261115.md).
- No forms, scripts, hidden instructions, analytics, autoplay, credentials, paid claims or customer claims.
- A single optional mailto using a previously published contact address. **Inbox ownership, delivery and response remain unverified.**
- Standalone standard-library source regression tests; a passing run is not independent UX acceptance.

## Release gates
1. **Owner and authority:** identify actual hosting/DNS and legal brand/contracting approver. GitHub write access alone does not prove a release decision.
2. **Privacy and rights:** approve every public claim, contact address, links, imagery, licenses, redirects, retention and privacy statement.
3. **Service accuracy:** confirm what InSeed can currently offer, with separate terms and qualified claims; otherwise keep prospective language.
4. **Accessible UX:** test keyboard, high contrast, screen reader, mobile, reduced motion and an unfamiliar visitor's task. Static markup tests alone are insufficient.
5. **Change control:** human review, signed/elected deploy actor, documented rollback pointer, exact branch SHA and receipt.
6. **External verification:** after authorized deployment, collect requested URL + HTTP/TLS response log + screenshots (desktop/mobile) + content hash. Record corrections and link health.
7. **No implied CoCivium ownership:** commercial contracts, data and payments must remain separately authorized; no shared private stack exposure.

**CoGuardian election:** `HOLD_PUBLIC_RELEASE`. No merge, CNAME, DNS, hosting, email send or actual site update by this draft.
**CoNod:** One safe proof is a passing branch CI receipt.
**CoVault:** Keep master and existing source history; no drain or deletion.
