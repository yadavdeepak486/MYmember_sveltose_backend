const mongoose = require("mongoose")
const { modelName } = require("./appoinment")
var eventSchema = new mongoose.Schema({

    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    notes:{
        type:String
    }
 })
 module.exports = mongoose.model('event',eventSchema)