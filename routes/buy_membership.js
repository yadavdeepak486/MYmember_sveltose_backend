const express = require("express");
const router = express.Router();
const buy_membership  = require("../controllers/buy_membership")
const { requireSignin, isAuth } = require("../controllers/auth");

router.post("/buy_membership/:user_id",requireSignin,buy_membership.Create);
router.get("/membership/list_of_buy_membership/:user_id",requireSignin,buy_membership.read);
router.get("/membership/list_of_buy_membership_info/:user_id/:membershipId",requireSignin,buy_membership.membership_Info)
router.update("/membership/update_buy_memberships/:user_id/:membershipId",requireSignin,buy_membership.update);
router.delete("/membership/delete_buy_membership/:user_id/:membershipId",requireSignin,buy_membership.remove);

module.exports = router;
