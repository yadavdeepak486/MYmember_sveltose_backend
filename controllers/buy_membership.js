const membershipModal = require("../models/membership");
const buyMembership = require("../models/buy_membership");
var addmemberModal = require('../models/addmember')
const { errorHandler } = require('../helpers/dbErrorHandler');

// exports.Create = async (req, res) => {
//     const task = new buy_membership(req.body);
//     task.save((err, data) => {
//         if (err) {
//             return res.status(400).json({
//                 error: errorHandler(err)
//             });
//         }
//         console.log(data)
//         res.send("membership Info has been added successfully");
//     });
// };

// exports.read = async (req, res) => {
//     buy_membership.find({})
//         .then((result) => {
//             res.json(result)
//         }).catch((err) => {
//             res.send(err)
//         })
// };
// exports.membership_Info = async (req, res) => {
//     const id = req.params.membershipId
//     buy_membership.findById(id)
//         .then((result) => {
//             res.json(result)
//         }).catch((err) => {
//             res.send(err)
//         })
// };
// exports.update = async (req, res) => {
//     const id = req.params.membershipId;
//     buy_membership.updateOne({ _id: id }, { $set: req.body })
//         .then((update_resp) => {
//             console.log(update_resp)
//             res.send("membership Info  has been updated for this student successfully")
//         }).catch((err) => {
//             console.log(err)
//             res.send(err)
//         })
// };

// exports.remove = async (req, res) => {
//     const id = req.params.membershipId
//     buy_membership.deleteOne({ _id: id })
//         .then((resp) => {
//             console.log(resp)
//             res.json("membership Info has been deleted for this student successfully")
//         }).catch((err) => {
//             console.log(err)
//             res.send(err)
//         })
// };


exports.create = (req,res)=>{
    var studentId = req.params.studentId;
    
    console.log(req.body)
        if(req.body.ptype == 'cash' || req.body.ptype == 'check'){
           var Membership = new buyMembership(req.body);
           Membership.save((err,data)=>{
                if(err){
                    res.send({error:'membership not buy'})
                }
                else{
                    addmemberModal.findByIdAndUpdate({_id:studentId},{$push:{membership_details: data._id}})    
                                  .exec((err,data)=>{
                                      if(err){
                                          res.send({error:'membership is not add in student'})
                                      }
                                      else{
                                          res.send({error:'membership is add in student'})
                                    }
                        })  
                }
            })
        }
    else if(req.body.ptype == 'card'){

    }
        
}

exports.membership_info = (req,res)=>{
    var membershipId = req.params.membershipId
    membershipModal.findById(membershipId).exec((err,data)=>{
        if(err){
            res.send({error:'membership is not found'});
        }
        else{
            res.send(data);
        }
    })
}