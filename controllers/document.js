const addfolderModal = require('../models/document'); // folder create modal
const documentModal = require('../models/create_document') // create document modal
const cloudinary = require("cloudinary").v2

var fs = require('fs');
var path = require('path')



exports.createFolder = (req,res) =>{
    var folder_name = req.body.folder_name;
    var userId = req.params.userID;   
    console.log(folder_name,userId)
    
    var folderdetails ={}
    folderdetails.folder_name = folder_name;
    folderdetails.userId = userId;
    var folderObj = new addfolderModal(folderdetails);

    console.log(folderObj)
    folderObj.save((err,data)=>{
            if(err){
                res.send('folder is not create')
            }
            else{
                res.send(data)
            }
    })
}

exports.createDocument = (req,res)=>{
    var foldername = req.body.folder_name;
    var file_name  = req.files.name + Date.now()
    console.log(file_name);
    
    // var documentDetails = {}
    
    // documentDetails.folder_name = req.body.folder_name;
    // documentDetails.document_name = req.body.doc_name;
    // documentDetails.file =req.files.name;
    
    // console.log(req.files)

    
//     var documentObj = new documentModal(documentDetails);
     
//     documentObj.save((err,document)=>{
//         console.log(document)
//            if(err){ 
//                 console.log('document not upload')
//            }   else{

//               addfolderModal.find({"folder_name":foldername }).exec((err,folder)=>{
//               console.log(folder[0]._id, document.file)

//               addfolderModal.findByIdAndUpdate({_id:folder[0]._id},{ $push:{files:document._id} }).exec((err,data)=>{

//                     if(err){
//                         res.send({error:'file not push'})
//                     }
//                     else{
//                         res.send({msg:" document upload"})
//                     }                  
//               })
//         })
    
//          }
//    })
}

exports.folderlist =(req,res)=>{
    var id = req.params.id;
    console.log(id)
    addfolderModal.findById(id)
    .populate('files')
    .exec((err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(data)
        }
    })
}

exports.read = (req,res)=>{
    
}

