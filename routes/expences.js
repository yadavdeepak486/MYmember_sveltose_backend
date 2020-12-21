const express = require("express");
const router = express.Router();
const expenses  = require("../controllers/expenses")
const { requireSignin, isAuth } = require("../controllers/auth");
const upload = require('../handler/multer')

router.post("/add_expenses/:user_id",upload.single("expence_image"),requireSignin,expenses.Create);
router.get("/list_of_expenses/:user_id",requireSignin,expenses.read);
router.get("/expence_info/:user_id/:expenseId",requireSignin,expenses.expenseInfo)
router.put("/update_expenses/:user_id/:expenseId",requireSignin,expenses.update);
router.delete("/delete_expenses/:user_id/:expenseId",upload.single("expence_image"),requireSignin,expenses.remove);

module.exports = router;
