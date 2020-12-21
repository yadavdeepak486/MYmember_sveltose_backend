const { functions } = require('lodash');
const Stripe = require("../models/stripe");
var addmemberModal = require('../models/addmember')
const cloudenary = require("cloudinary").v2

exports.addmember = (req, res) => {
    var memberdetails = req.body;
    console.log(memberdetails);
    console.log(req.file)

    var memberObj = new addmemberModal(memberdetails);
    console.log(memberObj)
    memberObj.save(function (err, data){
        if(err){
            res.send({error:'member is not add'})
        }
        else{
        if (req.file){
            cloudenary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.cloud_api_key,
                api_secret: process.env.cloud_api_secret
            });
            var path = req.file.path;
            var filename = req.file.originalname;
            var uniqueFilename = filename+(Date.now())

            cloudenary.uploader.upload(
                path,
                { public_id: `member_image/${uniqueFilename}`, tags: `member_image` }, // directory and tags are optional
                function (err, image) {
                    if (err) return res.send(err)
                    console.log('file uploaded to Cloudinary')
                    const fs = require('fs')
                    fs.unlinkSync(path)
                    addmemberModal.findByIdAndUpdate(data._id, { $set: { memberprofileImage: image.url } })
                        .then((response) => {
                            res.send({msg:'member is add with profile successfully'})
                    });
                }
            );
        }
        else {
            console.log(err)
            res.send({msg:'member is add successfully'})
        }
    }
    })
}

exports.read = (req, res) => {
    addmemberModal.find()
                  .populate('membership_details')  
                  .exec((err, data) => {
        if (err) {
            res.send({ error: 'member list is not found' })
        }
        else {
            if (data.length > 0) {
                res.send(data)
            }
            else {
                res.send({ msg: 'member list is empty' })
            }

        }
    })

}
exports.studentinfo = (req, res) => {
    var studentinfo = req.params.StudentId;
    addmemberModal.findById(studentinfo)
    .populate('membership_details') 
    .populate('finance_details') 
    .exec((err, data) => {
        if (err) {
            res.send({ error: 'member is not found' })
        }
        else {
            res.send(data)
        }
    })
}

exports.deletemember = (req, res) => {
    console.log('id', req.params)
    var memberID = req.params.memberID;
    addmemberModal.findByIdAndDelete(memberID).exec((err, data) => {
        if (err) {
            res.send({ error: 'member is not delete' })
        }
        else {
            res.send({ msg: 'member is delete' })
        }
    })
}

exports.updatemember = (req, res) => {
    var memberID = req.params.memberID;
    console.log(req.body)
    addmemberModal.updateOne({ _id : memberID },req.body).exec((err, data) => {
        if (err) {
            res.send({ error: 'member is not update' })
        }
        else{
        if(req.file){
            cloudinary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.cloud_api_key,
                api_secret: process.env.cloud_api_secret
            });
            var path = req.file.path;
            var filename = req.file.originalname;
            var uniqueFilename = filename+(Date.now())

            cloudinary.uploader.upload(
                path,
                { public_id: `member_image/${uniqueFilename}`, tags: `member_image` }, // directory and tags are optional
                function (err, image) {
                    if (err) return res.send(err)
                    console.log('file uploaded to Cloudinary')
                    const fs = require('fs')
                    fs.unlinkSync(path)
                    addmemberModal.findByIdAndUpdate(data._id, { $set:{memberprofileImage: image.url } })
                        .then((response) => {
                            res.send('member details and profile is update')
                    });
                }
            );

        }
        else {
            res.send({ msg: 'member is update' })
        }
    }
    })
}

exports.addStripe = (req,res) => {
    var stripeId = req.params.stripeId;
    var studentId = req.params.studentId;   
  
    Stripe.findById(stripeId).exec((err,data)=>{
        if(err){
            res.send({error:'stripe data not found'})
        }
        else{
           var stripeData = data;
           console.log(stripeData)
           addmemberModal.findByIdAndUpdate({_id:studentId},{$push:{stripe : stripeData._id }}).exec((err,data)=>{
               if(err){
                   res.send({error:'stripe is not add in student'})
               }
               else{
                res.send({error:'stripe is add in student'})
              }
           })
       }
    })
}
    
    
