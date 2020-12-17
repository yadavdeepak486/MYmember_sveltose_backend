const express = require("express");
const router = express.Router();
const stripe = require("../controllers/stripe")
const { requireSignin, isAuth } = require("../controllers/auth");

const upload = require('../handler/multer')

router.post("/add_stripe",requireSignin,upload.single('stripe_image'),stripe.create);
router.get("/list_of_stripe/:user_id",requireSignin,stripe.read);
router.put("/update_stripe/:user_id/:stripeId",requireSignin,stripe.update);
router.get("/stripe_info/:user_id/:stripeId",requireSignin,stripe.stripe_detail)
router.delete("/delete_stripe/:user_id/:stripeId",requireSignin,stripe.remove);
module.exports = router;
  