const mongoose = require('mongoose');
 
    const subfolderSchema = new mongoose.Schema({
        folder_name:{
            type:String
        },
        subfolder_name:{
                type:Array
            }         
            
      })

module.exports = mongoose.model("folder", subfolderSchema);


