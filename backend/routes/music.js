const express = require("express");
const router = express.Router();
const db = require("../database/db");
const authMiddleware = require("../middleware/auth");

// Get all the music for the artist
router.get("/:artistId", authMiddleware, (req, res) => {
  const { artistId } = req.params;

  //Pagination
  let { page, limit } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  const offset = (page - 1) * limit;

  db.all(
    "SELECT * FROM music WHERE artist_id = ? LIMIT ? OFFSET ?",
    [artistId, limit, offset],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ data: rows });
    },
  );
});

// Create new music for the artist
router.post("/:artistId", authMiddleware, (req, res) => {
  const { artistId } = req.params;
  const { title, albumName, genre } = req.body;

  if (!title || !genre) {
    return res.status(400).json({ error: "Title and genre are required" });
  }

  if (!["rnb", "country", "classic", "rock", "jazz"].includes(genre)) {
    return res.status(400).json({
      error: "Genre must be one of rnb, country, classic, rock, jazz",
    });
  }

  const query = `
    INSERT INTO music (artist_id, title, album_name, genre)
    VALUES (?, ?, ?, ?)
  `;

  db.run(query, [artistId, title, albumName, genre], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    return res.json({
      id: this.lastID,
      artistId,
      title,
      albumName,
      genre,
    });
  });
});

//Edit music details
router.put("/:musicId", authMiddleware, (req, res) => {
  const { musicId } = req.params;
  const { title, albumName, genre } = req.body;

  if (!title || !genre) {
    return res.status(400).json({ error: "Title and genre are required" });
  }

  if (!["rnb", "country", "classic", "rock", "jazz"].includes(genre)) {
    return res.status(400).json({
      error: "Genre must be one of rnb, country, classic, rock, jazz",
    });
  }

  const query = `
    UPDATE music
    SET title = ?, album_name = ?, genre = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.run(query, [title, albumName, genre, musicId], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    return res.json({
      id: musicId,
      title,
      albumName,
      genre,
    });
  });
});

//Delete music
router.delete("/:musicId", authMiddleware, (req, res) => {
  const { musicId } = req.params;

  const query = "DELETE FROM music WHERE id = ?";

  db.run(query, [musicId], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Music deleted successfully" });
  });
});

module.exports = router;
