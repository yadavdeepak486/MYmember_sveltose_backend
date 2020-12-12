const express = require("express");
const router = express.Router();
const goals = require("../controllers/goals")
const { requireSignin, isAuth } = require("../controllers/auth");
var bodyParser=require('body-parser')


router.post("/add_goals/:user_id",requireSignin,goals.goalCreate);
router.get("/list_of_goals/:user_id",requireSignin,goals.goalread);
router.put("/update_goals/:user_id/:goalId",requireSignin,goals.goalupdate);
router.get("/goals_info/:user_id/:goalId",requireSignin,goals.goalinfo);
router.delete("/delete_goals/:user_id/:goalId",requireSignin,goals.goalremove);

module.exports = router;
