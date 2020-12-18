const finance_info = require("../models/finance_info");
const addmemberModal = require('../models/addmember');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.Create = async (req, res) =>{
    const studentId = req.params.studentId
    const body_info = req.body
    console.log(req.body)
    const finance = new finance_info(body_info);
    finance.save((err, data) => {
        console.log(err)
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        else{
            console.log(data)
            addmemberModal.findByIdAndUpdate({_id:studentId},{$push:{ finance_details: data._id }})
            .exec((err,data)=>{
                 if(err){
                     res.send({error:'finance info is not add in student'})
                }
                 else{
                    res.send({msg:'finance info is add in student'})
                }   
            })
        }
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

exports.finance_Info = (req, res) => {
    const id = req.params.financeId
    finance_info.findById(id)
        .then((result) => {
            res.json(result)
        }).catch((err) => {
            res.send(err)
        })
};


exports.update = (req, res) => {
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

exports.remove = (req, res) => {
  const id = req.params.financeId;
  finance_info.deleteOne({ _id: id })
        .then((resp) => {
        addmemberModal.update({"finance_details":id},{$pull:{"finance_details":id}},
        function(err,data){
             if(err){
                 res.send({error:'finance info is not delete in student'})
            }
             else{
                res.send({msg:'finance info is delete in student'})
            }
        })  
        }).catch((err) => {
            console.log(err)
            res.send(err)
        })
};
