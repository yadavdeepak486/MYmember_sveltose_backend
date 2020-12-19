const express = require("express");
const router = express.Router();
const stripe = require("../controllers/stripe")
const { requireSignin, isAuth } = require("../controllers/auth");

const upload = require('../handler/multer')

router.get("/list_of_stripe/:user_id",requireSignin,stripe.read);
router.post("/add_stripe/:user_id",requireSignin,upload.single('stripe_image'),stripe.create);
router.put("/update_stripe/:user_id/:stripeId",requireSignin,upload.single('stripe_image'),stripe.update);
router.get("/stripe_info/:user_id/:stripeId",requireSignin,stripe.stripe_detail);
router.delete("/delete_stripe/:user_id/:stripeId",requireSignin,stripe.remove);

module.exports = router;
  