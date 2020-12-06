const appoint = require("../models/appointment");
const { errorHandler } = require('../helpers/dbErrorHandler');
// const todo = require("../models/todo_schema")


exports.Create = async (req, res) => {
    console.log(req.body)
    const campaigns = new appoint(req.body);
    campaigns.save((err, data) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        console.log(data)
        res.send("Appointment has been added successfully");
    })
}

exports.read = async (req, res) => {
    appoint.find({})
        .then((result) => {
            res.json(result)
        }).catch((err) => {
            res.send(err)
        })
};

exports.update = async (req, res) => {
    const id = req.body.id;
    appoint.findByIdAndUpdate(id, { $set: req.body })
        .then((update_resp) => {
            console.log(update_resp)
            res.send("Appointment has been updated successfully")
        }).catch((err) => {
            console.log(err)
            res.send(err)
        })
};

exports.remove = async (req, res) => {
    const id = req.body.id
    appoint.deleteOne({ _id: id })
        .then((resp) => {
            console.log(resp)
            res.json("Expenses has been deleted successfully")
        }).catch((err) => {
            console.log(err)
            res.send(err)
        })
};