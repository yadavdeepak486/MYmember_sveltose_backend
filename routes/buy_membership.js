const express = require("express");
const router = express.Router();
const buy_membership  = require("../controllers/buy_membership")
const { requireSignin, isAuth } = require("../controllers/auth");
var bodyParser=require('body-parser')
const parser = bodyParser.urlencoded({
    extended: false
});

router.post("/buy_membership/:user_id",parser,requireSignin,buy_membership.Create);
router.get("/membership/list_of_buy_membership/:user_id",parser,requireSignin,buy_membership.read);
router.get("/membership/list_of_buy_membership_info/:user_id/:membershipId",parser,requireSignin,buy_membership.membership_Info)
router.post("/membership/update_buy_memberships/:user_id/:membershipId",parser,requireSignin,buy_membership.update);
router.get("/membership/delete_buy_membership/:user_id/:membershipId",parser,requireSignin,buy_membership.remove);

module.exports = router;
