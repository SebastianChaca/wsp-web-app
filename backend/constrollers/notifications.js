const ChatUser = require("../models/usuario");

const updateNotificationsMessage = async (myId, friendId, notifCount) => {
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
  test,
};
