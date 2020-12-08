const express = require("express");
const router = express.Router();
const todos = require("../controllers/todo")
const { requireSignin, isAuth } = require("../controllers/auth");
var bodyParser=require('body-parser')
const parser = bodyParser.urlencoded({
    extended: false
});

router.post("/add_task/:user_id",parser,requireSignin,isAuth,todos.todoCreate);
router.get("/list_of_task/:user_id",requireSignin,isAuth,parser,todos.taskread);
router.post("/update_task/:user_id/:todoId",parser,isAuth,requireSignin,todos.update);
router.get("/todo_info/:user_id/:todoId", requireSignin ,isAuth,parser,todos.taskinfo)
router.get("/delete_task/:user_id/:todoId", requireSignin ,isAuth,parser,todos.remove);
module.exports = router;
