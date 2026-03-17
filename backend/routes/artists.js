const express = require("express");
const router = express.Router();
const db = require("../database/db");
const authMiddleware = require("../middleware/auth");

//Get all the artists
router.get("/", authMiddleware, (req, res) => {
  //Pagination
  let { page, limit } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  const offset = (page - 1) * limit;

  db.get("SELECT COUNT(*) AS count FROM artist", [], (err, countRow) => {
    if (err) return res.status(500).json({ error: err.message });

    const total = countRow.count;
    const totalPages = Math.ceil(total / limit);

    db.all(
      "SELECT * FROM artist LIMIT ? OFFSET ?",
      [limit, offset],
      (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({
          data: rows,
          page,
          totalPages,
          totalRecords: total,
        });
      },
    );
  });
});

router.post("/", authMiddleware, (req, res) => {
  const {
    name,
    dateOfBirth,
    gender,
    address,
    firstReleaseYear,
    noOfAlbumsReleased,
  } = req.body;

  if (
    !name ||
    !dateOfBirth ||
    !gender ||
    !address ||
    !firstReleaseYear ||
    !noOfAlbumsReleased
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const query = `
      INSERT INTO artist (name, dob, gender, address, first_release_year, no_of_albums)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(
      query,
      [
        name,
        dateOfBirth,
        gender,
        address,
        firstReleaseYear,
        noOfAlbumsReleased,
      ],
      function (err) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Database error" });
        }
        return res.json({
          id: this.lastID,
          name,
          dateOfBirth,
          gender,
          address,
          firstReleaseYear,
          noOfAlbumsReleased,
        });
      },
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:id", authMiddleware, (req, res) => {
  const { id } = req.params;

  console.log(req.body);

  const {
    name,
    dateOfBirth,
    gender,
    address,
    firstReleaseYear,
    noOfAlbumsReleased,
  } = req.body;

  const query = `
    UPDATE artist
    SET name = ?, dob = ?, gender = ?, address = ?, first_release_year = ?, no_of_albums = ?
    WHERE id = ?
    `;

  const params = [
    name,
    dateOfBirth,
    gender,
    address,
    firstReleaseYear,
    noOfAlbumsReleased,
    id,
  ];

  db.run(query, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Artist not found" });
    }

    res.json({
      message: "Artist updated successfully",
    });
  });
});

router.delete("/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Artist ID is required" });
  }
  const query = "DELETE FROM artist WHERE id = ?";

  db.run(query, [id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Artist not found" });
    }
    res.json({ message: "Artist deleted successfully" });
  });
});

module.exports = router;
