const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, sessionID');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const dbPath = path.join(process.cwd(), 'db.json');

    try {
      const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
      return res.status(200).json(data.students || []);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to read DB' });
    }
  }

  return res.status(404).json({ error: 'Not found' });
};
