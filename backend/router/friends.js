/*
    Path: api/friends
*/

const { Router } = require("express");
const { addFriend, getFriends, getFriendAPI } = require("../constrollers/friends");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.post("/addfriend", validarJWT, addFriend);
router.get("/getfriends", validarJWT, getFriendAPI);
module.exports = router;
