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
})

module.exports = mongoose.model("folder", addfolderSchema);

