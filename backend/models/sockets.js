const {
  connectUser,
  disconnectUser,
  getUser,
  saveMessage,
  updateSeenMessages,
  addFriend,
} = require('../constrollers/sockets');
const { getFriends } = require('../constrollers/friends');
const { checkJWT } = require('../middlewares/validar-jwt');
const { updateNotificationsMessage } = require('../constrollers/notifications');

class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on('connection', async (socket) => {
      console.log('cliente conectado');
      //valido el token
      const [valid, uid] = checkJWT(socket.handshake.query['x-token']);

      if (!valid) {
        return socket.disconnect();
      }
      // actualizo la db en el campo online
      const status = await connectUser(uid);
      //me conecto al socker
      socket.join(uid);
      //busco lista de amigos
      const friends = await getFriends(uid);

      const friendsIds = friends.map((friend) => friend.user._id.valueOf());
      //emitir lista de amigos
      this.io.to(uid).emit('friend-list', friends);

      //emitir a mis amigos que me conecte
      this.io.to(friendsIds).emit('friend-status', {
        uid: status._id.valueOf(),
        online: status.online,
      });

      //escuchar si estan escribiendo
      socket.on('typing', (payload) => {
        this.io.to(payload.to).emit('typing', payload);
      });

      //marcar mensajes como vistos
      socket.on('seen-messages', async (payload) => {
        //payload
        //  [   msg: {
        //       from: '63643107da84feaed10653bf',
        //       to: '63643111da84feaed10653c2',
        //       message: 'sdfsdf'
        //     }]
        const updateMessages = await updateSeenMessages(payload);

        // marcar mensajes como vistos y mandarlos al front
        this.io.to(payload[0].from).emit('seen-messages', updateMessages);
      });

      // obtener mensaje personal
      socket.on('personal-message', async (payload) => {
        //payload
        // {
        //     from: '63643107da84feaed10653bf',
        //     to: '63643111da84feaed10653c2',
        //     message: 'sdfsdf'
        //   }
        //

        //TODO:guardar como last message

        const message = await saveMessage(payload);

        //TODO: solo setea en 1
        //await updateNotificationsMessage(uid, payload.to);

        //emito mensaje al destinatario
        this.io.to(payload.to).emit('personal-message', message);
        //TODO: puedo hacer esto en la UI para evitar otra request
        this.io.to(payload.from).emit('personal-message', message);
      });
      //cuando agrego a un amigo y el status === 0, mando los datos de la persona que hace la peticion
      //para que se agregue al listado de amigos
      socket.on('request-friend', async (payload) => {
        try {
          //TODO: simplificar esto en una sola query
          await addFriend(payload.to, payload.from);
          const user = await getUser(payload.to, payload.from);

          this.io.to(payload.to).emit('request-friend', {
            friendInfo: user[0].friend,
          });
        } catch (error) {
          console.log(error);
        }
      });

      socket.on('update-friend-status', async (payload) => {
        console.log(payload);
      });

      socket.on('disconnect', async () => {
        console.log('desconectado');
        // actualizo la db en el campo online
        const status = await disconnectUser(uid);
        if (status) {
          this.io.to(friendsIds).emit('friend-status', {
            uid: status._id.valueOf(),
            online: status.online,
          });
        }
      });
    });
  }
}

module.exports = Sockets;
