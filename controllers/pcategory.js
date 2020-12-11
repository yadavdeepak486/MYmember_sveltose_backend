const pcategory = require("../models/pcategory");
const program = require("../models/program");


exports.read = (req,res)=>{
    var categoryId = req.params.categoryId;
    pcategory.findById(categoryId)
             .populate('program_subcategory')
             .exec((err,data)=>{
                if(err){
                    console.log(err)
                    res.send({error:'subcategory is not populate'})
                }
                else{
                    res.send(data)
                }
            })
}
exports.create = (req,res)=>{
    var category = req.body.category;
    var programName = req.body.programName;
    var programId = req.params.programId;

    var categoryDetails={}

    categoryDetails.category = category;
    categoryDetails.programName = programName;
    console.log(categoryDetails)

    pcategory.find({"category":category}).exec((err,data)=>{
        if(err){
            res.send({error:'category not find'})
        }
        else{
            if(data.length>0){
                res.send({error:'category is already exist'})
            }
            else{
                var categoryObj = new pcategory(categoryDetails)
                console.log(categoryObj)
                categoryObj.save((err,categoryData)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        program.findByIdAndUpdate({_id:programId},{$push:{ program_category : categoryData._id }})
                            .exec((err,data)=>{
                                if(err){
                                    console.log(err)
                                    res.send({error:'category is not add'})
                                }
                                else{
                                  res.send({msg:'category add successfully'})
                                }
                            })
                    }
                })        
            }
        }
    })
}

exports.update = (req,res)=>{
    var categoryId = req.params.categoryID;
    var programID = req.params.programID;
    var category_name = req.body.category;
    
    pcategory.findByIdAndUpdate(categoryId,{$set:{category:category_name}}).exec((err,data)=>{
        if(err){
            res.send({error:'category not find'})
        }
        else{
                program.findByIdAndUpdate({_id:programID},{$set:{ program_category : data._id }})
                .exec((err,data)=>{
                    if(err){
                        console.log(err)
                        res.send({error:'category is not update'})
                    }
                    else{
                      res.send({msg:'category update successfully'})
                    }
                })
            
        }
    })
}






