const membershipModal = require('../models/membership')
const cloudinary = require("cloudinary").v2

exports.create = (req,res)=>{
    console.log(req.body)

    var membershipDetails = req.body
    var membershipObj = new membershipModal(membershipDetails);
    membershipObj.save((err,data)=>{
        if(err){
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
            var path = req.file.path;
            var filename = req.file.filename;

            cloudinary.uploader.upload(
                path,
                { public_id: `membership_image/${filename}`, tags: `membership_image` }, // directory and tags are optional
                function (err, image) {
                    if (err) return res.send(err)
                    console.log('file uploaded to Cloudinary')
                    const fs = require('fs')
                    fs.unlinkSync(path)
                    membershipModal.findByIdAndUpdate(data._id, { $set: { 'membership_profile': image.url } })
                        .then((response) => {
                            res.send('member is add with profile successfully')
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
                res.send(data);    
            }
     })
}
