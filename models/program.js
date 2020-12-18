const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Schema;

const schema = mongoose.Schema;
const programSchema = new schema(
    {
        programName: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique:true
        },
        color: {
            type: String,
            required: true
        },
        lable: {
            type: String,
            required:true
        },
        total_rank: {
            type: String,
            required: true
        },
        progression: {
            type: String,
            required:true
        },
        type: {
            type: String,
            required:true
        },
        program_image: {
            type: String
        },
        requirement: {
            required: true,
            type: String
        },
        userId:{
            type:String 
        },
        program_category:[{
            type: schema.Types.ObjectId,
            ref:"pcategory"
        }],
        program_rank:[{
            type:schema.Types.ObjectId,
            ref:"Program_rank"
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Program", programSchema);
