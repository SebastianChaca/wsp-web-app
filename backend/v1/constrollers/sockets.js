const ChatUser = require('../models/usuario');
const Message = require('../models/mensaje');
const dayjs = require('dayjs');
const mongoose = require('mongoose');
const connectUser = async (uid) => {
  const filter = { _id: uid };
  const update = { online: true };
  try {
    return await ChatUser.findOneAndUpdate(filter, update, { new: true });
  } catch (error) {
    throw new Error('Eror en connect');
  }
};

const disconnectUser = async (uid) => {
  const filter = { _id: uid };
  const update = { online: false, lastActive: dayjs() };
  try {
    return await ChatUser.findOneAndUpdate(filter, update, { new: true });
  } catch (error) {
    throw new Error('Eror en disconnect');
  }
};

const addFriend = async (uid, friendId) => {
  try {
    //TODO: como hacer esto en un solo paso ??
    await ChatUser.findOneAndUpdate(
      { _id: uid },
      { $push: { friends: { user: friendId } } },
      { new: true }
    );
    await ChatUser.findOneAndUpdate(
      { _id: uid, 'friends.user': friendId },
      { $set: { 'friends.$.isRequesting': true } }
    );
  } catch (error) {
    throw new Error('error en find one and update');
  }
};

const saveMessage = async (payload) => {
  try {
    const message = new Message(payload);
    await message.save();

    const populatedMessage = await Message.populate(message, [
      { path: 'to' },
      { path: 'from' },
      { path: 'responseTo' },
    ]);

    return populatedMessage;
  } catch (error) {
    return false;
  }
};

const updateSeenMessages = async (messages) => {
  const getMessagesIds = messages.map((msg) => msg.id);

  await Message.updateMany(
    {
      _id: {
        $in: getMessagesIds,
      },
    },
    {
      $set: {
        seen: true,
      },
    }
  );
  const findMessages = await Message.find({ _id: { $in: getMessagesIds } });

  return findMessages;
};

const getUser = async (userId, friendId) => {
  try {
    return await ChatUser.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(userId) } }, // Find the user with the specified ID
      { $unwind: '$friends' }, // Unwind the friends array
      { $match: { 'friends.user': mongoose.Types.ObjectId(friendId) } }, // Find the friend with the specified ID
      {
        $lookup: {
          from: 'chatusers', // Replace 'users' with the actual collection name for users
          localField: 'friends.user',
          foreignField: '_id',
          as: 'friend.user',
        },
      },
      { $unwind: '$friend.user' },
      {
        $project: {
          _id: 0,
          friend: {
            _id: '$friends._id',
            notifications: '$friends.notifications',
            status: '$friends.status',
            isRequesting: '$friends.isRequesting',
            user: {
              uid: '$friend.user._id',
              name: '$friend.user.name',
              email: '$friend.user.email',
              online: '$friend.user.online',
              lastActive: '$friend.user.lastActive',
              __v: '$friend.user.__v',
            },
          },
        },
      },
      {
        $addFields: {
          'friend.user._id': '$friend.user.uid',
        },
      },
      {
        $project: {
          'friend.user._id': 0,
        },
      },
    ]);
  } catch (error) {
    throw new Error('error en getUser');
  }
};

const updateNotificacions = () => {};
module.exports = {
  disconnectUser,
  connectUser,
  saveMessage,
  updateSeenMessages,
  getUser,
  addFriend,
};
