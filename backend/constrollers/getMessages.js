const ChatMessage = require('../models/mensaje');
const getMessages = async (req, res) => {
  const myId = req.uid;
  const messageFrom = req.params.from;
  const page = req.body.page;
  const limit = req.body.limit;

  const skip = (page - 1) * limit;
  try {
    const last30 = await ChatMessage.find({
      $or: [
        { from: myId, to: messageFrom },
        { from: messageFrom, to: myId },
      ],
    })
      .sort({ createdAt: 'desc' })
      // .limit(20);
      .skip(skip)
      .limit(limit);

    ///test

    res.json({
      ok: true,
      mensajes: last30,
    });
  } catch (error) {
    res.json({
      ok: false,
      mensajes: error,
    });
  }
};

module.exports = { getMessages };
