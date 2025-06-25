const express = require('express');
const db = require('../database/db');

const router = express.Router();

// Registrace uživatele
router.post('/users', (req, res) => {
  const { username, password } = req.body;
  db.run(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, password],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, username, password });
    }
  );
});

// Přihlášení uživatele
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, password], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });

    if (user) {
      req.session.user = { id: user.id, username: user.username }; // uloží session
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Neplatné přihlašovací údaje' });
    }
  });
});

// Kontrola přihlášení
router.get('/check-auth', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

module.exports = router;
