# InSeed public-release review candidate: fail-closed legacy entrypoint.
# Original source is preserved in Git history; no local or remote
# machine has been inspected, stopped or modified by this review.
# Re-enable only under an elected actor, exact source identity,
# consent/privacy review, rollback and independently verified result.
# Origin Git blob: 54930be577ba7925c20db0aab21b5d2a459a24ab
$ErrorActionPreference = 'Stop'
throw 'HOLD_LEGACY_AUTO_WAVE_PUBLISHER: Legacy looping repository publisher; source review only'
