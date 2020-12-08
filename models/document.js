const mongoose = require('mongoose');
 
  const addfolderSchema = new mongoose.Schema({

    folder_name:{ type:String }

    
    
})

module.exports = mongoose.model("folder", addfolderSchema);


