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

router.post("/add_stripe/:user_id",requireSignin,upload.single("stripe_image"),stripe.create);
router.get("/list_of_stripe/:user_id",requireSignin,stripe.read);
router.put("/update_stripe/:user_id/:stripeId",requireSignin,stripe.update);
router.get("/stripe_info/:user_id/:stripeId",requireSignin,stripe.stripe_detail)
router.delete("/delete_stripe/:user_id/:stripeId",requireSignin,stripe.remove);
module.exports = router;
