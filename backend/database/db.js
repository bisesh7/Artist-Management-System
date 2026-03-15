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
      fname varchar(255) NOT NULL,
      lname varchar(255) NOT NULL,
      email varchar(255) NOT NULL UNIQUE,
      password varchar(500) NOT NULL,
      phone varchar(20) NOT NULL,
      dob datetime NOT NULL,
      gender text CHECK(gender IN ('m', 'f', 'o')),
      address varchar(255) NOT NULL,
      created_at datetime DEFAULT CURRENT_TIMESTAMP,
      updated_at datetime DEFAULT CURRENT_TIMESTAMP
      )
    `,
  );

  db.run(
    `
      CREATE TABLE IF NOT EXISTS artist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name varchar(255) NOT NULL,
      gender text CHECK(gender IN ('m', 'f', 'o')),
      address varchar(255) NOT NULL,
      first_release_year year NOT NULL,
      no_of_albums integer NOT NULL,
      created_at datetime DEFAULT CURRENT_TIMESTAMP,
      updated_at datetime DEFAULT CURRENT_TIMESTAMP
      )
    `,
  );

  db.run(
    `
      CREATE TABLE IF NOT EXISTS music (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      artist_id INTEGER NOT NULL,
      title text NOT NULL,
      album_name TEXT,
      genre text CHECK(genre IN ('rnb', 'country', 'classic', 'rock', 'jazz')),
      created_at datetime DEFAULT CURRENT_TIMESTAMP,
      updated_at datetime DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (artist_id) REFERENCES artist(id)
      )
    `,
  );
});

module.exports = db;
