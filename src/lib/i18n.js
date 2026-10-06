import { useWurdle } from './store.jsx'

export const LANGUAGES = [
  ['en', 'English'],
  ['sr', 'Srpski'],
  ['fr', 'Français'],
  ['es', 'Español'],
  ['vi', 'Tiếng Việt'],
]
export const HTML_LANG = { en: 'en', sr: 'sr-Latn', fr: 'fr', es: 'es', vi: 'vi' }

// Every screen string, in the order en, sr, fr, es, vi. {n}, {m}, {l} are filled in by t().
const T = (en, sr, fr, es, vi) => ({ en, sr, fr, es, vi })
export const STR = {
  tagline: T('A word game in five languages.', 'Igra reči na pet jezika.', 'Un jeu de mots en cinq langues.', 'Un juego de palabras en cinco idiomas.', 'Trò chơi chữ bằng năm ngôn ngữ.'),
  statistics: T('Statistics', 'Statistika', 'Statistiques', 'Estadísticas', 'Thống kê'),
  played: T('Played', 'Odigrano', 'Parties', 'Jugadas', 'Đã chơi'),
  winRate: T('Win rate', 'Uspešnost', 'Taux de victoire', '% de victorias', 'Tỷ lệ thắng'),
  streak: T('Streak', 'Niz', 'Série', 'Racha', 'Chuỗi thắng'),
  bestStreak: T('Best streak', 'Najbolji niz', 'Meilleure série', 'Mejor racha', 'Chuỗi dài nhất'),
  difficulty: T('Difficulty', 'Težina', 'Difficulté', 'Dificultad', 'Độ khó'),
  easy: T('Easy', 'Lako', 'Facile', 'Fácil', 'Dễ'),
  normal: T('Normal', 'Srednje', 'Normal', 'Normal', 'Vừa'),
  hard: T('Hard', 'Teško', 'Difficile', 'Difícil', 'Khó'),
  descEasy: T('7 tries. The meaning is shown from the start.', '7 pokušaja. Značenje se vidi od početka.', '7 essais. Le sens est affiché dès le début.', '7 intentos. El significado se muestra desde el principio.', '7 lượt. Nghĩa được hiện ngay từ đầu.'),
  descNormal: T('6 tries. The meaning appears after 3 guesses.', '6 pokušaja. Značenje se pojavi posle 3 pokušaja.', '6 essais. Le sens apparaît après 3 essais.', '6 intentos. El significado aparece tras 3 intentos.', '6 lượt. Nghĩa hiện sau 3 lượt đoán.'),
  descHard: T('5 tries. No meaning until the end, and revealed clues must be reused.', '5 pokušaja. Bez značenja do kraja, a otkrivena slova moraš ponovo da iskoristiš.', '5 essais. Pas de sens avant la fin, et les indices révélés doivent être réutilisés.', '5 intentos. Sin significado hasta el final, y hay que reutilizar las pistas reveladas.', '5 lượt. Không có nghĩa cho đến cuối, và phải dùng lại các gợi ý đã lộ.'),
  tries: T('{n} tries', '{n} pokušaja', '{n} essais', '{n} intentos', '{n} lượt'),
  gameModes: T('Game modes', 'Režimi igre', 'Modes de jeu', 'Modos de juego', 'Chế độ chơi'),
  daily: T('Daily', 'Dnevna', 'Quotidien', 'Diario', 'Hằng ngày'),
  todaysWord: T("Today's word", 'Današnja reč', 'Le mot du jour', 'La palabra de hoy', 'Từ hôm nay'),
  dailySub: T('One new puzzle every day', 'Nova zagonetka svakog dana', 'Un nouveau défi chaque jour', 'Un nuevo reto cada día', 'Mỗi ngày một câu đố mới'),
  solvedIn: T('Solved in {n}. Come back tomorrow.', 'Rešeno u {n}. Vrati se sutra.', 'Résolu en {n}. Reviens demain.', 'Resuelta en {n}. Vuelve mañana.', 'Giải được sau {n} lượt. Mai quay lại nhé.'),
  missedToday: T('Not today. Come back tomorrow.', 'Danas nije uspelo. Vrati se sutra.', "Pas aujourd'hui. Reviens demain.", 'Hoy no. Vuelve mañana.', 'Hôm nay chưa được. Mai quay lại nhé.'),
  inProgress: T('In progress, pick up where you left off', 'U toku, nastavi igru', 'En cours, reprends la partie', 'En curso, continúa la partida', 'Đang chơi dở, tiếp tục nhé'),
  play: T('Play', 'Igraj', 'Jouer', 'Jugar', 'Chơi'),
  continue: T('Continue', 'Nastavi', 'Continuer', 'Continuar', 'Tiếp tục'),
  viewResult: T('View result', 'Vidi rezultat', 'Voir le résultat', 'Ver resultado', 'Xem kết quả'),
  practice: T('Practice', 'Vežba', 'Entraînement', 'Práctica', 'Luyện tập'),
  randomWord: T('Random word', 'Nasumična reč', 'Mot au hasard', 'Palabra al azar', 'Từ ngẫu nhiên'),
  noStats: T("Doesn't affect your stats", 'Ne utiče na statistiku', "N'affecte pas tes statistiques", 'No afecta tus estadísticas', 'Không ảnh hưởng thống kê'),
  puzzles: T('Puzzles', 'Zagonetke', 'Défis', 'Retos', 'Câu đố'),
  nOfM: T('{n} of {m} solved', '{n} od {m} rešeno', '{n} sur {m} résolus', '{n} de {m} resueltos', 'Đã giải {n}/{m}'),
  missed: T('missed', 'promašeno', 'raté', 'fallado', 'trượt'),
  anyOrder: T("Play them in any order. Solve all {m} to see how far you've come.", 'Igraj ih bilo kojim redom. Reši svih {m} da vidiš svoj napredak.', "Joue-les dans l'ordre que tu veux. Résous les {m} pour voir tes progrès.", 'Juégalos en el orden que quieras. Resuelve las {m} para ver tu progreso.', 'Chơi theo thứ tự tùy ý. Giải hết {m} câu để thấy mình tiến bộ.'),
  howToPlay: T('How to play', 'Kako se igra', 'Comment jouer', 'Cómo jugar', 'Cách chơi'),
  rule1: T('Guess the 5-letter word.', 'Pogodi reč od 5 slova.', 'Devine le mot de 5 lettres.', 'Adivina la palabra de 5 letras.', 'Đoán từ có 5 chữ cái.'),
  letterNote: T('Type your guess with the keyboard below.', 'Kucaj pokušaj na tastaturi ispod. Č, ć, š, ž i đ su pojedinačna slova.', 'Tape ta réponse avec le clavier ci-dessous. Les accents ne comptent pas.', 'Escribe tu intento con el teclado de abajo. Los acentos no cuentan, pero la ñ es una letra aparte.', 'Gõ từ đoán bằng bàn phím bên dưới. Dấu thanh không tính, nhưng ă, â, ê, ô, ơ, ư và đ là các chữ cái riêng.'),
  inEnglish: T('In English', 'Na engleskom', 'En anglais', 'En inglés', 'Tiếng Anh'),
  green: T('Green', 'Zeleno', 'Vert', 'Verde', 'Xanh lá'),
  greenDesc: T('right letter, right spot.', 'pravo slovo, pravo mesto.', 'bonne lettre, bonne place.', 'letra correcta, lugar correcto.', 'đúng chữ, đúng vị trí.'),
  yellow: T('Yellow', 'Žuto', 'Jaune', 'Amarillo', 'Vàng'),
  yellowDesc: T('right letter, wrong spot.', 'pravo slovo, pogrešno mesto.', 'bonne lettre, mauvaise place.', 'letra correcta, lugar incorrecto.', 'đúng chữ, sai vị trí.'),
  gray: T('Gray', 'Sivo', 'Gris', 'Gris', 'Xám'),
  grayDesc: T('not in the word.', 'nema ga u reči.', 'absente du mot.', 'no está en la palabra.', 'không có trong từ.'),
  rule3: T('Any 5 letters are accepted as a guess; there is no dictionary check.', 'Svakih 5 slova se prihvata kao pokušaj; nema provere u rečniku.', 'Toute suite de 5 lettres est acceptée ; il n’y a pas de vérification dans un dictionnaire.', 'Se acepta cualquier combinación de 5 letras; no hay comprobación en un diccionario.', 'Mọi chuỗi 5 chữ cái đều được chấp nhận; không kiểm tra từ điển.'),
  rule4: T('Finish a puzzle to see the full word, its meaning and an example sentence.', 'Završi zagonetku da vidiš celu reč, njeno značenje i primer rečenice.', 'Termine un défi pour voir le mot complet, son sens et une phrase d’exemple.', 'Termina un reto para ver la palabra completa, su significado y una frase de ejemplo.', 'Hoàn thành câu đố để xem từ đầy đủ, nghĩa và câu ví dụ.'),
  introGuess: T('Guess the 5-letter word. Each guess shows how close you are:', 'Pogodi reč od 5 slova. Svaki pokušaj pokazuje koliko si blizu:', 'Devine le mot de 5 lettres. Chaque essai montre à quel point tu es proche :', 'Adivina la palabra de 5 letras. Cada intento muestra cuánto te acercas:', 'Đoán từ có 5 chữ cái. Mỗi lượt đoán cho biết bạn gần đúng đến đâu:'),
  gotIt: T('Got it', 'Razumem', 'Compris', 'Entendido', 'Đã hiểu'),
  meaning: T('Meaning', 'Značenje', 'Sens', 'Significado', 'Nghĩa'),
  unlocksAfter: T('Meaning unlocks after {n} guesses', 'Značenje se otključava posle {n} pokušaja', 'Le sens se débloque après {n} essais', 'El significado se desbloquea tras {n} intentos', 'Nghĩa mở khóa sau {n} lượt đoán'),
  unlocksEnd: T('Meaning unlocks after the game', 'Značenje se otključava na kraju igre', 'Le sens se débloque à la fin de la partie', 'El significado se desbloquea al terminar', 'Nghĩa mở khóa khi kết thúc ván'),
  needs5: T('Needs 5 letters', 'Potrebno je 5 slova', 'Il faut 5 lettres', 'Hacen falta 5 letras', 'Cần đủ 5 chữ cái'),
  mustBe: T('Letter {n} must be {l}', 'Slovo {n} mora biti {l}', 'La lettre {n} doit être {l}', 'La letra {n} debe ser {l}', 'Chữ cái thứ {n} phải là {l}'),
  mustContain: T('Guess must contain {l}', 'Pokušaj mora sadržati {l}', 'L’essai doit contenir {l}', 'El intento debe contener {l}', 'Lượt đoán phải chứa {l}'),
  wow: T('Wow, first try!', 'Vau, iz prvog pokušaja!', 'Waouh, du premier coup !', '¡Guau, a la primera!', 'Tuyệt, đúng ngay lượt đầu!'),
  bravo: T('Bravo!', 'Bravo!', 'Bravo !', '¡Bravo!', 'Giỏi lắm!'),
  nextTime: T('Next time!', 'Sledeći put!', 'La prochaine fois !', '¡La próxima vez!', 'Lần sau nhé!'),
  share: T('Share result', 'Podeli rezultat', 'Partager le résultat', 'Compartir resultado', 'Chia sẻ kết quả'),
  playAnother: T('Play another', 'Igraj drugu', 'Rejouer', 'Jugar otra', 'Chơi câu khác'),
  nextPuzzle: T('Next puzzle', 'Sledeća zagonetka', 'Défi suivant', 'Siguiente reto', 'Câu tiếp theo'),
  backToWurdle: T('Back to Wurdle', 'Nazad na Wurdle', 'Retour à Wurdle', 'Volver a Wurdle', 'Về Wurdle'),
  wurdleHome: T('Wurdle home', 'Početna Wurdle', 'Accueil Wurdle', 'Inicio de Wurdle', 'Trang chủ Wurdle'),
  settingsTitle: T('Wurdle settings', 'Podešavanja Wurdle', 'Réglages de Wurdle', 'Ajustes de Wurdle', 'Cài đặt Wurdle'),
  startedNote: T('A game already started keeps the difficulty it began with.', 'Igra koja je već počela zadržava težinu s kojom je započeta.', 'Une partie déjà commencée garde la difficulté de départ.', 'Una partida ya empezada mantiene la dificultad con la que comenzó.', 'Ván đã bắt đầu giữ nguyên độ khó ban đầu.'),
  language: T('Language', 'Jezik', 'Langue', 'Idioma', 'Ngôn ngữ'),
  languageDesc: T('Changes the app and the words you play. Each language has its own puzzles and statistics.', 'Menja aplikaciju i reči koje igraš. Svaki jezik ima svoje zagonetke i statistiku.', 'Change l’application et les mots du jeu. Chaque langue a ses propres défis et statistiques.', 'Cambia la aplicación y las palabras del juego. Cada idioma tiene sus propios retos y estadísticas.', 'Đổi ngôn ngữ ứng dụng và các từ trong trò chơi. Mỗi ngôn ngữ có câu đố và thống kê riêng.'),
  display: T('Display', 'Prikaz', 'Affichage', 'Pantalla', 'Hiển thị'),
  colorBlind: T('Color-blind colors', 'Boje za daltonizam', 'Couleurs pour daltoniens', 'Colores para daltonismo', 'Màu cho người mù màu'),
  colorBlindDesc: T('Orange and blue instead of green and yellow.', 'Narandžasta i plava umesto zelene i žute.', 'Orange et bleu à la place du vert et du jaune.', 'Naranja y azul en lugar de verde y amarillo.', 'Cam và xanh dương thay cho xanh lá và vàng.'),
  showPron: T('Show pronunciation', 'Prikaži izgovor', 'Afficher la prononciation', 'Mostrar pronunciación', 'Hiện cách phát âm'),
  showPronDesc: T('Show how to say the word on the result screen, where available (Serbian).', 'Prikaži kako se reč izgovara na ekranu rezultata, gde je dostupno (srpski).', 'Affiche la prononciation sur l’écran de résultat, quand elle existe (serbe).', 'Muestra la pronunciación en la pantalla de resultado, cuando existe (serbio).', 'Hiện cách đọc từ trên màn hình kết quả, nếu có (tiếng Serbia).'),
  data: T('Data', 'Podaci', 'Données', 'Datos', 'Dữ liệu'),
  resetStats: T('Reset statistics', 'Resetuj statistiku', 'Réinitialiser les statistiques', 'Reiniciar estadísticas', 'Đặt lại thống kê'),
  resetStatsDesc: T('Clears played, win rate and streaks. Solved puzzles stay solved.', 'Briše odigrano, uspešnost i nizove. Rešene zagonetke ostaju rešene.', 'Efface parties, taux de victoire et séries. Les défis résolus restent résolus.', 'Borra jugadas, victorias y rachas. Los retos resueltos siguen resueltos.', 'Xóa số ván, tỷ lệ thắng và chuỗi thắng. Các câu đã giải vẫn được giữ.'),
  resetAll: T('Reset everything', 'Resetuj sve', 'Tout réinitialiser', 'Reiniciar todo', 'Đặt lại tất cả'),
  resetAllDesc: T('Clears statistics and all puzzle progress.', 'Briše statistiku i sav napredak u zagonetkama.', 'Efface les statistiques et toute la progression.', 'Borra las estadísticas y todo el progreso.', 'Xóa thống kê và toàn bộ tiến trình.'),
  reset: T('Reset', 'Resetuj', 'Réinitialiser', 'Reiniciar', 'Đặt lại'),
  confirmStats: T('Reset your Wurdle statistics?', 'Resetovati Wurdle statistiku?', 'Réinitialiser tes statistiques Wurdle ?', '¿Reiniciar tus estadísticas de Wurdle?', 'Đặt lại thống kê Wurdle?'),
  confirmAll: T('Erase all Wurdle progress?', 'Obrisati sav Wurdle napredak?', 'Effacer toute ta progression Wurdle ?', '¿Borrar todo tu progreso de Wurdle?', 'Xóa toàn bộ tiến trình Wurdle?'),
  savedHere: T('Saved in this browser only.', 'Sačuvano samo u ovom pregledaču.', 'Enregistré uniquement dans ce navigateur.', 'Guardado solo en este navegador.', 'Chỉ lưu trong trình duyệt này.'),
  notFound: T('Page not found.', 'Stranica nije pronađena.', 'Page introuvable.', 'Página no encontrada.', 'Không tìm thấy trang.'),
}

export function translate(lang, key, vars = {}) {
  const raw = STR[key]?.[lang] ?? STR[key]?.en ?? key
  return raw.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? `{${k}}`))
}

export function useT() {
  const { data } = useWurdle()
  const lang = data.language
  return (key, vars) => translate(lang, key, vars)
}
