const express = require('express');
const router = express.Router();
const { createAppoinment,read } = require('../controllers/appoinment')

router.get('/appoinmentlist',read)

router.post('/createappoinment',createAppoinment)

module.exports = router;