const program = require("../models/program");

exports.create = (req, res) => {
    console.log(req.body,req.file)
    var prog = new program(req.body)
    
    prog.save((err, data) => {
        console.log(data)
        if (err) {
           res.send({error:'program is not create'})
           console.log(err)
        }
        if(req.file){
        const cloudenary = require("cloudinary").v2
        cloudenary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.cloud_api_key,
            api_secret: process.env.cloud_api_secret
        });

        var filename = req.file.originalname;
        var path = req.file.path;
        var uniquefilename = filename+(Date.now())

        cloudenary.uploader.upload(
            path,
            { public_id: `program/${uniquefilename}`, tags: `program` }, // directory and tags are optional
            function (err, image) {
                if (err) return res.send(err)
                console.log('file uploaded to Cloudinary')
                const fs = require('fs')
                fs.unlinkSync(path)
                program.findByIdAndUpdate(data._id, { $set: { program_image: image.url } })
                    .then((response) => {
                        res.send("data and image added successfully")
                    });
            }
        );
        }else{
            res.send("data added successfully")
        }
    });
};


exports.read = (req, res) => {
    program.find()
        .then((category) => {
            res.json(category)
        }).catch((err) => {
            console.log(err);
            res.send(err)
        })
};

exports.programs_detail = (req, res) => {
    var id = req.params.proId
    console.log(id)
    program.findById(id)
   .populate('program_category')
   .populate('program_rank')
   .exec((err,data)=>{
                if(err){
                    console.log(err)
                    res.send({error:'category is not populate'})
                }
                else{
                    res.send(data)
            }
        })
};

exports.update = (req, res) => {
    const uid = req.params.proId;
    program.updateOne({ _id: uid }, req.body)
        .then((result) => {
            if (req.file) {
                const cloudenary = require("cloudinary").v2
                cloudenary.config({
                    cloud_name: process.env.cloud_name,
                    api_key: process.env.cloud_api_key,
                    api_secret: process.env.cloud_api_secret
                });
                var filename = req.file.originalname;
                var path = req.file.path;
                var uniquefilename = filename+(Date.now())
                
                cloudenary.uploader.upload(
                    path,
                    { public_id: `program/${uniquefilename}`, tags: `program` }, // directory and tags are optional
                    function (err, image) {
                        if (err) return res.send(err)
                        console.log('file uploaded to Cloudinary')
                        const fs = require('fs')
                        fs.unlinkSync(path)
                        program.findByIdAndUpdate(uid, { $set: { program_image: image.url } })
                            .then((response) => {
                                res.json(response)
                            });
                    }
                );
            } else {
                res.send(result);
                console.log(result);
            }
        }).catch((err) => {
            console.log(err);
            res.send(err);
        })
}


exports.remove = (req, res) => {
    const uid = req.params.proId;
    program.remove({ _id: uid })
        .then((resp) => {
            console.log(resp);
            res.json({ data: resp, message: "program deleted succesfuly" });
        }).catch((err) => {
            res.send(err)
        })
};




//image kid id
//21tx44do9br
//cloudeny API ky 914449541412924
// API SECRET - ZEHWWVyB7gf4Gj5FPuWPucmAtZU
// envoronmnt variable - CLOUDINARY_URL=cloudinary://914449541412924:ZEHWWVyB7gf4Gj5FPuWPucmAtZU@sveltose-com
// cloud name -sveltose-com