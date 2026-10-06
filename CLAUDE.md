# Wurdle

A Serbian word game (Wordle style, 5-letter ekavian words). React 19 + Vite, static site for Vercel. Matt is not a developer: explain in plain language.

## Commands
- `npm run dev`, `npm run build`, `npm test` (Vitest, `src/lib/wurdle.test.js`)

## Where things live
- `src/lib/puzzles.js`: every puzzle (`id`, `word`, `pron`, `english`, `hint`, example `sr`/`en`). Answers must be exactly 5 single letters (no lj / nj / dž). Add new puzzles at the end with the next id; the daily puzzle is `day % PUZZLES.length`, so adding puzzles changes which word is "today".
- `src/lib/engine.js`: scoring, keyboard colours, hard-mode check, difficulty table.
- `src/lib/store.jsx`: stats, saved games and settings in localStorage key `wurdle-state` (first-visit flag `wurdle-seen-intro`).
- `src/pages/`: WurdleHome (stats, difficulty, modes, puzzle grid), WurdleGame (board + keyboard), WurdleSettings.
- Pronunciation style: stressed syllable in CAPS, "ch" not "tch", hyphens between syllables.

## Rules
- Practice mode never touches stats. Difficulty locks in when a game starts.
- Puzzle words, pronunciations and examples are not yet native-speaker checked.
- Sentence case, no emoji in the UI (share text uses colour squares only).
