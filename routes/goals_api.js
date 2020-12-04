const express = require("express");
const router = express.Router();
const goals = require("../controllers/goals")
const { requireSignin, isAuth } = require("../controllers/auth");
var bodyParser=require('body-parser')
const parser = bodyParser.urlencoded({
    extended: false
});

router.post("/add_goals/:user_id",parser,requireSignin,isAuth,goals.goalCreate);
router.get("/list_of_goals/:user_id",parser,requireSignin,isAuth,goals.goalread);
router.post("/update_goals/:user_id",parser,isAuth,requireSignin,goals.goalupdate);
router.get("/delete_goals/:user_id",parser,requireSignin,isAuth,goals.goalremove);

module.exports = router;
