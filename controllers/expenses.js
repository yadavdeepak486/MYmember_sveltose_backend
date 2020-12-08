const Expenses = require("../models/expenses");
const { errorHandler } = require('../helpers/dbErrorHandler');
// const todo = require("../models/todo_schema")


exports.Create = async (req, res) => {
    console.log(req.body)
    const campaigns = new Expenses(req.body);
    campaigns.save((err, data) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                error: errorHandler(err)
            });
        } const cloudenary = require("cloudinary").v2
        cloudenary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.cloud_api_key,
            api_secret: process.env.cloud_api_secret
        });
        if (req.file) {
            console.log(req.file)
            const path = req.file.path
            const uniqueFilename = new Date().toISOString()
            cloudenary.uploader.upload(
                path,
                { public_id: `Expenses/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
                function (err, image) {
                    if (err) return res.send(err)
                    console.log('file uploaded to Cloudinary')
                    const fs = require('fs')
                    fs.unlinkSync(path)
                    Expenses.findByIdAndUpdate(data._id, { $set: { image: image.url } })
                        .then((response) => {
                            res.json(response)
                        });
                }
            );
        } else {
            console.log(data)
            res.send("Expenses has been added successfully");
        }
    });
};

exports.read = async (req, res) => {
    Expenses.find({})
        .then((result) => {
            res.json(result)
        }).catch((err) => {
            res.send(err)
        })

};

exports.expenseInfo = async (req, res) => {
    const id = req.params.expenseId
    Expenses.findById(id)
        .then((result) => {
            res.json(result)
        }).catch((err) => {
            res.send(err)
        });
};

exports.update = async (req, res) => {
    const id = req.params.expenseId;
    Expenses.updateOne(id, { $set: req.body })
        .then((update_resp) => {
            if (req.file) {
                console.log(req.file)
                const path = req.file.path
                const uniqueFilename = new Date().toISOString()
                cloudenary.uploader.upload(
                    path,
                    { public_id: `Expenses/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
                    function (err, image) {
                        if (err) return res.send(err)
                        console.log('file uploaded to Cloudinary')
                        const fs = require('fs')
                        fs.unlinkSync(path)
                        Expenses.findByIdAndUpdate(id, { $set: { image: image.url } })
                            .then((response) => {
                                res.json({message:"Expense and profile update successfuly",data:response})
                            });
                    }
                );
            } else {
                console.log(update_resp)
                res.send("Expenses has been added successfully");
            }
        }).catch((err) => {
            console.log(err)
            res.send(err)
        })
};

exports.remove = async (req, res) => {
    const id = req.params.expenseId
    Expenses.deleteOne({ _id: id })
        .then((resp) => {
            console.log(resp)
            res.json("Expenses has been deleted successfully")
        }).catch((err) => {
            console.log(err)
            res.send(err)
        })
};