const express = require("express");
const router = express.Router();
const db = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const query = "SELECT * FROM user WHERE email = ?";

  db.get(query, [email], (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Database Error" });
    }

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const valid = bcrypt.compareSync(password, user.password);

    if (!valid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
      },
    });
  });
});

module.exports = router;
