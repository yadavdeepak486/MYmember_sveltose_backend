const addfolderModal = require('../models/document'); // folder create modal

const documentModal = require('../models/create_document') // create document modal

exports.createFolder = (req,res) =>{
    var foldername = req.body.folder_name;
    var userId = req.params.userID;   
    console.log(foldername,userId)
    
    var folderdetails ={}
    folderdetails.folder_name = foldername;
    folderdetails.userId = userId;

    console.log(folderdetails)

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
    var documentDetails = {}
    
    documentDetails.folder_name = req.body.folder_name;
    documentDetails.document_name = req.body.doc_name;
    documentDetails.file =req.file.filename;

    
    var documentObj = new documentModal(documentDetails);
     
    documentObj.save((err,document)=>{
        console.log(document)
         if(err){
             res.send({error:'document not upload'});
         }
         else{
          console.log(foldername)
              addfolderModal.find({"folder_name":foldername }).exec((err,folder)=>{
              console.log(folder[0]._id, document.file)

              addfolderModal.findByIdAndUpdate({_id:folder[0]._id},{ $push:{files:document._id} }).exec((err,data)=>{

                    if(err){
                        res.send({error:'file not push'})
                    }
                    else{
                        res.send({msg:" document upload"})
                    }                  
              })
        })
     
     }
   })
}

exports.folderlist =(req,res)=>{
    var id = req.params.id;
    console.log(id)
    addfolderModal.findOne({_id:id})
    .populate('files')
    .exec((err,data)=>{
        res.send(data)
        console.log(err)
    })
}

