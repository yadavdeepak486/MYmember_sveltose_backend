const addfolderModal = require('../models/document');

exports.createFolder = (req,res) =>{
    
    var foldername = req.body;
        var folderObj = new addfolderModal(foldername);
        folderObj.save((err,data)=>{
            if(err){
                res.send('folder is not create')
            }
            else{
                res.send(data)
            }
        })
}

exports.createSubfolder = (req,res) =>{
        var subfoldername = req.body;   
        var folderId = req.params;               
}