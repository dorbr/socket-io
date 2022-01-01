import { app } from '../app';

import { info } from '../utils/logger';

import { createServer } from 'http';
import { Server } from 'socket.io';
import mock from '../data/mock/mock';


const httpServer = createServer(app);
const io = new Server(httpServer, {});

io.on('connection', (socket) => {
  socket.removeAllListeners();
  info('A new Connection has been established!');
  // mock.connectedUsers.push(socket.id);
  info(mock.connectedUsers)

  socket.on('chatMessage', (data) => {
    info('message: ' + data.content + ' by: ' + data.user);
    mock.messages.push({
      user:data.user + ':' + socket.id,
      content:data.content
    })
    io.emit('chatMessage', { messages:mock.messages, users:mock.connectedUsers });
  });
  
  socket.on('privateMessage', (reciver, sender, msg) => {
    console.log('server recived private msg event', reciver, sender, msg);
    console.log(socket);
    socket.to(reciver).emit('displayPrivateMessage', { sender, msg })
  })

  socket.on('joinedChat', (data) => {
    console.log('Joined Chat', data.user, socket.id)
    mock.connectedUsers.push({
      user:data.user,
      id:socket.id
    })
    mock.messages.push({
      user:data.user + ':' + socket.id,
      content: 'Has Entered This Room.',
    })
    io.emit('chatMessage', { messages:mock.messages, users:mock.connectedUsers })
  })

  socket.on('disconnect', () => {
    mock.connectedUsers = mock.connectedUsers.filter(item => item !== socket.id)
    info('A user disconnected');
  });
});


export { httpServer }
