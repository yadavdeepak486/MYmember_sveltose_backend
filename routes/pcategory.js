const express = require('express');
const router = express.Router();
const { create,update,read } = require("../controllers/pcategory")
const { requireSignin, isAuth } = require("../controllers/auth");

var bodyParser=require('body-parser')
const parser = bodyParser.urlencoded({
    extended: false
});

router.get("/programCategory_details/:categoryId",requireSignin,parser,read)
router.post("/program_createCategory/:programId",requireSignin,parser,create)
router.put("/program_updateCategory/:programID/:categoryID",requireSignin,parser, update)


module.exports = router;