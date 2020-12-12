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

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/home/abc/Documents/MYmember_sveltose_backend/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + '-' + Date.now())
    }
});

var upload = multer({ storage:storage });

router.post('/test_fees/:userId',upload.single("image"),requireSignin,create) 
router.get('/test/fees_list/:userID',requireSignin,read )
router.get('/test/feesrinfo/:userID/:feeId',requireSignin,fee_info)
router.delete('/test/feesdelete/:userID/:feeId',requireSignin,deletetestfee)
router.put('/test/testfeesupdate/:userID/:feeId',upload.single("image"),requireSignin,updatetestFee)

module.exports = router