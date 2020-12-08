const express = require("express");
const router = express.Router();
const appointment  = require("../controllers/appointment")
const { requireSignin, isAuth } = require("../controllers/auth");
var bodyParser=require('body-parser')
const parser = bodyParser.urlencoded({
    extended: false
});

router.post("/add_appointment/:user_id",parser,requireSignin,appointment.Create);
router.get("/appointment/list_of_appointments/:user_id",parser,requireSignin,appointment.read);
router.get("/appointment/list_of_appoinment_info/:user_id/:appointId",parser,requireSignin,appointment.appointInfo)
router.post("/appointment/update_appointment/:user_id/:appointId",parser,requireSignin,appointment.update);
router.get("/delete_appointment/:user_id/:appointId",parser,requireSignin,appointment.remove);

module.exports = router;
