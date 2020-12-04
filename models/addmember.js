const mongoose = require("mongoose");

const addmemberSchema = new mongoose.Schema(
    {
        studentType:{
            type:String,
            required:true
        },
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        status:{
            type: String,
        },
        dob:{
            type:String,
            required:true
        },
        age:{
            type:String,
            required:true
        },
        gender:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,  
            unique: true
        },
        primaryPhone:{
            type:String,
            required:true
        },
        secondaryNumber:{
            type:String
        },
        address:{
            type:String,
            require:true,
            
        },
        country:{
            type:String,
            require:true
        },
        state:{
            type:String,
            require:true
        },
        zipPostalCode:{
            type:String
        },
        notes:{
            type:String
        },
        studentBeltSize:{
            type:String,
            require:true
        },
        program:{
            type:String,
            required:true
        },
        startDate:{
            type:String,
            required:true
        },
        expiredDate:{
            type:String,
            required:true
        },
        lastPromotion:{
            type:String
        },
        location:{
            type:String
        },
        ID:{
            type:String,
            required:true
        },
        dan:{
            type:String
        },
        customId:{
            type:String,
            required:true,
        },
        leadsTracking:{
            type:String,
            required:true
        },
        staff:{
            type:String,
            required:true
        },
        intrested:{
            type:String,
            required:true
        },
        school:{
            type:String,
            require:true
        },
        addToGroup:{
            type:String
        },
        familyName:{
            type:String
        }
    }

);

module.exports = mongoose.model("member", addmemberSchema);