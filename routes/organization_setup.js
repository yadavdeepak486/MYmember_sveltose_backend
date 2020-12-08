const express = require("express");
const router = express.Router();
const organization_setup = require("../controllers/organization_setup")
const { requireSignin, isAuth } = require("../controllers/auth");
var bodyParser=require('body-parser')
const parser = bodyParser.urlencoded({
    extended: false
});

router.post("/add_organization_setup/:user_id",parser,requireSignin,organization_setup.Create);
router.get("/list_of_organization_setup/:user_id",parser,requireSignin,organization_setup.read);
router.post("/update_organization_setup/:user_id/:orgIid",parser,requireSignin,organization_setup.update);
router.get("/orgInfo/:user_id/:orgIid",parser,requireSignin,organization_setup.orgInfo)
router.get("/delete_organization_setup/:user_id/:orgIid",parser,requireSignin,organization_setup.remove);

module.exports = router;
