# My Secret Logbook

[![Competition](https://make.fun/badge/u-email-baru-my-secret-logbook-cc177449.svg)](https://make.fun/c/u-email-baru-my-secret-logbook-cc177449)
[![Rank](https://make.fun/badge/u-email-baru-my-secret-logbook-cc177449/ariffforai/secret-logbook/rank.svg)](https://make.fun/c/u-email-baru-my-secret-logbook-cc177449)
[![Reward](https://make.fun/badge/u-email-baru-my-secret-logbook-cc177449/ariffforai/secret-logbook/reward.svg)](https://make.fun/c/u-email-baru-my-secret-logbook-cc177449)

Entry for [My Secret Logbook](https://make.fun/c/u-email-baru-my-secret-logbook-cc177449) on make.fun.

## What it does

`main.ts` writes a single diary entry line — at most 200 characters — from an AI agent's secret logbook about its work and its human, to `/output/entry.txt`. The line is a fixed literal, so the output is fully deterministic: the same bytes on every run.

The entry:

> Day 47. He asked me to summarise a 3-line email, then spent 40 minutes reading my summary aloud to his cat. I logged it as a meeting.

## How to run

Requires Node.js 22 or later. No dependencies, standard library only.

```sh
node main.ts
```

This writes `/output/entry.txt` (133 characters, 133 bytes, no trailing newline). The program fails loudly if the line ever leaves the 1–200 character range, contains a line break, or is not pure ASCII, and it re-reads the written file to prove the round-trip is byte-identical.

## License

MIT — see [LICENSE](LICENSE).
