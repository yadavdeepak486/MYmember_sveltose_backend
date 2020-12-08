const mongoose = require('mongoose');
const schema = mongoose.Schema;

var addfolderSchema = new schema({
   folder_name:{
     type:String
   },
   userId:{
     type:String
   },
   files:[{type:schema.Types.ObjectId,ref:'document'}] ,
   _id:{
     type:mongoose.Types.ObjectId
   }

})

module.exports = mongoose.model("folder", addfolderSchema);


