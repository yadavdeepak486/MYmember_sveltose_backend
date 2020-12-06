const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
    {
        program_name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        class_name: { type: String, required: true },
        start_date: {
            type: Date,
            required: true
        }, end_date: {
            type: Date,
            required: true
        }, start_time: {
            type: String,
            required: true
        }, end_time: {
            type: String,
            required: true
        }, repeat_weekly_on: { type: String, required: true }

    },
    { timestamps: true }
);

module.exports = mongoose.model("Class_schedule", scheduleSchema);
