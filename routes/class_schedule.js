const express = require("express");
const router = express.Router();
const class_schedule = require("../controllers/class_schedule")
const { requireSignin, isAuth } = require("../controllers/auth");


router.post("/add_classSchedule/:user_id",requireSignin,class_schedule.Create);
router.get("/list_of_classSchedule/:user_id",requireSignin,class_schedule.read);
router.put("/update_classSchedule/:user_id/:scheduleId",requireSignin,class_schedule.update);
router.get("/class_schedule_by_id/:user_id/:scheduleId",requireSignin,class_schedule.class_schedule_Info)
router.delete("/delete_classSchedule/:user_id/:scheduleId",requireSignin,class_schedule.remove);

module.exports = router;
