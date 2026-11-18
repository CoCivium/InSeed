# InSeed public-release review candidate: fail-closed legacy entrypoint.
# Original source is preserved in Git history; no local or remote
# machine has been inspected, stopped or modified by this review.
# Re-enable only under an elected actor, exact source identity,
# consent/privacy review, rollback and independently verified result.
# Origin Git blob: a6bf6a013d0677ced9127211e099caa6c7fa08db
$ErrorActionPreference = 'Stop'
throw 'HOLD_LEGACY_FILE_WATCHER_PUBLISHER: Legacy filesystem-change-triggered repository publication; source review only'
