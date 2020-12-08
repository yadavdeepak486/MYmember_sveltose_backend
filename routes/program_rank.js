const express = require("express");
const router = express.Router();
const program = require("../controllers/program_rank")
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

router.post("/add_program_rank/:user_id",isAuth, requireSignin,upload.single("rank_image"),program.create);
router.get("/list_of_program_rank/:user_id",isAuth,requireSignin,program.read);
router.get("/program_rank_info/:user_id/:proId",isAuth,requireSignin,program.program_Info)
router.post("/update_program_rank/:user_id/:proId",isAuth,upload.single("rank_image"),requireSignin,program.update);
router.post("/delete_program_rank/:user_id/:proId",isAuth,requireSignin,program.remove);
module.exports = router;
