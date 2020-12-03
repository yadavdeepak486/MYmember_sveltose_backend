const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const programSchema = new mongoose.Schema(
    {
        programName: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        rank_name: {
            type: String,
            required: true
        },
        day_to_ready: {
            type: Number,
            required:true
        },
        lession_to_ready: {
            type: Number,
            required: true
        },
        rank_order: {
            type: String,
            required:true
        },
        rank_image: {
            // data: Buffer,
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Program_rank", programSchema);
