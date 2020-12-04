const tasks = require("../models/todo_schema");
const { errorHandler } = require('../helpers/dbErrorHandler');
// const todo = require("../models/todo_schema")


exports.todoCreate = async (req, res) => {
    const task = new tasks(req.body);
    task.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({ data });
    });
};

exports.taskread = async (req, res) => {
    tasks.find({})
        .then((result) => {
            res.json(result)
        }).catch((err) => {
            res.send(err)
        })
}

exports.update = async (req, res) => {
    const id = req.body.ids;
    tasks.findByIdAndUpdate(id, { $set: req.body })
        .then((update_resp) => {
            console.log(update_resp)
            res.send(update_resp)
        }).catch((err) => {
            console.log(err)
            res.send(err)
        })
}

exports.remove = async (req, res) => {
    const id = req.body.id
    tasks.deleteOne({ _id: id })
        .then((resp) => {
            res.json(resp)
        }).catch((err) => {
            console.log(err)
            res.send(err)
        })
}