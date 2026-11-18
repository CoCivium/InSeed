#!/usr/bin/env python3
"""InSeed first-use source checks. Pure read-only static verification.

Passing here proves only source properties, never live HTTPS, visitor
comprehension, service readiness, mailbox delivery, or public deployment.
"""
import re
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
HTML = (ROOT / "index.html").read_text(encoding="utf-8-sig")


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.tags = []
        self.ids = []
        self.links = []
        self.heading_text = []
        self.text = []
        self.bad = []
        self.in_h1 = False
        self.attrs = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        self.tags.append(tag)
        self.attrs.append((tag, values))
        if "id" in values:
            self.ids.append(values["id"])
        if tag == "a":
            self.links.append(values.get("href", ""))
        if tag == "h1":
            self.in_h1 = True
        if tag in {"script", "iframe", "form", "object", "embed", "audio", "video"}:
            self.bad.append("unexpected_active_element:" + tag)
        if any(k.lower().startswith("on") for k in values):
            self.bad.append("inline_event_handler")

    def handle_endtag(self, tag):
        if tag == "h1":
            self.in_h1 = False

    def handle_data(self, data):
        self.text.append(data)
        if self.in_h1:
            self.heading_text.append(data)


def page():
    p = Page()
    p.feed(HTML)
    return p


class InSeedFirstUseTests(unittest.TestCase):
    def test_heading_and_semantic_structure(self):
        p = page()
        self.assertEqual(p.tags.count("html"), 1)
        self.assertEqual(p.tags.count("main"), 1)
        self.assertEqual(p.tags.count("h1"), 1)
        self.assertIn("Useful systems. Clear evidence.", " ".join(p.heading_text))
        self.assertIn("lang=\"en\"", HTML)

    def test_navigation_and_skip_destinations_resolve(self):
        p = page()
        self.assertEqual(len(p.ids), len(set(p.ids)), "duplicate HTML id")
        self.assertIn("main", p.ids)
        for link in p.links:
            if link.startswith("#"):
                self.assertIn(link[1:], p.ids, "unresolved local anchor: " + link)
        self.assertIn('class="skip" href="#main"', HTML)
        self.assertIn('aria-label="Main navigation"', HTML)

    def test_no_hidden_directives_or_opaque_join(self):
        p = page()
        self.assertEqual(p.bad, [])
        source = HTML.lower()
        for forbidden in ("cosubliminal", "data-ritual", "co-via", "copingables",
                          "fetch(", "alert(", "localstorage", "sessionstorage",
                          "googletagmanager", "analytics", "we are now alive",
                          "onload=", "onclick="):
            if forbidden == "analytics":
                # Explicitly saying analytics are not used is welcome.
                continue
            self.assertNotIn(forbidden, source, forbidden)
        self.assertNotIn('type="hidden"', source)
        self.assertNotIn('style="display:none"', source)

    def test_public_links_with_consented_email_only(self):
        p = page()
        for href in p.links:
            if href.startswith("#"):
                continue
            if href.startswith("mailto:"):
                self.assertEqual(urlsplit(href).path, "contact@inseed.com")
                continue
            u = urlsplit(href)
            self.assertEqual(u.scheme, "https")
            self.assertEqual(u.netloc, "github.com")
            self.assertTrue(u.path.startswith("/CoCivium/"))
        self.assertEqual(len([x for x in p.links if x.startswith("mailto:")]), 1)

    def test_evidence_and_commercial_separation_disclosed(self):
        t = " ".join(page().text).lower()
        for phrase in ("informational project front door", "not a claim",
                       "commercial service needs its own scope",
                       "actual licenses", "not a completed contract"):
            self.assertIn(phrase, t, phrase)
        self.assertRegex(t, r"not (?:been )?independently verified")
        self.assertIn("COCOMMONS_INSEED_DUAL_LANE_R0_20261115.md", HTML)
        self.assertIn("MasterPlan.md", HTML)

    def test_accessibility_and_responsive_css(self):
        for token in ("name=\"viewport\"", "prefers-reduced-motion",
                      "prefers-color-scheme", ":focus-visible", "max-width:560px",
                      "role=\"note\"", "aria-label=", "min-height:48px"):
            self.assertIn(token, HTML, token)

    def test_no_unverified_badges_or_metric_inflation(self):
        t = " ".join(page().text).lower()
        self.assertNotRegex(t, r"(?i)(\d{3,}%? customers|99\.9% uptime|certified ai|clients served)")
        self.assertIn("not representations of completed customer engagements", t)
        self.assertIn("availability", t)

    def test_no_external_assets_or_data_collection(self):
        p = page()
        self.assertNotIn("img", p.tags)
        self.assertNotIn("form", p.tags)
        self.assertNotIn("script", p.tags)
        self.assertNotIn("@import", HTML.lower())
        self.assertNotIn("<link rel=\"stylesheet\"", HTML.lower())
        self.assertNotIn("https://fonts.", HTML.lower())


    def test_legacy_site_mutators_are_quarantined_without_new_scheduler(self):
        # A reviewed public home must not be silently edited by an old cron.
        # Enforce the same contract for both incumbent legacy workflows.
        for workflow in ("coevo-forever.yml", "autoevo.yml"):
            with self.subTest(workflow=workflow):
                source = (ROOT / ".github" / "workflows" / workflow).read_text(
                    encoding="utf-8-sig"
                )
                self.assertNotIn("schedule:", source)
                self.assertNotIn("cron:", source)
                self.assertIn("workflow_dispatch:", source)
                self.assertIn("permissions:\n  contents: read", source)
                self.assertIn("persist-credentials: false", source)
                self.assertIn("timeout-minutes:", source)
                for forbidden in (
                    "git push", "git commit", "git add",
                    ">> index.html", ">> evo.log", "contents: write",
                ):
                    self.assertNotIn(forbidden, source, forbidden)


    def test_tracked_local_scripts_cannot_publish_without_elected_reviewer(self):
        # Static negative gate. The original source remains in Git history.
        # Passing cannot prove no external host, credential or tool publishes.
        scripts = sorted(ROOT.rglob("*.ps1"))
        self.assertGreaterEqual(len(scripts), 10, "source-script coverage shrank")
        forbidden = (
            r"\bgit\s+push\b",
            r"\bgh\s+pages\s+deploy\b",
            r"\bgh\s+gist\s+create\b",
            r"\b(?:add-content|set-content|out-file)\b[^\n]*\bindex\.html\b",
        )
        for path in scripts:
            with self.subTest(source=path.relative_to(ROOT).as_posix()):
                self.assertFalse(path.is_symlink(), "HOLD_SCRIPT_SYMLINK")
                text = path.read_text(encoding="utf-8-sig")
                for expression in forbidden:
                    self.assertNotRegex(text, expression)

    def test_publication_unsafe_source_patterns_are_not_dead_checks(self):
        candidates = (
            "git push origin main",
            "gh pages deploy . --dotfiles",
            "gh gist create screenshot.png --public",
            'Add-Content "$Root\\index.html" "<!-- unaudited -->"',
        )
        forbidden = (
            r"\bgit\s+push\b",
            r"\bgh\s+pages\s+deploy\b",
            r"\bgh\s+gist\s+create\b",
            r"\b(?:add-content|set-content|out-file)\b[^\n]*\bindex\.html\b",
        )
        for candidate in candidates:
            self.assertTrue(any(re.search(expr, candidate, re.IGNORECASE)
                                for expr in forbidden), candidate)



if __name__ == "__main__":
    unittest.main()
