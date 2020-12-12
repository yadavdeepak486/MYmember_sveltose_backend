const express = require("express");
const router = express.Router();
const todos = require("../controllers/todo")
const { requireSignin, isAuth } = require("../controllers/auth");

router.get("/list_of_task/:user_id",requireSignin,todos.taskread);
router.post("/add_task/:user_id",requireSignin,todos.todoCreate);
router.put("/update_task/:user_id/:todoId",requireSignin,todos.update);
router.get("/todo_info/:user_id/:todoId", requireSignin,todos.taskinfo)
router.delete("/delete_task/:user_id/:todoId", requireSignin,todos.remove);

module.exports = router;
