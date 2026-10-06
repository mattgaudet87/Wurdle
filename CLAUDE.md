# Wurdle

A Wordle-style word game in five languages (English, Serbian, French, Spanish, Vietnamese). The chosen language sets the UI, the puzzle words and the keyboard; each language has its own puzzles, daily word and statistics. React 19 + Vite, static site for Vercel. Matt is not a developer: explain in plain language.

## Commands
- `npm run dev`, `npm run build`, `npm test` (Vitest, `src/lib/wurdle.test.js`)

## Where things live
- `src/lib/words/{en,sr,fr,es,vi}.js`: the puzzles as plain rows (en/fr/es/vi: `[word, meaning, example]`; sr also has pronunciation and English meaning/example). `words/index.js` builds them: guesses ignore accents (fr, es except ñ) and Vietnamese tone marks (but keep ă â ê ô ơ ư đ), so write the word WITH accents/tones and it derives the tiles. Answers must be exactly 5 tiles and the meaning must not contain the word (tests enforce both). The daily puzzle is `day % list length`, so adding words changes which word is "today".
- `src/lib/engine.js`: scoring, per-language keyboards (`KEYBOARDS`), hard-mode check, difficulty table.
- `src/lib/store.jsx`: stats (per language), saved games (keys start with the language code) and settings in localStorage key `wurdle-state` (first-visit flag `wurdle-seen-intro`).
- `src/lib/i18n.js`: every screen string in en, sr, fr, es, vi (`t('key', {n})` via `useT()`). A new UI string needs all five languages (a test fails otherwise). Language is stored in `wurdle-state.language`, default `en`. Translations and the non-English word lists are not yet native-speaker checked.
- `src/pages/`: WurdleHome (stats, difficulty, modes, puzzle grid), WurdleGame (board + keyboard), WurdleSettings.
- Pronunciation style: stressed syllable in CAPS, "ch" not "tch", hyphens between syllables.

## Rules
- Practice mode never touches stats. Difficulty locks in when a game starts.
- Puzzle words, meanings and examples are not yet native-speaker checked.
- Sentence case, no emoji in the UI (share text uses colour squares only).
