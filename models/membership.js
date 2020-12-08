const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({

    membership_name:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    membership_type:{
        type:String,
        
    },
    duration_time:{
        type:String,
        
    },
    duration_type:{
        type:String,
        
    },
    total_price:{
        type:String,
        
    },
    down_payment:{
        type:String,
        
    },
    payment_type:{
        type:String,
        
    },
    balance:{
        type:String,
        
    },
    payment:{
        type:String,
        
    },
    payments_types:{
        type:String,
        
    },
    pay:{
        type:String,
        
    },
    due_every:{
        type:String,
        
    },
    membership_profile:{
        type:String,
    }
})
module.exports = mongoose.model('membership',membershipSchema)