const cors = require('cors');
const express = require('express');
const path = require('path');
const seed = require('./database/seed');
const db = require('./database/db');
const session = require('express-session');

const app = express();

app.use(cors({
  origin: 'http://localhost:8080', // povolit jen frontend
  credentials: true                // DŮLEŽITÉ: povolit cookies/session přes CORS
}));

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'tajnyKlic',
  resave: false,
  saveUninitialized: false,        // nevytvářet session dokud to není potřeba
  cookie: {
    secure: false,                 // false protože používáš HTTP (localhost)
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24   // 24 hodin
  }
}));

// Výchozí stránka (volitelné, podle tvého setupu)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/frontP.html'));
});

(async () => {
  try {
    await seed();

    // Endpoint pro získání uživatelů (pro test)
    app.get('/api/users', (req, res) => {
      db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
      });
    });

    // Připojení API rout
    const apiRoutes = require('./api/api');
    app.use('/api', apiRoutes);

    app.listen(port, () => {
      console.log(`Server běží na http://localhost:${port}`);
    });
  } catch (e) {
    console.error('Chyba při seedování:', e);
  }
})();
