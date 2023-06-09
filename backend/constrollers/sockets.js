const ChatUser = require("../models/usuario");
const Message = require("../models/mensaje");
const dayjs = require("dayjs");
const mongoose = require("mongoose");
const connectUser = async (uid) => {
  const filter = { _id: uid };
  const update = { online: true };

  return await ChatUser.findOneAndUpdate(filter, update, { new: true });
};

const disconnectUser = async (uid) => {
  const filter = { _id: uid };
  const update = { online: false, lastActive: dayjs() };

  return await ChatUser.findOneAndUpdate(filter, update, { new: true });
};
const getUsers = async () => {
  const users = await ChatUser.find().sort("-online");

  return users;
  //TODO:cambiar el sort para traerlos por ultimos mensajes
};

const saveMessage = async (payload) => {
  try {
    const message = new Message(payload);

    return await message.save();
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

const getUser=async(userId, friendId)=>{ 
  
    // return await ChatUser.findOne(
    //   { _id: userId, 'friends.user': friendId }, // Find the user with the specified ID and friend with the specified ID
    //   { 'friends.$': 1 } // Include only the matched friend in the response
    // )
    //  .select('-_id friends') // Exclude the _id field and include only the friends field in the response
    //  .populate({
    //     path: 'friends.user',
    //     select: 'name email', // Include only the specific fields of the friend
    //   })
    return await ChatUser.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(userId) } }, // Find the user with the specified ID
      { $unwind: '$friends' }, // Unwind the friends array
      { $match: { 'friends.user': mongoose.Types.ObjectId(friendId) } }, // Find the friend with the specified ID
      {
        $lookup: {
          from: 'chatusers', // Replace 'users' with the actual collection name for users
          localField: 'friends.user',
          foreignField: '_id',
          as: 'friends.user',
        },
      },
      { $unwind: '$friends.user' },
      { $project: { _id: 0, friend: '$friends' } }, // Include only the friend in the response
    ])
}

const updateNotificacions = () => {};
module.exports = {
  disconnectUser,
  connectUser,
  getUsers,
  saveMessage,
  updateSeenMessages,
  getUser
};
