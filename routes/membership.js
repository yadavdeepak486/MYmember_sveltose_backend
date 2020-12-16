const express = require('express');
const router = express.Router();
const { create,read,membershipInfo } = require ('../controllers/membership')
const { requireSignin, isAuth } = require("../controllers/auth");
const multer = require('multer');
const membership = require('../models/membership');

var store = multer.diskStorage({
    destination: function(req, file, cb){
            cb(null,'uploads/')
        },
    filename: function(req, file, cb){
            cb(null, Date.now() + file.originalname)
        }
      });
var upload = multer({storage : store});      
router.get('/membership/membership_list/:userId',requireSignin,read)
router.post('/membership/add_membership/:userId',requireSignin,upload.single('membership_profile'), create)
router.get('/membership/info_membership/:userId/:membershipId',requireSignin,membershipInfo)
module.exports = router;