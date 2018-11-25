'use strict';

const express  = require('express');
const socketIO = require('socket.io');
const path     = require('path');

const PORT  = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  socket.on('print', ($data) => {
    io.emit(`print device ${$data.id}`, $data)
  })

  socket.on('emit', ($data) => {
    io.emit($data.namespace, ($data.data || []))
  })
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
