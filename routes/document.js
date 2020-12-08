const express = require('express');
const router = express.Router();
const { createFolder,createDocument,folderlist } = require('../controllers/document')

const multer = require('multer')

var store = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'uploads/document/')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
});
var upload = multer({storage : store});

router.get('/create_document',(req,res)=>{
    res.render('document')
})

router.post('/add_folder/:userID', createFolder)

router.post('/create_document',upload.single('image'),createDocument)

router.get('/add_folder/:id', folderlist)

module.exports = router;