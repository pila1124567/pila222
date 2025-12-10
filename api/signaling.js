// Vercel API route for signaling
export default async function handler(req, res) {
  const { type, room } = req.query;
  const body = req.body;
  
  // Simple in-memory store (resets on redeploy, fine for free)
  if (!global.signalingDB) global.signalingDB = {};
  if (!global.signalingDB[room]) global.signalingDB[room] = { ice: [] };

  if (req.method === 'POST') {
    if (type === 'ice') {
      global.signalingDB[room].ice.push(body);
    } else {
      global.signalingDB[room][type] = body;
    }
    res.status(200).json({ ok: true });
  } else if (req.method === 'GET') {
    if (type === 'ice') {
      res.status(200).json(global.signalingDB[room].ice || []);
    } else {
      res.status(200).json(global.signalingDB[room]?.[type] || null);
    }
  } else {
    res.status(405).end();
  }
}
