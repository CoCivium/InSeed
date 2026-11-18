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


## Bounded publication-writer inventory (November 18, 2026)

**Purpose:** Review the *source-side ways an InSeed homepage could be changed* before approving any public release. Source discovery is not a complete inventory of external credentials, local processes, hosting systems, administrators or third-party builders.

### Exact observed source scope

- The pinned pre-repair branch tree `21895506da6d7932b3063fd47763033736ebfbae` contained **286 tracked blobs**: **4** GitHub Actions workflow sources and **19** tracked PowerShell sources. The GitHub Git-tree API reported `truncated=false`.
- The public `main` at the preflight observation was `1d0964637c68b49ef4274c5e48d034e148f1897a`. Neither branch contents nor CI results prove live Pages release.
- Two legacy scheduled repository-writer workflows, `autoevo.yml` (former blob `3e73d1886504ab3f4c37e2294ee1fd62d0e45953`) and `coevo-forever.yml` (former blob `16fde065c20941d9fd16a7b33b0cc2175593a82f`), were already rewritten into **manual, read-only, fail-closed source inspections on this PR branch**. Current mainline remains separately unmodified.
- Four additional locally invocable publisher scripts were detected by reading the exact source and then by **failing GitHub Actions tests**:
  - `CoMassive-v3.ps1`, former blob `162cd5406d97416c630c134ea30d240ffc55b80e`: source contains direct site edit, Git publication, Pages deployment and creation of a **public snippet from a recent local screenshot**. **Privacy/publication risk; no executed effect verified.**
  - `CoMassive.ps1`, former blob `f9d150d94d9441da667d971d2f27a8b4228a3eae`: source contains bulk site edits, Git publication and a public snippet command. **No execution verified.**
  - `CoWatcher-filtered.ps1`, former blob `a6bf6a013d0677ced9127211e099caa6c7fa08db`: source contains a local filesystem-change event handler with Git publication. **No installed watcher or execution verified.**
  - `auto-turns-waves.ps1`, former blob `54930be577ba7925c20db0aab21b5d2a459a24ab`: source contains an unbounded loop and a conditional Git publication. **No active loop or execution verified.**
- These four files are preserved by their original Git history and have **fail-closed review stubs on this draft branch only**. They cannot prove that an older local copy or remotely hosted script has stopped running. The other tracked PowerShell files have no matching direct publish patterns under this bounded static check; absence of a matching pattern is not comprehensive safety.
- Existing `.github/workflows/ci.yml`, former blob `f4be0fa597ccb5f8db2edea131a4c0fcbd820446`, printed ungrounded live-authority language and had misleading URL-check logic. The candidate retains its job identity but reduces it to **read-only source identity**, no external service-availability claim.
- The existing `inseed-first-use-r0.yml` PR gate now checks all workflow paths, all tracked `.ps1` changes and both domain-source CNAME files. Added tests deny direct workflow publishing, direct local-script pushes/public snippets and silent source-domain divergence. A passing review-branch run does **not** grant publication permission.

### Separate publication and authority paths still HELD

1. **Manual or automated Git writes:** branch permissions, administrators, deployed local clones, GitHub tokens, and branch-protection/ruleset enforcement remain to be independently inspected. A direct branch-protection API request returned **403** to the current integration.
2. **Actual Pages site source and owner:** the repository contains root `CNAME` and `board/CNAME`, both `inseed.com`, but the Pages settings endpoint was **not accessible** through the authorized GitHub connector. DNS, HTTPS serving, action artifacts, and alternate hosting/CDN must be verified separately.
3. **External mirrors / side-door writers:** scripts outside this repository, local scheduled tasks, browser editor sessions, hosting dashboards, third-party credentials, and existing running processes were **not inventoried**. No blanket assertion that all writers are disabled.
4. **Public safety:** do not execute former screenshot/snippet publishers or expose private images. If any actual public publishing event is alleged, require external URL, response log, capture/provenance and appropriate privacy triage before calling it delivered or removed.
5. **CoGuardian release:** only an elected actor with scoped rights, exact approved source SHA, private/public content review, rollback pointer, recipient/domain identity and independently verifiable post-release screenshot/log may promote the candidate. General CoGo assent and passing CI are not a release receipt.

**CoVault:** `KEEP_MASTER | DRAIN=HOLD`. **CoNod:** one source audit + regression + receipt, not another scheduler. **CoOrb:** present `DRAFT_SOURCE_GUARD` distinctly from `LIVE_EXTERNAL_VERIFIED`.

`SOURCE_TREE_COVERAGE_286_BLOBS | KNOWN_REVIEW_BRANCH_WRITERS_QUARANTINED | EXTERNAL_WRITERS_UNKNOWN | SOURCE_GUARD_NE_LIVE_DISABLE | MAIN_UNCHANGED | RELEASE_HOLD`
