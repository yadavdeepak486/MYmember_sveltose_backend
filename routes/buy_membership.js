const express = require("express");
const router = express.Router();
const { update,create,membership_info,remove } = require("../controllers/buy_membership")
const { requireSignin, isAuth } = require("../controllers/auth");

// router.post("/membership/buy_membership/:user_id",requireSignin,buy_membership.Create);
// router.get("/membership/list_of_buy_membership/:user_id",requireSignin,buy_membership.read);
// router.get("/membership/list_of_buy_membership_info/:user_id/:membershipId",requireSignin,buy_membership.membership_Info)

router.get("/membership/membership_info/:user_id/:membershipId",requireSignin,membership_info)
router.post("/membership/buy_membership/:user_id/:studentId",requireSignin,create)
router.put("/membership/update_buy_memberships/:user_id/:membershipId",requireSignin,update);
router.delete("/membership/delete_buy_membership/:user_id/:membershipId",requireSignin,remove);

module.exports = router;
