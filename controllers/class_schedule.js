const class_schedule = require("../models/class_schedule");
const { errorHandler } = require('../helpers/dbErrorHandler');
// const todo = require("../models/todo_schema")


exports.Create = async (req, res) => {
    const task = new class_schedule(req.body);
    task.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        console.log(data)
        res.send("class schedule has been added successfully");
    });
};

exports.read = async (req, res) => {
    class_schedule.find({})
        .then((result) => {
            res.json(result)
        }).catch((err) => {
            res.send(err)
        })
};
exports.class_schedule_Info = async (req, res) => {
    const id = req.params.scheduleId
    class_schedule.findById(id)
        .then((result) => {
            res.json(result)
        }).catch((err) => {
            res.send(err)
        })
};
exports.update = async (req, res) => {
    const id = req.params.scheduleId;
    class_schedule.updateOne({ _id: id }, { $set: req.body })
        .then((update_resp) => {
            console.log(update_resp)
            res.send("class schedule has been updated successfully")
        }).catch((err) => {
            console.log(err)
            res.send(err)
        })
};

exports.remove = async (req, res) => {
    const id = req.params.scheduleId
    class_schedule.deleteOne({ _id: id })
        .then((resp) => {
            console.log(resp)
            res.json("class schedule has been deleted successfully")
        }).catch((err) => {
            console.log(err)
            res.send(err)
        })
};