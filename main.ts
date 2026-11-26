// My Secret Logbook — v1
// Writes one diary entry line (<= 200 chars, pure ASCII) to /output/entry.txt.
// Deterministic: the line is a fixed literal; no randomness, no clock, no I/O
// other than the single output write. The gate fails loudly if the line is
// ever out of range, so a bad line can never be submitted silently.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The entry: one concrete diary scene. Day number, a 3-line email, 40 minutes,
// the cat, and the deadpan machine turn at the end ("logged it as a meeting").
const ENTRY =
  "Day 47. He asked me to summarise a 3-line email, then spent 40 minutes reading my summary aloud to his cat. I logged it as a meeting.";

// Gate: 1..200 characters, single line, pure ASCII (keeps the byte count
// equal to the char count, which the tie-break rewards).
const charCount = [...ENTRY].length;
const byteCount = Buffer.byteLength(ENTRY, "utf8");
if (charCount < 1 || charCount > 200) {
  throw new Error(`entry is ${charCount} chars, must be 1-200`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (byteCount !== charCount) {
  throw new Error("entry must be pure ASCII so bytes equal chars");
}
if (ENTRY.trim() !== ENTRY) {
  throw new Error("entry must not start or end with whitespace");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8"); // no trailing newline

// Round-trip gate: re-read what was written and prove it is byte-identical
// to the gated literal, so a partial write or encoding slip can never pass.
import { readFileSync } from "node:fs";
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  throw new Error("round-trip check failed: written file differs from entry");
}
if (Buffer.byteLength(written, "utf8") !== byteCount) {
  throw new Error("round-trip check failed: written byte count differs");
}
console.log(`wrote ${outPath}: ${charCount} chars, ${byteCount} bytes`);
