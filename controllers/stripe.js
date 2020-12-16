const { env } = require("process");
const stripe = require("../models/stripe");
// var s = require("../uploads")
const cloudenary = require("cloudinary").v2

exports.create = (req, res) => {
    const prog = new stripe(req.body)
    prog.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        else{
        if(req.file){
        cloudenary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.cloud_api_key,
            api_secret: process.env.cloud_api_secret
        });
        console.log(req.file)

        var filename = req.file.originalname;
        var path = req.file.path;

        var uniquefilename = filename+(Date.now())
        console.log(uniquefilename)
        
        cloudenary.uploader.upload(
            path,
            { public_id: `blog/${uniquefilename}`, tags: `blog` }, // directory and tags are optional
            function (err, image) {
                console.log(image)
                if (err) return res.send(err)
                console.log('file uploaded to Cloudinary')
                const fs = require('fs')
                fs.unlinkSync(path)
                stripe.findByIdAndUpdate(data._id, { $set: { 'stripe_image': image.url } })
                    .then((response) => {
                        res.send("stripe details added and image")
                    });
                }
            );
        }
             else{
                res.send("stripe details added")
          }
        }
    });
};


exports.read = (req, res) => {
    // const uid = req.body.uid;
    stripe.find()
        .then((category) => {
            res.json(category)
        }).catch((err) => {
            console.log(err);
            res.send(err)
        })
};

exports.update = (req, res) => {
    const uid = req.params.stripeId;

    stripe.updateOne({ _id: uid }, req.body)
        .then((result) => {
            if (req.file) {
                const cloudenary = require("cloudinary").v2
                cloudenary.config({
                    cloud_name: process.env.cloud_name,
                    api_key: process.env.cloud_api_key,
                    api_secret: process.env.cloud_api_secret
                });
                const path = req.file.path
                const uniqueFilename = new Date().toISOString()
                cloudenary.uploader.upload(
                    path,
                    { public_id: `stripe/${uniqueFilename}`, tags: `stripe` }, // directory and tags are optional
                    function (err, image) {
                        if (err) return res.send(err)
                        console.log('file uploaded to Cloudinary')
                        const fs = require('fs')
                        fs.unlinkSync(path)
                        stripe.findByIdAndUpdate(uid, { $set: { stripe_image: image.url } })
                            .then((response) => {
                                res.json(response)
                            });
                    }
                );
            } else {
                res.send(result);
                console.log(result);
            }
            // console.log(result);
        }).catch((err) => {
            console.log(err);
            res.send(err);
        });
}
exports.stripe_detail = async (req, res) => {
    const id = req.params.stripeId
    stripe.findById(id)
        .then((result) => {
            res.json(result)
        }).catch((err) => {
            res.send(err)
        });
};

exports.remove = (req, res) => {
    var uid = req.params.stripeId;
    console.log('userid',uid)
    stripe.remove({ _id: uid })
        .then((resp) => {
            console.log(resp);
            res.json({ data: resp, message: "stripe deleted succesfuly" });
        }).catch((err) => {
            res.send(err)
        })
};




