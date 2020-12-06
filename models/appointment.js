const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const appointSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        event: {
            type: String,
            required: true
        },
        select_One: {
            type: String,
            required: true
        },
        start_date: {
            type: Date,
            required: true
        },
        end_date: {
            type: Date,
            required: true
        }, start_time: {
            type: String,
            required: true
        },
        end_time: {
            type: String,
            required: true
        }, notes: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointSchema);
