const category_managment = require("../models/category_managment");
const subCategory_managment = require("../models/sub_category_managment")
const { errorHandler } = require('../helpers/dbErrorHandler');
const { result } = require("lodash");
// const todo = require("../models/todo_schema")


exports.Create = async (req, res) => {
    const program = req.body.program;
    const category_id = req.body.cate_id;
    const sub_cate_id = req.body.subCate_id;
    const categories = req.body.category;
    const ids = [];
    var i = 0;
    const lebels = req.body.lebel;
    const data = req.body.sub_category;
    const color = req.body.color;
    const cate = 0
    category_id.forEach(function (cate_id) {
        category_managment.findByIdAndUpdate(cate_id, { $set: { category: categories[cate] } })
            .then((cat_resp) => {
                sub_cate_id[cate].forEach((items) => {
                    category_managment.findOne({:{ "$in":"subCategory" }}).populate("subCategory")
                        .then((subCat_resp) => {
                            if (subCat_resp) {
                                category_managment.findByIdAndUpdate(cate_id, { $set: { "subCategory.subCategories": data[cate] } }).populate("subCategory")
                                    .then((sub_detail) => {
                                        console.log(sub_detail);
                                    }).catch((err) => {
                                        res.send(err)
                                    })
                            } else {
                                const newSub = {
                                    subCategories:data[cate],
                                    lebelName:lebels[cate],
                                    color:color[cate]
                                }


                            }
                        })
                });
                { "city_id": { "$in": idList }
                // category_managment.find({"subCategory.subCategories":data})
                console.log(cat_resp)
            })
        cate = cate + 1
    });
    data.forEach(element => {
        const a = {
            subCategory: element,
            lebelName: lebels[i],
            color: color[i]
        }
        ids.push(a)
        i = i + 1
    });
    subCategory_managment.insertMany(ids)
        .then((resp) => {
            const sub_ids = []
            resp.forEach(items => {
                sub_ids.push(items._id)
            })
            category_managment.findOne({ $and: [{ programName: program }, { category: categories }] })
                .then((result) => {
                    console.log("category hai", result)
                    if (result) {
                        category_managment.findByIdAndUpdate(result._id, { $push: { subCategory: sub_ids } })
                            .then((cate_resp) => {
                                console.log(cate_resp)
                                res.send("category updated sucessful");
                            })
                    } else {
                        const new_cate = new category_managment({
                            category: categories,
                            programName: program
                        })
                        new_cate.save()
                            .then((response) => {
                                console.log(response)
                                category_managment.findByIdAndUpdate(response._id, { $push: { subCategory: sub_ids } })
                                    .then((cate_resp) => {
                                        console.log(cate_resp)
                                        res.send("category added sucessful");
                                    });
                            })
                    }
                })

        })
};

exports.read = async (req, res) => {
    category_managment.find({})
        .then((result) => {
            res.json(result)
        }).catch((err) => {
            res.send(err)
        })
};

exports.by_program_name = async (req, res) => {
    const program = req.body.program;
    category_managment.find({ programName: program }).populate("subCategory")
        .then((resp) => {
            res.json(resp);
        }).catch((err) => {
            console.log(err)
            res.send(err);
        });
};

exports.update = async (req, res) => {
    const id = req.body.id;
    const prog_name = req.body.pro_name;
    if (req.body.category) {
        category_managment.findByIdAndUpdate({ _id: id }, { $set: { category: req.body.category } })
            .then((update_resp) => {
                console.log(update_resp)
                res.send("category_managment has been updated successfully")
            }).catch((err) => {
                console.log(err)
                res.send(err)
            })
    } else {
        category_managment.findByIdAndUpdate({ _id: id }, { $set: req.body })
            .then((update_resp) => {
                console.log(update_resp)
                res.send("category_managment has been updated successfully")
            }).catch((err) => {
                console.log(err)
                res.send(err)
            })
    }

};

exports.remove = async (req, res) => {
    const id = req.body.id
    category_managment.deleteOne({ _id: id })
        .then((resp) => {
            console.log(resp)
            res.json("category_managment has been deleted successfully")
        }).catch((err) => {
            console.log(err)
            res.send(err)
        })
};