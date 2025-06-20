const db = require('./db');
const fs = require('fs');
const path = require('path');

async function seed() { 
  return new Promise((resolve, reject) => {
    const seedSQL = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
    db.exec(seedSQL, (err) => {
      if (err) {
        console.error('Error seeding database:', err.message);
        reject(err);
      } else {
        console.log('Database seeded successfully.');
        resolve();
      }
    });
  });
}

module.exports = seed;
