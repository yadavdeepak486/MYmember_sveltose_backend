const mongoose = require("mongoose");

const supportSchema = new mongoose.Schema(
    {
        subject:{
            type:String,
            required:true
        },
        type:{
            type:String,
            required:true
        },
        location:{
            type:String,
            required:true
        },
       description:{
            type:String,
        },
        imageurl:{
            type:String,
        },
        date:{
            type:String
        },
        status: {
            type: String,
            default: "Open",
            enum: ["Open", "Closed", "Archived", "OnHold", "All"] 
        },
    }
);

module.exports = mongoose.model("support", supportSchema);
