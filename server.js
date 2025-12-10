// server.js
const express = require('express');
const app = express();
app.use(express.json());

const db = {}; // in-memory, restarts on redeploy (good enough for free tier)

app.post('/:type(offer|answer|ice)/:room', (req, res) => {
  const {type, room} = req.params;
  if (!db[room]) db[room] = {};
  if (type === 'ice') {
    if (!db[room].ice) db[room].ice = [];
    db[room].ice.push(req.body);
  } else {
    db[room][type] = req.body;
  }
  res.json({ok:true});
});

app.get('/:type(offer|answer)/:room', (req, res) => {
  const {type, room} = req.params;
  res.json(db[room]?.[type] || null);
});

app.get('/ice/:room', (req, res) => {
  const {room} = req.params;
  const ice = db[room]?.ice || [];
  res.json(ice);
});

app.listen(3000, () => console.log('Signaling server running'));