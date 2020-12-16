const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const stripeSchema = new mongoose.Schema(
    {
        stripeName: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        color: {
            type: String,
            required: true
        },
        lable: {
            type: String,
            required:true
        },
        total_stripe: {
            type: String,
            required: true
        },
        progression: {
            type: String,
            required:true
        },
        candidate: {
            type: String,
            required:true
        },
        stripe_image: {
            // data: Buffer,
            type: String
        },
        age_requirement: {
            required: true,
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Stripe", stripeSchema);
