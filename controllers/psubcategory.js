const psubcategory = require("../models/psubcategory");
const pcategory = require("../models/pcategory");

exports.create = (req,res)=>{
    console.log(req.body)
    var categoryId = req.params.catId;
    var category = req.body.category;
    var subcategoryDetails = category.subcatdetails;
    
    for(let row of subcategoryDetails){
        obj={
            subcategory : row.subcategoryname,
            color : row.color,
            lable : row.lable,
            category : category.name
        }
    
    var psubcategoryObj = new psubcategory(obj)
    console.log(psubcategoryObj)
    psubcategoryObj.save((err,data)=>{
       if(err){
           
           res.send({error:'subcategory not add'})
       }
       else{
            pcategory.findByIdAndUpdate({_id:categoryId},{$push:{ program_subcategory:data._id }})
            .exec((err,data)=>{
                if(err){
                    res.send({error:'subcategory not push in category'})
                }
                else{
                    res.send({msg:'subcategory push in category'})
                }
            })
       }
      })
    }
}