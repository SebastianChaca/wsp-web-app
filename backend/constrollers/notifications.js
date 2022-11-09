const ChatUser = require("../models/usuario");

const updateNotificationsMessage = () => {
  console.log("update");
};

const resetNotificationsMessage = () => {
  console.log("reset");
};

module.exports = {
  resetNotificationsMessage,
  updateNotificationsMessage,
};
