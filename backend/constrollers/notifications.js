const ChatUser = require('../models/usuario');
//update de las notificaciones que le mando a un amigo cuando le escribo
const updateNotificationsMessage = async (myId, friendId, notifCount) => {
  //TODO traer la cantidad de notif que tiene el user para sumarle una
  await ChatUser.findOneAndUpdate(
    { _id: friendId },
    //TODO: esta logica tiene que sumar de a uno
    { friends: { user: myId, $inc: { notifications: notifCount + 1 } } },
    { new: true }
  );
};

const test = async (req, res) => {
  const myId = req.uid;
  const friendId = req.body.uid;
  const notif = req.body.notif;
  try {
    const update = await ChatUser.findOneAndUpdate(
      { _id: friendId },

      { $set: { friends: { user: myId, notifications: notif + 1 } } },
      { new: true }
    );
    return res.json({
      ok: true,
      update,
    });
  } catch (error) {
    return res.json({
      ok: false,
      update: error,
    });
  }
};
//reseteo la notificaciones que tengo de un amigo
const resetNotificationsMessage = async (req, res) => {
  const myId = req.uid;
  const friendId = req.body.uid;

  await ChatUser.findOneAndUpdate(
    { _id: myId, 'friends.user': friendId }, // Match the user and the specific friend

    { $set: { 'friends.$.notifications': 0 } }, // Update the notifications field of the matched friend
    { new: true }
  );
  return res.json({
    ok: true,
  });
};

module.exports = {
  resetNotificationsMessage,
  updateNotificationsMessage,
  test,
};
