const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        subject: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        todoDate: {
            type: String,
            required: true
        }, todoTime: {
            type: String,
            required: true
        }, tag: {
            type: String,
            required: true
        }, status: {
            type: String,
            required: true
        }, notes: { type: String, required: true }

    },
    { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
