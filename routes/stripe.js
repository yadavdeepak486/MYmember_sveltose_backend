const express = require("express");
const router = express.Router();
const stripe = require("../controllers/stripe")
const { requireSignin, isAuth } = require("../controllers/auth");
var multer = require("multer");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/home/abc/Documents/MYmember_sveltose_backend/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + '-' + Date.now())
    }
});
var upload = multer({ storage: storage });

router.post("/add_stripe/:user_id",isAuth,requireSignin,upload.single("stripe_image"),stripe.create);
router.get("/list_of_stripe/:user_id",isAuth,requireSignin,stripe.read);
router.post("/update_stripe/:user_id/:stripeId",isAuth,requireSignin,stripe.update);
router.get("/stripe_info/:user_id/:stripeId",isAuth,requireSignin,stripe.stripe_detail)
router.post("/delete_stripe/:user_id/:stripeId",isAuth,upload.single("stripe_image"),requireSignin,stripe.remove);
module.exports = router;
