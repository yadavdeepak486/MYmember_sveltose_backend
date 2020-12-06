const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const organization_setup = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true
        },
        subject: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        expenses: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },image:{
            type:String,
            default:''
        },
        date:{
            type:String,
            required:true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Expense", organization_setup);
