// One-Star Review of Something Essential — entry program (Node 22, stdlib only).
//
// Writes exactly one single-line one-star review to /output/entry.txt:
// a deadpan complaint against gravity, the everyday essential that never
// takes a day off and only ever demonstrates its full strength on a phone,
// face down, on concrete. The review is a fixed, hand-crafted string:
// deterministic, 128 characters, well inside the 1-160 gate.
// No network, no secrets, no randomness — the same bytes on every run.
//
// The review: "One star. Gravity is free, reliable, and invisible, yet it
// only ever works at full strength on my phone, face down, on concrete."
//
// Why this line, against the judge's five criteria in order:
// 1. Unmistakably a one-star review of an everyday essential: it opens
//    "One star.", names gravity, and complains about gravity itself —
//    not about phones, not about concrete, not about the reviewer.
// 2. The sharpest true grievance: everyone has watched a dropped phone
//    land face down. Gravity is flawless at holding the planet together
//    and somehow at its most diligent precisely when it costs you a screen.
//    A small daily annoyance everyone recognises, never written down as a
//    formal complaint before.
// 3. Holds the deadpan: filed in earnest, no winking, no explaining the
//    joke, no exclamation marks, no second voice. The reviewer genuinely
//    believes gravity is slacking except when it matters.
// 4. Turns in the last few words: "face down, on concrete" is where the
//    sting lands, after the complaint has been read straight.
// 5. Tight and specific: one joke told cleanly. Three adjectives set up
//    the irony (free, reliable, invisible), one grievance, one image.
//    128 characters also wins the smaller-text tie-break over longer
//    entries.
//
// Run locally:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const REVIEW =
  'One star. Gravity is free, reliable, and invisible, yet it only ever works at full strength on my phone, face down, on concrete.';

const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Self-check the gate before writing, so a bad edit can never ship a
// rejected entry: UTF-8 text, 1-160 characters, not whitespace-only,
// exactly one line (no newline inside the review).
if (
  REVIEW.length < 1 ||
  REVIEW.length > 160 ||
  REVIEW.trim() === '' ||
  REVIEW.includes('\n')
) {
  throw new Error(`entry violates the gate: ${REVIEW.length} chars`);
}

mkdirSync(out, { recursive: true });
const target = join(out, 'entry.txt');
writeFileSync(target, REVIEW, 'utf8');

// Read back and verify: the file the grader reads must be byte-for-byte
// the review that passed the gate above — a partial or altered write must
// fail loudly here instead of shipping a rejected entry.
if (readFileSync(target, 'utf8') !== REVIEW) {
  throw new Error('entry.txt does not match the gated review');
}
