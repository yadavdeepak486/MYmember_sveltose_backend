const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const Finance_infoSchema = new mongoose.Schema(
    {
        card_type: {
            type: String,
            required: true
        },
        holder_name: {
            type: String,
            required: true
        },
        notes: {
            type: String,
        },
        default: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            required: true
        }, 
        credit_Card_type: {
            type: String,
            required: true
        },
        credit_Card_Number: {
            type: String,
            required: true
        },
         credit_cvv:{
            type: String,
            required: true
        },
        expiry_month: {
            type: String,
            required: true
        },
         expiry_year: {
            type: Number,
            required: true
        }, 
        billing_address: {
            type: String,
            required: true
        },
         country: {
            type: String,
            required: true
        }, 
        state: {
            type: String,
            required: true
        },
         city: {
            type: String,
            required: true
        },
         zip_postal: { type: String, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("FinanceInfo", Finance_infoSchema);
