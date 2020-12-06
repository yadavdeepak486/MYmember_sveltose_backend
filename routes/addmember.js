const express = require('express');
const router = express.Router();
const { addmember,
        memberinfo,
        deletemember,
        updatemember,
        read
      }= require("../controllers/addmember")
const { requireSignin } = require('../controllers/auth');

router.get('/member/memberlist/:userID',requireSignin,read )

router.get('/member/memberinfo/:userID/:memberID',requireSignin,memberinfo)

router.post('/member/addmember',addmember) 

router.delete('/member/deletemember/:userID/:memberID',requireSignin,deletemember)

router.put('/member/updatemember/:userID/:memberID',requireSignin,updatemember)

module.exports = router