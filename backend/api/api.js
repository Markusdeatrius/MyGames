const express = require('express');
const db = require('../database/db');

const router = express.Router();

// POST novy uzivatel
router.post('/users', (req, res) => {
  const { username, password } = req.body;
  db.run(
    'INSERT INTO users (username, passwword) VALUES (?, ?)',
    [username, password],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, username, password });
    }

  );
  
});

module.exports = router;