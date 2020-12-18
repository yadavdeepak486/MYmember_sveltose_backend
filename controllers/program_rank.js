const program = require("../models/program");
const manage_rank = require("../models/program_rank");
const user = require("../models/user")
// var s = require("../uploads")


exports.create = (req, res) => {
    var proId = req.params.proId;
    const prog = new manage_rank(req.body)
    prog.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        else{
        if(req.file){
        const cloudenary = require("cloudinary").v2
        cloudenary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.cloud_api_key,
            api_secret: process.env.cloud_api_secret
        });
        console.log(req.file)
        const path = req.file.path
        const uniqueFilename = new Date().toISOString()
        cloudenary.uploader.upload(
            path,
            { public_id: `program_rank/${uniqueFilename}`, tags: `program_rank` }, // directory and tags are optional
            function (err, image) {
                if (err) return res.send(err)
                console.log('file uploaded to Cloudinary')
                const fs = require('fs')
                fs.unlinkSync(path)
                manage_rank.findByIdAndUpdate(data._id, { $set: { rank_image: image.url } })
                .exec((err,data)=>{
                    console.log(data)
                    if(err){
                        res.send({error:'image is not add in rank'})
                    }
                    else{
                        console.log(data)
                        program.findByIdAndUpdate({ _id:proId },{$push:{program_rank : data._id}})
                        .exec((err,data)=>{
                            if(err){
                                res.send({error:'rank is not add in program'})
                            }
                            else{
                                res.send({error:'rank is add in program'})
                            }
                        })
                    }
                })            
            }
          );
        }
        else{
            program.findByIdAndUpdate({ _id:proId },{$push:{program_rank : data._id}})
            .exec((err,data)=>{
                if(err){
                    res.send({error:'rank is not add in program'})
                }
                else{
                    res.send({error:'rank is add in program'})
                }
            })
        }
    }
    });
};


exports.read = (req, res) => {
    // const uid = req.body.uid;
    manage_rank.find()
        .then((category) => {
            res.json(category)
        }).catch((err) => {
            console.log(err);
            res.send(err)
        })
};

exports.program_Info = async (req, res) => {
    const id = req.params.program_rank_id;
    manage_rank.findById(id)
        .then((result) => {
            res.json(result)
        }).catch((err) => {
            res.send(err)
        });
};
exports.update = (req, res) => {
    const program_rank_id = req.params.program_rank_id;
    manage_rank.updateOne({ _id: program_rank_id }, req.body)
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
                    { public_id: `program_rank/${uniqueFilename}`, tags: `program_rank` }, // directory and tags are optional
                    function (err, image) {
                        if (err) return res.send(err)
                        console.log('file uploaded to Cloudinary')
                        const fs = require('fs')
                        fs.unlinkSync(path)
                        manage_rank.findByIdAndUpdate(program_rank_id, { $set: { rank_image: image.url } })
                            .then((response) => {
                                res.json({msg:'program rank is update with image'})
                                console.log('image is update and')
                            });
                    }
                );
            } else {
                res.send(result);
                console.log(result);
            }
            // res.send(result);
            // console.log(result);
        }).catch((err) => {
            console.log(err);
            res.send(err);
        })
}


exports.remove = (req, res) => {
    const program_rank_id = req.params.program_rank_id;
    manage_rank.remove({ _id:program_rank_id },(err,data)=>{
        if(err){
            res.send({error:'program rank is not delete'})
        }
        else{
            program.update({"program_rank":program_rank_id},{$pull:{"program_rank":program_rank_id}},
            function(err,data){
                if(err){
                    res.send({error:'program rank is not delete from program'})
                }
                else{
                    res.send({msg:'program rank is delete from program'})
                }
            })
        }
    })
};


