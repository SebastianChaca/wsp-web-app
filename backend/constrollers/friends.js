const User = require('../models/usuario');
const Message = require('../models/mensaje');
const addFriend = async (req, res) => {
  const myId = req.uid;
  const email = req.body.email;

  try {
    const findFriend = await User.findOne({ email });

    if (!findFriend) {
      return res.status(404).json({
        ok: false,
        msg: 'Email incorrecto',
      });
    }
    const findUser = await User.findOne({ _id: myId });

    if (findUser.email === findFriend.email) {
      return res.status(404).json({
        ok: false,
        msg: 'No podes ingresar tu propio email',
      });
    }
    const checkifFriendExist = findUser.friends.find((friend) => {
      return friend.user.email == findFriend.email;
    });

    if (checkifFriendExist) {
      return res.status(404).json({
        ok: false,
        msg: 'Ya son amigos',
      });
    }
    //agrego el amigo a mi lista de amigos
    const addFriendFN = await User.findOneAndUpdate(
      { _id: myId },
      {
        $push: {
          friends: { user: findFriend._id, status: 0 },
        },
      },
      { new: true }
    );

    const friendAdded = addFriendFN.friends.find((friend) => {
      return friend.user.email == findFriend.email;
    });

    res.json({
      ok: true,
      friend: friendAdded,
    });
  } catch (error) {
    res.json({
      ok: false,
      friend: 'error',
    });
  }
};

const handleFriendStatus = async (myId, friendId, status) => {
  // return await User.findOneAndUpdate(
  //   { _id: myId, 'friends.user': friendId },
  //   { $set: { 'friends.$.status': status, 'friends.$.isRequesting': false } },
  //   { new: true }
  // );
  return await User.findOneAndUpdate(
    { _id: myId, 'friends.user': friendId },
    { $set: { 'friends.$.status': status, 'friends.$.isRequesting': false } },
    { new: true, projection: { friends: { $elemMatch: { user: friendId } } } }
  );
};
const acceptFriend = async (req, res) => {
  const myId = req.uid;
  const friendId = req.body.friendId;
  try {
    const user = await handleFriendStatus(friendId, myId, 2);
    const friend = await handleFriendStatus(myId, friendId, 2);
    res.json({
      ok: true,
      friend,
    });
  } catch (error) {
    res.json({
      ok: false,
    });
  }
};

const blockFriend = async (req, res) => {
  const myId = req.uid;
  const friendId = req.body.friendId;
  try {
    const user = await handleFriendStatus(friendId, myId, 2);
    const friend = await handleFriendStatus(myId, friendId, 2);
    res.json({
      ok: true,
      friend,
    });
  } catch (error) {
    res.json({
      ok: false,
    });
  }
};

const getFriendAPI = async (req, res) => {
  try {
    const user = await User.findById(req.uid);
    res.json({
      ok: true,
      friend: user.friends,
    });
  } catch (e) {
    res.json({
      ok: 'false',
      friends: [],
    });
  }
};
const getFriends = async (id) => {
  try {
    // const userTest = await User.findById(id).populate('friends.lastMessage');

    async function getUserWithLastMessages(userId) {
      try {
        // Step 1: Find the user by ID
        const user = await User.findById(userId).populate('friends.user');

        if (!user) {
          // User not found
          // Handle accordingly
          return null;
        }

        // Step 2: Fetch the last message of every conversation
        const friendIds = user.friends.map((friend) => friend.user._id);

        const lastMessages = await Message.find({
          $or: [
            { from: userId, to: { $in: friendIds } },
            { from: { $in: friendIds }, to: userId },
          ],
        })
          .sort({ createdAt: -1 })
          .select('from to message createdAt updatedAt seen')
          .lean();

        // Step 3: Group the last messages by friend ID
        const friendMap = new Map();
        lastMessages.forEach((message) => {
          const friendId =
            message.from._id.toString() === userId
              ? message.to._id.toString()
              : message.from._id.toString();
          if (
            !friendMap.has(friendId) ||
            message.createdAt > friendMap.get(friendId).createdAt
          ) {
            friendMap.set(friendId, message);
          }
        });

        // Step 4: Merge the last messages with the user's friend array
        user.friends.forEach((friend) => {
          const friendId = friend.user._id.toString();
          friend.lastMessage = friendMap.get(friendId) || null;
        });

        return user;
      } catch (error) {
        console.error(error);
        // Handle the error
        return null;
      }
    }
    const test = await getUserWithLastMessages(id);

    return {
      ok: true,
      friends: test.friends,
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = {
  addFriend,
  getFriends,
  getFriendAPI,
  acceptFriend,
  blockFriend,
  handleFriendStatus,
};
