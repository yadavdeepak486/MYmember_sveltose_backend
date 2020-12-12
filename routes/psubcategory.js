const express = require('express');
const router = express.Router();
const { create,update,remove } = require("../controllers/psubcategory")
const { requireSignin, isAuth } = require("../controllers/auth");


var bodyParser=require('body-parser')
const parser = bodyParser.urlencoded({
    extended: false
});

router.post("/program_createSubcategory/:catId",requireSignin,parser,create);
router.put("/program_updateSubcategory/:catId/:sub_catId",requireSignin,parser,update);
router.delete("/program_deleteSubcategory/:catId/:sub_catId",requireSignin,remove);

module.exports = router;