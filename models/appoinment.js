const mongoose = require('mongoose')

const appoinmentSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            require:true
        },
        category:{
            type:String,
            require:true
        },
        subcategory:{
            type:String,
            require:true
        },
        start_date:{
            type:String,
            require:true
        },
        end_date:{
            type:String,
            require:true
        },
        start_time:{
            type:String,
            require:true
        },
        end_time:{
            type:String,
            require:true
        }

    }
)

module.exports = mongoose.model("appoinment",appoinmentSchema);
