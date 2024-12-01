const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "../db/database.sqlite");
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) console.error("Database opening error:", err);
  else console.log("Database connected.");
});

db.serialize(() => {
  db.run(`
    DROP TABLE IF EXISTS items
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      profile_image TEXT,
      resume TEXT,
      status BOOLEAN DEFAULT TRUE,
      card_id TEXT
    )
  `);
  console.log("Table may be created.");
});

module.exports = db;
