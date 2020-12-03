const express = require('express');
const router = express.Router();
const { addmember }= require("../controllers/addmember")

router.post('/addmember',addmember) 

module.exports = router