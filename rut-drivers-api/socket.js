// socket.js
const { Server } = require('socket.io');

function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

    // Ejemplo: recibir ubicación en tiempo real
    socket.on('location', (data) => {
      // Broadcast a todos los clientes (o filtra por sala/rol)
      io.emit('locationUpdate', data);
    });

    // Ejemplo: notificación de viaje
    socket.on('tripRequest', (data) => {
      io.emit('newTrip', data);
    });

    socket.on('disconnect', () => {
      console.log('Usuario desconectado:', socket.id);
    });
  });

  return io;
}

module.exports = setupSocket;
