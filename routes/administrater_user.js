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
    signout,prfile_update,
    read,
    edit_userInfo,
    update,
    remove
} = require("../controllers/administrat_user");
const { userSignupValidator } = require("../validator");
const { requireSignin, isAuth } = require("../controllers/auth");


router.post("/administer_signin", signin);
router.post("/administer/update_profile/:uid",upload.single("profile_image"),prfile_update)
router.get("/administrat_signout", signout);

router.get("/users/user_list",requireSignin,read);
router.post("/users/add_user",requireSignin,upload.single("profile_image"), signup);
router.get("/users/user_info/:userId",requireSignin,edit_userInfo)
router.put("/users/user_update/:userId",requireSignin,update)
router.delete("/delete_user/:userId",requireSignin,remove)

module.exports = router;
