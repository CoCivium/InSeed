#!/usr/bin/env python3
"""InSeed publication guard: no unverified payment destination, personal
webmail address or credential literal anywhere in the served source tree.

Read-only static check. Passing proves only that the checked-out source has
none of these patterns; it does not prove hosting state, wallet ownership,
mailbox control, or that git history is clean (it is not: removal from the
tip does not unpublish earlier commits).

A payment destination may be published only after it is listed in
payment-destinations.verified.json with a proof_uri to a signed-ownership
proof and an approver_ref. No such file exists today.
"""
import json
import re
import subprocess
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ALLOW = ROOT / "payment-destinations.verified.json"

RE_BTC = re.compile(r"\b(?:bc|tb)1[0-9a-zA-Z]{20,90}\b|\b[13][1-9A-HJ-NP-Za-km-z]{25,34}\b")
RE_ETH = re.compile(r"\b0x[0-9a-fA-F]{40}\b")
WEBMAIL = r"(?:gmail|googlemail|outlook|hotmail|live|yahoo|icloud|aol|gmx|proton(?:mail)?)\.(?:com|me|net)"
RE_WEBMAIL = re.compile(r"\b[A-Za-z0-9._%+-]+@" + WEBMAIL + r"\b", re.I)
RE_CRED = re.compile(r"""(?ix)\$?[A-Za-z_]*(?:password|passwd|secret|api[_-]?key|apppassword)[A-Za-z_]*
                         \s*[:=]\s*["'][^"'\n$]{8,}["']""")
RE_TOKEN = re.compile(r"\b(?:ghp_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,}|AKIA[0-9A-Z]{16}|sk-[A-Za-z0-9]{32,})\b")
# base58 hits inside long hex/base64 runs are not addresses
BTC58_FALSE = re.compile(r"[A-Za-z0-9+/=]{60,}")


def tracked_files():
    try:
        out = subprocess.run(["git", "-C", str(ROOT), "ls-files", "-z"], capture_output=True, check=True).stdout
        names = [n for n in out.decode().split("\0") if n]
    except Exception:
        names = [str(p.relative_to(ROOT)) for p in ROOT.rglob("*") if p.is_file() and ".git" not in p.parts]
    for n in names:
        p = ROOT / n
        if not p.is_file() or p.stat().st_size > 2_000_000:
            continue
        data = p.read_bytes()
        if b"\0" in data[:8000]:
            continue
        yield n, data.decode("utf-8", "replace")


def allowed():
    if not ALLOW.exists():
        return set()
    rows = json.loads(ALLOW.read_text(encoding="utf-8"))
    ok = set()
    for r in rows:
        if r.get("address") and r.get("proof_uri") and r.get("approver_ref"):
            ok.add(r["address"])
    return ok


def scan(name, text, allow=frozenset()):
    hits = []
    for m in RE_ETH.finditer(text):
        if m.group(0) not in allow:
            hits.append((name, "eth_address"))
    for m in RE_BTC.finditer(text):
        a = m.group(0)
        if a in allow:
            continue
        if a[0] in "13":
            ctx = text[max(0, m.start() - 30): m.end() + 30]
            if BTC58_FALSE.search(ctx):
                continue
        hits.append((name, "btc_address"))
    if RE_WEBMAIL.search(text):
        hits.append((name, "personal_webmail"))
    if RE_CRED.search(text):
        hits.append((name, "credential_literal"))
    if RE_TOKEN.search(text):
        hits.append((name, "token_prefix"))
    return hits


class NoUnverifiedPublicationTests(unittest.TestCase):
    def test_tree_has_no_unverified_payment_webmail_or_credential(self):
        allow = allowed()
        hits = [h for n, t in tracked_files() for h in scan(n, t, allow)]
        # report file and class only, never the value
        self.assertEqual(hits, [], "unverified publication hazards: %r" % sorted(set(hits)))

    def test_allowlist_requires_proof_and_approver(self):
        if ALLOW.exists():
            for r in json.loads(ALLOW.read_text(encoding="utf-8")):
                self.assertTrue(r.get("proof_uri") and r.get("approver_ref"), "allowlist row lacks proof")

    # Negative controls: synthetic shapes assembled at runtime, so this served file
    # neither holds nor reconstructs any real payment destination or address.
    def test_negative_controls_trip(self):
        eth = "0x" + "ab" * 20  # synthetic shape, nobody's destination
        btc = "bc1" + "q" * 39  # synthetic shape
        mail = "someone_fixture_w09" + "@" + "gmail.com"
        cred = "$AppPassword = " + '"' + "abcd" + "efgh" + "ijkl" + "mnop" + '"'
        tok = "ghp_" + "FAKE0" * 8
        for s, cls in [(eth, "eth_address"), (btc, "btc_address"), (mail, "personal_webmail"),
                       (cred, "credential_literal"), (tok, "token_prefix")]:
            self.assertIn(("x", cls), scan("x", s), cls)

    def test_controls_that_must_not_trip(self):
        benign = [
            "[withheld: no verified payment destination]",
            "$AppPassword = $env:INSEED_SMTP_APP_PASSWORD",
            "noreply@anthropic.com coevo@cospeedo.local x@example.com",
            "sha256 " + "a" * 64,
        ]
        for s in benign:
            self.assertEqual(scan("x", s), [], s)

    def test_allowlisted_address_passes_only_with_proof(self):
        eth = "0x" + "ab" * 20  # synthetic shape, nobody's destination
        self.assertEqual(scan("x", eth, {eth}), [])
        self.assertNotEqual(scan("x", eth, set()), [])


if __name__ == "__main__":
    unittest.main()
