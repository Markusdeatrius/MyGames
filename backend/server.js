const express = require('express');
const path = require('path');
const seed = require('./database/seed');
const db = require('./database/db');

const app = express();
app.use(express.json());

(async () => {
  try {
    await seed();  // počkej, až seed proběhne

    app.post('/api/users', (req, res) => {
      const { username, password } = req.body;
      const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
      db.run(sql, [username, password], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ id: this.lastID });
      });
    });

    app.get('/api/users', (req, res) => {
      db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
      });
    });

    app.listen(3000, () => {
      console.log('Server běží na http://localhost:3000');
    });

  } catch (e) {
    console.error('Chyba při seedování:', e);
  }
})();
