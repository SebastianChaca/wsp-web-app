/*
    Path: api/notifications
*/

const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  updateNotificationsMessage,
  test,
  resetNotificationsMessage,
} = require("../constrollers/notifications");
const router = Router();
router.post("/messages/test", validarJWT, test);
router.post("/messages/reset", validarJWT, resetNotificationsMessage);
module.exports = router;
