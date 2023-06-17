/*
    Path: api/friends
*/

const { Router } = require('express');
const {
  addFriend,
  getFriends,
  getFriendAPI,
  acceptFriend,
  blockFriend,
} = require('../constrollers/friends');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/addfriend', validarJWT, addFriend);
router.get('/getfriends', validarJWT, getFriendAPI);
router.post('/aceptfriend', validarJWT, acceptFriend);
router.post('/blockFrien', validarJWT, blockFriend);
module.exports = router;
