const express = require('express');
const router = express.Router();
const { create,update,read,remove } = require("../controllers/pcategory")
const { requireSignin, isAuth } = require("../controllers/auth");

var bodyParser=require('body-parser')
const parser = bodyParser.urlencoded({
    extended: false
});

router.get("/programCategory_details/:categoryId",requireSignin,parser,read)
router.post("/program_createCategory/:programId",requireSignin,parser,create)
router.put("/program_updateCategory/:categoryId",requireSignin,update)
router.delete("/program_deleteCategory/:categoryId",requireSignin,remove)

module.exports = router;