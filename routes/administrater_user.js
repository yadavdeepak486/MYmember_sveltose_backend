const express = require("express");
const router = express.Router();
const multer = require("multer")
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/home/abc/Documents/MYmember_sveltose_backend/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + '-' + Date.now())
    }
});
var upload = multer({ storage: storage });

const {
    signup,
    signin,
    signout,prfile_update
} = require("../controllers/administrat_user");
const { userSignupValidator } = require("../validator");

router.post("/add_administer", upload.single("profile_image"), signup);
router.post("/administer_signin", signin);
router.post("/administer/update_profile/:uid",upload.single("profile_image"),prfile_update)
router.get("/administrat_signout", signout);

module.exports = router;
