const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

//Statické soubory z aktuální složky (frontend/)
app.use(express.static(__dirname));

// Výchozí stránka – root přesměrován na frontP.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/frontP.html'));
});

// 404 – pokud žádná jiná cesta nevyhovuje
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'pages/404error.html'));
});

app.listen(port, () => {
  console.log(`Frontend server běží na http://localhost:${port}`);
});
