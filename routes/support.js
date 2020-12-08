const express = require('express');
const router = express.Router();
const { create,read } = require('../controllers/support') 
const multer = require('multer')

var store = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'uploads/ticket/')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
  });
var upload = multer({storage : store});

router.get('/createticket',(req,res)=>{
  res.render('support')
})

router.get('/viewticket',read)

router.post('/createticket',upload.single('image'),create)



module.exports = router;
