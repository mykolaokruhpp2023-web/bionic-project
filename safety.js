export function analyzeSound(db) {
  if (db < 0) return 'INVALID';
  if (db >= 90) return 'DANGER'; // Рівень сирени або гучного гудка
  if (db >= 70) return 'WARNING'; // Жвава вулиця
  return 'SAFE'; // Тиха розмова
}