const ChatUser = require("../models/usuario");

const updateNotificationsMessage = async (myId, friendId) => {
  await ChatUser.findOneAndUpdate(
    { _id: friendId },
    //TODO: esta logica tiene que sumar de a uno
    { $set: { friends: { user: myId, notifications: 1 } } },
    { new: true }
  );
};

const resetNotificationsMessage = async (req, res) => {
  const myId = req.uid;
  const friendId = req.body.uid;

  await ChatUser.findOneAndUpdate(
    { _id: friendId },

    { $set: { friends: { user: myId, notifications: 0 } } },
    { new: true }
  );
  return res.json({
    ok: true,
  });
};

module.exports = {
  resetNotificationsMessage,
  updateNotificationsMessage,
};
