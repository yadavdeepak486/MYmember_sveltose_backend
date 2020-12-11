const express = require('express');
const router = express.Router();
const { create } = require("../controllers/psubcategory")
const { requireSignin, isAuth } = require("../controllers/auth");


var bodyParser=require('body-parser')
const parser = bodyParser.urlencoded({
    extended: false
});

router.post("/program_createSubcategory/:catId",requireSignin,parser,create);

module.exports = router;