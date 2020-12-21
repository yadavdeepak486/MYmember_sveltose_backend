const express = require("express");
const router = express.Router();
const { create_candidateList,
        add_stripe,
        candidate_list,
        candidate_remove } = require("../controllers/candidates");
const { requireSignin, isAuth } = require("../controllers/auth");

router.get("/candidates/create_candidate_list/:studentId",requireSignin,create_candidateList);
router.get("/candidates/add_stripe_candidate/:candidateId/:stripeId",requireSignin,add_stripe);
router.get("/candidates/candidate_list",requireSignin,candidate_list);
router.delete("/candidates/delete_candidate/:candidateId",requireSignin,candidate_remove)

module.exports = router;