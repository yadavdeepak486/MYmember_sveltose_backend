const express = require("express");
const router = express.Router();
const events  = require("../controllers/events")
const { requireSignin, isAuth } = require("../controllers/auth");
var bodyParser=require('body-parser')
const parser = bodyParser.urlencoded({
    extended: false
});

router.post("/add_events/:user_id",parser,requireSignin,events.Create);
router.get("/list_of_events/:user_id",parser,requireSignin,events.read);
router.get("/event_info/:user_id/:eventId",parser,requireSignin,events.Info)
router.post("/update_events/:user_id/:eventId",parser,requireSignin,events.update);
router.get("/delete_events/:user_id/:eventId",parser,requireSignin,events.remove);

module.exports = router;
