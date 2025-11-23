const http = require('http');
const fs = require('fs');

const PORT = 3000;
const DB_PATH = './db.json';

function readDb() {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error("❌ Failed to read db.json", err);
    return { students: [] };
  }
}

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, sessionID');

  if (req.method === 'OPTIONS') return res.end();

  // GET /api/students
  if (req.method === 'GET' && req.url === '/api/students') {
    const db = readDb();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(db.students));
  }

  // POST /api/schedule
  if (req.method === 'POST' && req.url === '/api/schedule') {
    let body = '';

    req.on('data', chunk => body += chunk);

    req.on('end', () => {
      let data;
      try {
        data = JSON.parse(body);
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Invalid JSON body' }));
      }

      const { id } = data;
      if (!id) {
        res.writeHead(422, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Missing student ID' }));
      }

      const db = readDb();
      const student = db.students.find(s => s.id === id);

      if (!student) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Student not found' }));
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(student));
    });
    return;
  }
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () =>
  console.log(`🚀 Mock API running at http://localhost:${PORT}`)
);
