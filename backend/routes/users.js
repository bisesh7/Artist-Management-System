const express = require("express");
const router = express.Router();
const db = require("../database/db");
const bcrypt = require("bcrypt");

// Get all users
router.get("/", (req, res) => {
  //Pagination
  let { page, limit } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  const offset = (page - 1) * limit;

  db.all(
    "SELECT * FROM user LIMIT ? OFFSET ?",
    [limit, offset],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    },
  );
});

router.post("/", (req, res) => {
  const {
    fname,
    lname,
    email,
    password,
    confirmPassword,
    dateOfBirth,
    gender,
    address,
    phoneNumber,
  } = req.body;

  if (
    !fname ||
    !lname ||
    !email ||
    !password ||
    !confirmPassword ||
    !dateOfBirth ||
    !gender ||
    !address ||
    !phoneNumber
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const query = `
      INSERT INTO user (fname, lname, email, password, dob, gender, address, phone)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
      query,
      [
        fname,
        lname,
        email,
        hashedPassword,
        dateOfBirth,
        gender,
        address,
        phoneNumber,
      ],
      function (err) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Database error" });
        }
        res.json({
          id: this.lastID,
          fname,
          lname,
          email,
          dob: dateOfBirth,
          gender,
          address,
          phoneNumber,
        });
      },
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
