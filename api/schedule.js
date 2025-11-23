const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, sessionID');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')
    return res.status(404).json({ error: 'Not found' });

  try {
    const { id } = req.body;

    if (!id) {
      return res.status(422).json({ error: 'Missing student ID' });
    }

    const dbPath = path.join(process.cwd(), 'db.json');
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    const student = data.students.find((s) => s.id === id);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    return res.status(200).json(student);
  } catch (err) {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }
};
