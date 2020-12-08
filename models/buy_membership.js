const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const Membershipschema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true
        },
        mactive_date: {
            type: String,
            required: true
        },
        membership_duration: {
            type: String,
            required: true
        },
        expiry_date: {
            type: String,
            required: true
        },
        register_fees: {
            type: Number,
            required: true
        }, totalp: {
            type: Number,
            required: true
        },
        dpayment: {
            type: Number,
            required: true
        }, ptype: {
            type: Number,
            required: true
        },
        balance: {
            type: Number,
            required: true
        }, payment: {
            type: String,
            required: true
        },membership_type:{
            type:String,
            required:true
        },payment_money:{
            type:Number,
            required:true
        },due_every:{
            type:Number,
            required:true
        },due_every_month:{
            type:String,
            required:true
        },pay_inout:{type:Number,required:true},
        pay_latter:{type:String,required:true}
    },
    { timestamps: true }
);

module.exports = mongoose.model("Buy_Membership", Membershipschema);
