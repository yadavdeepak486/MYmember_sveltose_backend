const express = require("express");
const router = express.Router();
const appointment  = require("../controllers/appointment")
const { requireSignin, isAuth } = require("../controllers/auth");


router.post("/add_appointment/:user_id",requireSignin,appointment.Create);
router.get("/appointment/list_of_appointments/:user_id",requireSignin,appointment.read);
router.get("/appointment/list_of_appoinment_info/:user_id/:appointId",requireSignin,appointment.appointInfo)
router.put("/appointment/update_appointment/:user_id/:appointId",requireSignin,appointment.update);
router.delete("/delete_appointment/:user_id/:appointId",requireSignin,appointment.remove);

module.exports = router;
