const mongoose = require('mongoose');
  var documentSchema = new mongoose.Schema({

  file:{
     type:String
   },
   document_name:{
     type:String
   },
   folder_name:{
    type:String
   }
})

module.exports = mongoose.model("document", documentSchema);

