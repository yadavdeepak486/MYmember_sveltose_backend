const express = require('express');
const router = express.Router();
const multer = require('multer')
const { addmember,
        studentinfo,
        deletemember,
        updatemember,
        read,
        addStripe
      } = require("../controllers/addmember")
const { requireSignin } = require('../controllers/auth');
const upload = require('../handler/multer');

router.get('/member/member_list/:userID',requireSignin,read)
router.get('/member/member_info/:userID/:StudentId',requireSignin,studentinfo)
router.post('/member/add_member/:userID',requireSignin,upload.single('memberprofileImage'),addmember) 
router.delete('/member/delete_member/:userID/:memberID',requireSignin,deletemember)
router.put('/member/update_member/:userID/:memberID',requireSignin,updatemember)

router.put("/candidates/create_stripe_status/:studentId/:stripeId",requireSignin,addStripe)

module.exports = router