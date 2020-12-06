const express = require("express");
const router = express.Router();
const expenses  = require("../controllers/expenses")
const { requireSignin, isAuth } = require("../controllers/auth");
var bodyParser=require('body-parser')
const parser = bodyParser.urlencoded({
    extended: false
});

router.post("/add_expenses/:user_id",parser,requireSignin,expenses.Create);
router.get("/list_of_expenses/:user_id",parser,requireSignin,expenses.read);
router.post("/update_expenses/:user_id",parser,requireSignin,expenses.update);
router.get("/delete_expenses/:user_id",parser,requireSignin,expenses.remove);

module.exports = router;
