const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "db.sqlite"), (err) => {
  if (err) console.error("Database opening error: ", err);
  else console.log("Database connected");
});

db.serialize(() => {
    db.run(
        `
        CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            
        )
        `
    )
})

module.exports = db;
