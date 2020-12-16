const finance_info = require("../models/finance_info");
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.Create = async (req, res) => {
    const body_info = req.body
    const finance = new finance_info(body_info);
    finance.save((err, data) => {
        console.log(err)
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        console.log(data)
        res.send("finance Info has been added successfully");
    });
};

exports.read = async (req, res) => {
    finance_info.find({})
        .then((result) => {
            res.json(result)
        }).catch((err) => {
            res.send(err)
        })
};
exports.finance_Info = async (req, res) => {
    const id = req.params.financeId
    finance_info.findById(id)
        .then((result) => {
            res.json(result)
        }).catch((err) => {
            res.send(err)
        })
};

exports.update = async (req, res) => {
    const id = req.params.financeId;
    finance_info.updateOne({ _id: id }, { $set: req.body })
        .then((update_resp) => {
            console.log(update_resp)
            res.send("finance Info has been updated for this student successfully")
        }).catch((err) => {
            console.log(err)
            res.send(err)
        });
};

exports.remove = async (req, res) => {
  const id = req.params.financeId;
  
  finance_info.deleteOne({ _id: id })
        .then((resp) => {
            console.log(resp)
            res.json("finance Info has been deleted for this student successfully")
        }).catch((err) => {
            console.log(err)
            res.send(err)
        })
};
