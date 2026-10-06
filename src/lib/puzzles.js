// The Wurdle puzzles. Every answer is 5 single letters (no lj / nj / dž digraphs), in ekavian Serbian.
export const PUZZLES = [
  { id: 1, word: 'VOLIM', pron: 'VOH-leem', english: 'I love / I like', hint: 'Two words that mean a lot when texted, "Volim te."', sr: 'Volim te.', en: 'I love you.' },
  { id: 2, word: 'HVALA', pron: 'HVAH-lah', english: 'thank you', hint: 'The polite thing to say after someone helps you.', sr: 'Hvala ti puno.', en: 'Thank you very much.' },
  { id: 3, word: 'DANAS', pron: 'DAH-nahs', english: 'today', hint: 'Not yesterday, not tomorrow.', sr: 'Šta radiš danas?', en: 'What are you doing today?' },
  { id: 4, word: 'SUTRA', pron: 'SOO-trah', english: 'tomorrow', hint: 'The day after today.', sr: 'Vidimo se sutra.', en: 'See you tomorrow.' },
  { id: 5, word: 'ŽIVOT', pron: 'ZHEE-voht', english: 'life', hint: 'What you are living right now.', sr: 'Život je lep.', en: 'Life is beautiful.' },
  { id: 6, word: 'SREĆA', pron: 'SREH-chah', english: 'luck / happiness', hint: 'Wished to someone with "Srećno!"', sr: 'Sreća je u malim stvarima.', en: 'Happiness is in the small things.' },
  { id: 7, word: 'PRIČA', pron: 'PREE-chah', english: 'story / chat', hint: 'Something you tell, or a long conversation.', sr: 'Kakva priča!', en: 'What a story!' },
  { id: 8, word: 'KAFIĆ', pron: 'KAH-feech', english: 'café / bar', hint: 'Where Belgrade spends its afternoons.', sr: 'Vidimo se u kafiću.', en: 'See you at the café.' },
  { id: 9, word: 'VREME', pron: 'VREH-meh', english: 'time / weather', hint: 'One word for both the clock and the forecast.', sr: 'Kakvo je vreme danas?', en: "What's the weather like today?" },
  { id: 10, word: 'MOLIM', pron: 'MOH-leem', english: 'please / pardon', hint: 'Often paired with "te" when you ask for something.', sr: 'Molim te, pomozi mi.', en: 'Please, help me.' },
  { id: 11, word: 'MAJKA', pron: 'MY-kah', english: 'mother', hint: 'The woman who raised you.', sr: 'Volim svoju majku.', en: 'I love my mother.' },
  { id: 12, word: 'DOBRO', pron: 'DOH-broh', english: 'good / well / OK', hint: 'The answer to "Kako si?" when things are fine.', sr: 'Sve je dobro.', en: 'Everything is fine.' },
  { id: 13, word: 'NOĆAS', pron: 'NOH-chahs', english: 'tonight', hint: 'What you ask when you want to know the plan after dark.', sr: 'Šta radiš noćas?', en: 'What are you doing tonight?' },
  { id: 14, word: 'JUTRO', pron: 'YOO-troh', english: 'morning', hint: 'The first part of the day. "Dobro ___!"', sr: 'Dobro jutro!', en: 'Good morning!' },
  { id: 15, word: 'SLIKA', pron: 'SLEE-kah', english: 'picture / photo', hint: 'What you ask for in a text when you want to see something.', sr: 'Pošalji mi sliku.', en: 'Send me a picture.' },
  { id: 16, word: 'MLEKO', pron: 'MLEH-koh', english: 'milk', hint: 'It goes in your coffee.', sr: 'Kupi mleko.', en: 'Buy milk.' },
  { id: 17, word: 'TAČNO', pron: 'TAHCH-noh', english: 'exactly / correct', hint: 'A way to say you got it right.', sr: 'Tačno tako!', en: 'Exactly!' },
  { id: 18, word: 'MOŽDA', pron: 'MOHZH-dah', english: 'maybe', hint: 'Not yes, not no.', sr: 'Možda sutra.', en: 'Maybe tomorrow.' },
  { id: 19, word: 'MNOGO', pron: 'MNOH-goh', english: 'a lot / very', hint: 'It makes any thank-you stronger.', sr: 'Mnogo hvala!', en: 'Thanks a lot!' },
  { id: 20, word: 'ČESTO', pron: 'CHEHS-toh', english: 'often', hint: 'More than sometimes.', sr: 'Često mislim na tebe.', en: 'I often think of you.' },
  { id: 21, word: 'KASNO', pron: 'KAHS-noh', english: 'late', hint: 'The opposite of "rano" (early).', sr: 'Kasno je.', en: "It's late." },
  { id: 22, word: 'SPORO', pron: 'SPOH-roh', english: 'slowly', hint: 'What you ask a fast talker to do.', sr: 'Govori sporo, molim te.', en: 'Speak slowly, please.' },
  { id: 23, word: 'DRAGA', pron: 'DRAH-gah', english: 'dear (to a woman)', hint: 'A sweet way to address her.', sr: 'Laku noć, draga.', en: 'Good night, dear.' },
  { id: 24, word: 'GLAVA', pron: 'GLAH-vah', english: 'head', hint: 'Where a headache lives.', sr: 'Boli me glava.', en: 'My head hurts.' },
  { id: 25, word: 'ČEKAM', pron: 'CHEH-kahm', english: "I'm waiting", hint: 'What you text when you are standing outside.', sr: 'Čekam te ispred.', en: "I'm waiting for you outside." },
  { id: 26, word: 'IDEMO', pron: 'EE-deh-moh', english: "we're going / let's go", hint: 'Often followed by "na kafu?"', sr: 'Idemo na kafu?', en: 'Shall we go for coffee?' },
  { id: 27, word: 'ŽELIM', pron: 'ZHEH-leem', english: 'I wish / I want', hint: "What you do on someone's birthday.", sr: 'Želim ti sve najbolje.', en: 'I wish you all the best.' },
  { id: 28, word: 'ZNAČI', pron: 'ZNAH-chee', english: 'means', hint: "Ask it about a word you don't know: Šta to ___?", sr: 'Šta to znači?', en: 'What does that mean?' },
  { id: 29, word: 'ŠTETA', pron: 'SHTEH-tah', english: 'pity / shame', hint: 'What you say when a plan falls through.', sr: 'Kakva šteta!', en: 'What a pity!' },
  { id: 30, word: 'SNOVI', pron: 'SNOH-vee', english: 'dreams', hint: 'Wished "sweet" at bedtime.', sr: 'Slatki snovi!', en: 'Sweet dreams!' },
]

// Daily puzzle: one per calendar day (local time), cycling through the set.
export const dayNumber = (now = Date.now()) => Math.floor((now - new Date(now).getTimezoneOffset() * 60000) / 86400000)
export const dailyPuzzle = (day = dayNumber()) => PUZZLES[((day % PUZZLES.length) + PUZZLES.length) % PUZZLES.length]
