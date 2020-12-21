const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const Membershipschema = new mongoose.Schema(
    {
        membership_name: {
            type: String,
            required: true
        },
        mactive_date: {
            type: String,
            required: true
        },
        membership_duration:{
            type: Number,
            required: true
        },
        expiry_date:{
            type: String,
            required: true
        },
        register_fees: {
            type: Number,
            required: true
        },
        totalp: {
            type: Number,
            required: true
        },
        dpayment: {
            type: Number,
            required: true
        },
        ptype: {
            type: String,
            required: true
        },
        balance: {
            type: Number,
            required: true
        },
        payment_time: {
            type: Number,
            required: true
        },
        payment_type: {
            type: String,
            required: true
        },
        payment_money:{
            type:Number,
            required:true
        },
        due_every:{
            type:Number,
            required:true
        },
        due_every_month:{
            type:String,
            required:true
        },
        pay_inout:{type:String,required:true},

        pay_latter:{type:String,required:true},

        check_number:{
            type:String,
        },
        card_number:{
            type:String
        },
        card_holder_name:{
            type:String
        },
        cvv_number:{
            type:String
        },
        expiry_date:{
            type:String
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Buy_Membership", Membershipschema);
