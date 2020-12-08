const express = require('express');
const router = express.Router();
const { create } = require ('../controllers/membership')
const multer = require('multer');

var store = multer.diskStorage({
    destination: function(req, file, cb){
            cb(null,'uploads/membership_profile/')
        },
    filename: function(req, file, cb){
            cb(null, Date.now() + file.originalname)
        }
      });
    var upload = multer({storage : store});      
router.get('/addmembership',(req,res)=>{
    res.render('membership')
})

router.post('/addmembership',upload.single('membership_profile'), create)

module.exports = router;
