const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addmember,
        memberinfo,
        deletemember,
        updatemember,
        read
       } = require("../controllers/addmember")

var store = multer.diskStorage({
        destination: function(req, file, cb){
                cb(null,'uploads/')
            },
        filename: function(req, file, cb){
                cb(null, Date.now() + file.originalname)
            }
      });

var upload = multer({storage : store});      
      
const { requireSignin } = require('../controllers/auth');
router.get('/member/memberlist/:userID',requireSignin,read )
router.get('/member/memberinfo/:userID/:memberID',requireSignin,memberinfo)
router.get('/member/addmember',(req,res)=>{
    res.render('addmember');
})
router.post('/member/addmember/:userID',requireSignin,upload.single('memberprofileImage'),addmember) 
router.delete('/member/deletemember/:userID/:memberID',requireSignin,deletemember)
router.put('/member/updatemember/:userID/:memberID',requireSignin,updatemember)
module.exports = router