# InSeed public-release review candidate: fail-closed legacy entrypoint.
# Original source is preserved in Git history; no local or remote
# machine has been inspected, stopped or modified by this review.
# Re-enable only under an elected actor, exact source identity,
# consent/privacy review, rollback and independently verified result.
# Origin Git blob: f9d150d94d9441da667d971d2f27a8b4228a3eae
$ErrorActionPreference = 'Stop'
throw 'HOLD_LEGACY_PARALLEL_PUBLISHER: Legacy bulk repository and public snippet publication; source review only'
