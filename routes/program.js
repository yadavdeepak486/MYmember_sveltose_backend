const express = require("express");
const router = express.Router();
const program = require("../controllers/program")
const { requireSignin, isAuth } = require("../controllers/auth");

const upload = require('../handler/multer')

router.post("/add_program/:user_id",requireSignin,upload.single("program_image"),program.create);
router.get("/list_of_program/:user_id", requireSignin,program.read);
router.get("/program_details/:user_id/:proId",requireSignin,program.programs_detail)
router.put("/update_program/:user_id/:proId", upload.single("program_image"),requireSignin,program.update);
router.delete("/delete_program/:user_id/:proId",requireSignin,program.remove);

module.exports = router;
