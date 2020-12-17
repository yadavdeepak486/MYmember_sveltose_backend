const membershipModal = require('../models/membership')
const cloudinary = require("cloudinary").v2

exports.create = (req,res)=>{
    console.log(req.body,req.file)

    var membershipDetails = req.body
    var membershipObj = new membershipModal(membershipDetails);
    membershipObj.save((err,data)=>{
        if(err){
            console.log(err)
            res.send({error :'membership not add'})
        }
        else{
        if(req.file){
            console.log(data,req.file)
            cloudinary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.cloud_api_key,
                api_secret: process.env.cloud_api_secret
            });

            var filename = req.file.originalname;
            var path = req.file.path;
            var uniquefilename = filename+(Date.now())

            cloudinary.uploader.upload(
                path,
                { public_id: `membership_image/${uniquefilename}`, tags: `membership_image` }, // directory and tags are optional
                function (err, image) {
                    if (err) return res.send(err)
                    console.log('file uploaded to Cloudinary')
                    const fs = require('fs')
                    fs.unlinkSync(path)
                    membershipModal.findByIdAndUpdate(data._id, { $set: { 'membership_profile': image.url } })
                        .then((response) => {
                            res.send({msg : 'membership is add with profile successfully'})
                    });
                }
            );
        }
        else{
            res.send({msg: 'membership is add successfully'})
        }
    }
 })
}

exports.read =(req,res)=>{
        membershipModal.find().exec((err,data)=>{
            if(err){
                res.send({error:'membership list is not find'});
            }
            else{
                if(data.length>0){
                    res.send(data);    
                }
                else{
                    res.send({msg:'membership list is empty'})
                }
            }
     })
}

exports.membershipInfo =(req,res)=>{
    var membershipId = req.params.membershipId;
    membershipModal.findById(membershipId).exec((err,data)=>{
        if(err){
            res.send({error:'membership data not found'});
        }
        else{
            res.send(data);
        }
    })
}

exports.remove = (req,res)=>{
    var membershipId = req.params.membershipId;
    membershipModal.findByIdAndDelete(membershipId,(err,data)=>{
        if(err){
            res.send({error:'membership is not delete'})
        }
        else{
            res.send({error:'membership is delete successfully'})
        }
    })
}

exports.membershipUpdate =(req,res)=>{
    var membershipId = req.params.membershipId;
    console.log(membershipId)
    console.log(req.body)
    membershipModal.findByIdAndUpdate(membershipId, req.body).exec((err,data)=>{
        if(err){
            res.send({error:'membership is not update'})
        }
        else{
            if(req.file){
                console.log(data,req.file)
                cloudinary.config({
                    cloud_name: process.env.cloud_name,
                    api_key: process.env.cloud_api_key,
                    api_secret: process.env.cloud_api_secret
                });
    
                var filename = req.file.originalname;
                var path = req.file.path;
                var uniquefilename = filename+(Date.now())
    
                cloudinary.uploader.upload(
                    path,
                    { public_id: `membership_image/${uniquefilename}`, tags: `membership_image` }, // directory and tags are optional
                    function (err, image) {
                        if (err) return res.send(err)
                        console.log('file uploaded to Cloudinary')
                        const fs = require('fs')
                        fs.unlinkSync(path)
                        membershipModal.findByIdAndUpdate(data._id, { $set: { 'membership_profile': image.url } })
                            .then((response) => {
                                res.send({msg:'membership is update with profile successfully'})
                        });
                    }
                );
            }
            else{
                res.send({msg:'membership is update successfully'})
            }
        }
    })
}