const mongoose = require('mongoose');
 
    const subfolderSchema = new mongoose.Schema({

        subfolder_name:{
                type:String
            }         
            
      })

module.exports = mongoose.model("folder", subfolderSchema);


