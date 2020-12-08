const mongoose = require("mongoose");

const TestingSchema = new mongoose.Schema(
    {
        fees_name:{
            type:String,
            required:true
        },
        fees_description:{
            type:String,
            required:true
        },
        program:{
            type:String,
            required:true
        },
        total_price:{
            type: Number,
            required:true
        },
        color:{
            type:String,
            required:true
        },
        image:{
            type:String
        }
    }  ,  { timestamps: true }
);

module.exports = mongoose.model("TestFees", TestingSchema);
