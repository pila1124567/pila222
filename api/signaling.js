export default function handler(req, res) {
  const { type, room } = req.query;

  if (!global.db) global.db = {};
  if (!global.db[room]) global.db[room] = { ice: [] };

  if (req.method === 'POST') {
    if (type === 'ice') global.db[room].ice.push(req.body);
    else global.db[room][type] = req.body;
    res.json({ ok: true });
  } else {
    if (type === 'ice') res.json(global.db[room].ice);
    else res.json(global.db[room][type] || null);
  }
}
