const cors = require('cors');
const express = require('express');
const path = require('path');
const seed = require('./database/seed');
const db = require('./database/db');

const app = express();

app.use(cors({ origin: 'http://localhost:8080' })); // povolit CORS jen pro frontend

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Výchozí stránka
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/frontP.html'));
});

(async () => {
  try {
    await seed();

    // GET uživatelé
    app.get('/api/users', (req, res) => {
      db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
      });
    });

    // Připojení /api rout z api.js
    const apiRoutes = require('./api/api');
    app.use('/api', apiRoutes);

    app.listen(port, () => {
      console.log('Server běží na http://localhost:3000');
    });
  } catch (e) {
    console.error('Chyba při seedování:', e);
  }
})();
