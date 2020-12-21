const express = require('express');
const router = express.Router();
const { createFolder,createDocument,folderlist,read } = require('../controllers/document')
const multer = require('multer')

var store = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'uploads/')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
});
var upload = multer({storage : store});

router.get('/document/create_document',(req,res)=>{
    res.render('document')
})
router.post('/document/add_folder/:userID',createFolder)
router.post('/document/create_document',upload.single('image'),createDocument)
router.get('/add_folder/:id', folderlist)
router.get('/merge_document',read)

module.exports = router;