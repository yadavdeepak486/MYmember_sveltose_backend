const mongoose = require("mongoose");
var schema = mongoose.Schema;
var pcategorySchema = new schema(
    {
        category:{
            type: String,
            required: true,

        },programName:{
            type: String,
            maxlength: 32,
        },
        program_subcategory:[{
            type:schema.Types.ObjectId,
            ref:'psubcategory'
        }]
    },
);

module.exports = mongoose.model("pcategory", pcategorySchema);
