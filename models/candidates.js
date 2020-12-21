const mongoose = require('mongoose');
const schema = mongoose.Schema;

const candidateSchema = new schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    program:{
        type:String
    },
    category:{
        type:String
    },
    stripe:[{
        type:schema.Types.ObjectId,
        ref:'Stripe'
    }],
    memberprofileImage:{
        type:String
    },
    expiry_date:{
        type:String
    }
})

module.exports = mongoose.model('candidate',candidateSchema)