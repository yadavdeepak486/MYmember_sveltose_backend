const express = require('express');
const router = express.Router();
const multer = require('multer')
const { addmember,
        memberinfo,
        deletemember,
        updatemember,
        read
      } = require("../controllers/addmember")
const { requireSignin } = require('../controllers/auth');
const upload = require('../handler/multer');

router.get('/member/member_list/:userID',requireSignin,read)
router.get('/member/member_info/:userID/:memberID',requireSignin,memberinfo)
router.post('/member/add_member/:userID',requireSignin,upload.single('memberprofileImage'),addmember) 
router.delete('/member/delete_member/:userID/:memberID',requireSignin,deletemember)
router.post('/member/update_member/:userID/:memberID',requireSignin,updatemember)

module.exports = router