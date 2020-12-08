const express = require('express');
const router = express.Router();
const { createFolder,createSubfloder } = require('../controllers/document')

router.post('/add_folder', createFolder)

// router.post('/add_subfolder/:folderId', createSubfloder)

module.exports = router;