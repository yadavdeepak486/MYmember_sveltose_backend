const express = require("express");
const router = express.Router();
const expenses  = require("../controllers/expenses")
const { requireSignin, isAuth } = require("../controllers/auth");
var bodyParser=require('body-parser')
const parser = bodyParser.urlencoded({
    extended: false
});

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


router.post("/add_expenses/:user_id",parser,upload.single("image"),requireSignin,expenses.Create);
router.get("/list_of_expenses/:user_id",parser,requireSignin,expenses.read);
router.get("/expence_info/:user_id/:expenseId",parser,requireSignin,expenses.expenseInfo)
router.post("/update_expenses/:user_id/:expenseId",parser,requireSignin,expenses.update);
router.get("/delete_expenses/:user_id/:expenseId",parser,upload.single("image"),requireSignin,expenses.remove);

module.exports = router;
