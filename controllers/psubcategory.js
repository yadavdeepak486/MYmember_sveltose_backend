const psubcategory = require("../models/psubcategory");
const pcategory = require("../models/pcategory");
const { deleteOne, $where } = require("../models/psubcategory");

exports.create = (req, res) => {
    console.log(req.body)

    var categoryId = req.params.catId;
    var category = req.body.category;
    var subcategoryDetails = category.subcatdetails;

    for (let row of subcategoryDetails) {
        obj = {
            subcategory: row.subcategoryname,
            color: row.color,
            lable: row.lable,
            category: category.name
        }
        var psubcategoryObj = new psubcategory(obj)
        console.log(psubcategoryObj)
        psubcategoryObj.save((err, data) => {
            if (err) {

                res.send({ error: 'subcategory not add' })
            }
            else{
                
                pcategory.findByIdAndUpdate({ _id: categoryId }, { $push: { program_subcategory: data._id } })
                    .exec((err, data) => {
                        if (err) {
                            res.send({ error: 'subcategory not push in category' })
                        }
                        else {
                            res.send({ msg: 'subcategory add successfully' })
                        }
                    })
            }
        })
    }
}

exports.update = (req, res) => {
    var categoryId = req.params.catId;
    var subcategoryId = req.params.sub_catId;
    var obj = req.body;

    psubcategory.findByIdAndUpdate({ _id: subcategoryId }, {  $set: { subcategory: obj.subcategoryname, color: obj.color, lable: obj.lable } })
        .exec((err, subcategorydata) =>{
            if (err) {
                res.send({ error: 'subcategory is not update' })
            }
            else {
                pcategory.findById({ _id: categoryId }).exec((err, data) => {
                    if (err) {
                        console.log(err)
                        res.send({ error: 'subcategory is not update from category' })
                    }
                    else {
                        console.log(data)
                        data.program_subcategory.set(subcategorydata._id)
                        res.send({ msg: 'subcategory update successfully' })
                    }
                })
            }
     })
}

exports.remove = (req,res)=>{
    console.log('run')
    var categoryId = req.params.catId;
    var subcategoryId = req.params.sub_catId;
    // psubcategory.findByIdAndDelete(subcategoryId,(err,deleteData)=>{
    //     if(err){
    //         res.send({error:'subcategory is not delete'})
    //     }
    //     else{
            pcategory.findById(categoryId)
                     .populate({
                         path:'program_subcategory',
                         match:{ _id: subcategoryId }
                     })
                     .exec((err,data)=>{
                         if(err){
                             console.log(err)
                         }
                         console.log(data)
                         res.send(data)
                      })   
    //     }
    // })
}