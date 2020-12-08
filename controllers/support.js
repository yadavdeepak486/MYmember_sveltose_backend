const { get } = require('lodash')
var supportModal = require('../models/support')
const cloudinary = require('cloudinary').v2

exports.create = (req, res) => {
    console.log(req.body,req.file)
  
    //date format set mm-dd-yy
    function getFormattedDate(date) {
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        return month + '/' + day + '/' + year;
    }
    
    cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.cloud_api_key,
    api_secret: process.env.cloud_api_secret
    })

    var filename =  req.file.filename;
    var path = req.file.path;
    console.log(filename,path)

    cloudinary.uploader.upload(
        path,
        { public_id: `add_student/ticket/${filename}`,tags: `add_student` },
     
        function(err,image){
            if(err) return res.send(err)
            console.log('file upload coludinary')

            const fs = require('fs')
            fs.unlinkSync(path)
            
            var imageurl = image.url;

            var newdate =getFormattedDate(new Date()); 

            var supportDetails = {}
            supportDetails.subject = req.body.subject;
            supportDetails.type = req.body.type;
            supportDetails.location = req.body.location;
            supportDetails.description = req.body.description;
            supportDetails.imageurl = imageurl;
            supportDetails.date = newdate;
            
            var supportObj = new supportModal(supportDetails)

            supportObj.save((err,data)=>{
            if(err){
              res.send({error:'ticket is not add'})
            }
             else {
              res.send({ msg:'ticket add successfully' })
                }
            })
        }
    )
    
}

exports.read = (req,res)=>{
    supportModal.find().exec((err,data)=>{
        if(err){
            res.send({ error : 'ticket list not found' })
        }
        else{
            if(data.length > 0){
                res.send(data) 
            }
            else{
                res.send({ error : 'list is empty' })
            }
        }
    })
}
