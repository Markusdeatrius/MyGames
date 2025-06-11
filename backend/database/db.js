// db.js
const sqlite3 = require('sqlite3').verbose();

// Otevření (nebo vytvoření) SQLite databáze
const db = new sqlite3.Database('database/database.sqlite', (err) => {
  if (err) {
    console.error('Chyba při připojení k DB:', err.message);
  } else {
    console.log('✅ Připojeno k SQLite databázi');
  }
});

module.exports = db;
