const express = require("express");
const router = express.Router();
const program = require("../controllers/program")
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

router.post("/add_program",isAuth, upload.single("program_image"),program.create);
router.get("/list_of_program",program.read);
router.post("/update_program",program.update);
router.delete("/delete_program",program.remove);
module.exports = router;
