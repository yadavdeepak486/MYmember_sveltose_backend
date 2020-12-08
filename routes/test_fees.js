const express = require('express');
const router = express.Router();
const { create,
    fee_info,
    deletetestfee,
    updatetestFee,
        read
      }= require("../controllers/test_fees")
const multer = require("multer")
const { requireSignin } = require('../controllers/auth');
var bodyParser=require('body-parser')
const parser = bodyParser.urlencoded({
    extended: true
});
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/home/abc/Documents/MYmember_sveltose_backend/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + '-' + Date.now())
    }
});

var upload = multer({ storage:storage });
router.post('/test_fees/:userId',parser,upload.single("image"),requireSignin,create) 
router.get('/test/fees_list/:userID',parser,requireSignin,read )
router.get('/test/feesrinfo/:userID/:feeId',parser,requireSignin,fee_info)
router.delete('/test/feesdelete/:userID/:feeId',parser,requireSignin,deletetestfee)
router.post('/test/testfeesupdate/:userID/:feeId',upload.single("image"),parser,requireSignin,updatetestFee)

module.exports = router