const goals = require("../models/goal_schema");
const { errorHandler } = require('../helpers/dbErrorHandler');
// const todo = require("../models/todo_schema")


exports.goalCreate = async (req, res) => {
    const task = new goals(req.body);
    task.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        console.log(data)
        res.send("goal has been added successfully");
    });
};

exports.goalread = async (req, res) => {
    goals.find({})
        .then((result) => {
            res.json(result)
        }).catch((err) => {
            res.send(err)
        })
};
exports.goalinfo = async (req, res) => {
    const id = req.params.goalId
    goals.findById(id)
        .then((result) => {
            res.json(result)
        }).catch((err) => {
            res.send(err)
        });
};
exports.goalupdate = async (req, res) => {
    const id = req.params.goalId;
    goals.findByIdAndUpdate(id, { $set: req.body })
        .then((update_resp) => {
            console.log(update_resp)
            res.send("goal has been updated successfully")
        }).catch((err) => {
            console.log(err)
            res.send(err)
        })
};

exports.goalremove = async (req, res) => {
    const id = req.params.goalId
    goals.deleteOne({ _id: id })
        .then((resp) => {
            console.log(resp)
            res.json("goal has been deleted successfully")
        }).catch((err) => {
            console.log(err)
            res.send(err)
        })
};