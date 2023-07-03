const ChatUser = require('../models/usuario');
//update de las notificaciones que le mando a un amigo cuando le escribo
const updateNotificationsMessage = async (userId, friendUserId) => {
  try {
    const updatedUser = await ChatUser.findOneAndUpdate(
      {
        _id: friendUserId,
        'friends.user': userId,
      },
      { $inc: { 'friends.$.notifications': 1 } },
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    console.error(error);
    // Handle the error
    return null;
  }
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

  try {
    const updatedUser = await ChatUser.findOneAndUpdate(
      {
        _id: myId,
        'friends.user': friendId,
      },
      { $set: { 'friends.$.notifications': 0 } },
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    console.error(error);
    // Handle the error
    return null;
  }
};

module.exports = {
  resetNotificationsMessage,
  updateNotificationsMessage,
  test,
};
