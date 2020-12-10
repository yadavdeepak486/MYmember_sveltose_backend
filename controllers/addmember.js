const { functions } = require('lodash');
var addmemberModal = require('../models/addmember')
const cloudinary = require("cloudinary").v2

exports.addmember = (req, res) => {
    var memberdetails = req.body;
    // console.log('add member run',memberdetails)

    var memberObj = new addmemberModal(memberdetails);
    console.log(memberObj, req.file)
    memberObj.save(function (err, data) {
        if(err){
            res.send({ error: 'member is not add' })
        }
        if(data.length > 0){
        if (req.file) {
            cloudinary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.cloud_api_key,
                api_secret: process.env.cloud_api_secret
            });
            var path = req.file.path;
            var filename = req.file.filename;

            cloudinary.uploader.upload(
                path,
                { public_id: `member_image/${filename}`, tags: `member_image` }, // directory and tags are optional
                function (err, image) {
                    if (err) return res.send(err)
                    console.log('file uploaded to Cloudinary')
                    const fs = require('fs')
                    fs.unlinkSync(path)
                    addmemberModal.findByIdAndUpdate(data._id, { $set: {memberprofileImage: image.url } })
                        .then((response) => {
                            res.send('member is add with profile')
                    });
                }
            );
        }
    }
        else {
            res.send('member is add')
        }
    })

}

exports.read = (req, res) => {
    addmemberModal.find().exec((err, data) => {
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

exports.memberinfo = (req, res) => {
    console.log('id', req.params)
    var memberID = req.params.memberID;
    console.log(memberID)
    addmemberModal.findById(memberID).exec((err, data) => {
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
    console.log('id', req.params)
    var memberID = req.params.memberID;
    var data = req.body
   
    addmemberModal.findByIdAndUpdate(memberID, {
        studentType: data.studentType,
        firstName: data.firstName,
        lastName: data.lastName,
        dob: data.dob,
        age: data.age,
        gender: data.gender,
        email: data.email,
        primaryPhone: data.primaryPhone,
        secondaryNumber: data.secondaryNumber,
        address: data.address,
        country: data.country,
        state: data.state,
        zipPostalCode: data.zipPostalCode,
        studentBeltSize: data.studentBeltSize,
        program: data.program,
        startDate: data.startDate,
        expiredDate: data.expiredDate,
        lastPromotion: data.lastPromotion,
        location: data.location,
        ID: data.ID,
        dan: data.dan,
        customId: data.customId,
        leadsTracking: data.leadsTracking,
        staff: data.staff,
        intrested: data.intrested,
        school: data.schoool,
        addToGroup: data.addToGroup,
        familyName: data.familyName
    }).exec((err, data) => {
        if (err) {
            res.send({ error: 'member is not update' })
        }
        if(req.file){
            cloudinary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.cloud_api_key,
                api_secret: process.env.cloud_api_secret
            });
            var path = req.file.path;
            var filename = req.file.filename;

            cloudinary.uploader.upload(
                path,
                { public_id: `member_image/${filename}`, tags: `member_image` }, // directory and tags are optional
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
    })
}