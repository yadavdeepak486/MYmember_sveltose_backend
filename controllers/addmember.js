const { functions } = require('lodash');
var addmemberModal = require('../models/addmember')

exports.addmember = (req, res) => {
    var memberdetails = req.body;
    // console.log('add member run',memberdetails)

    var memberObj = new addmemberModal(memberdetails);
    console.log(memberObj)

    memberObj.save(function(err,data){
        if(data){
            res.send('member is add')
        }
        else{
            res.send('member is not add')
        }
    }) 
   
}

exports.memberinfo = (req,res)=>{
    console.log('id',req.params)
    var memberID = req.params.memberID;
    console.log(memberID) 
    addmemberModal.findById(memberID).exec((err,data)=>{
        if(err){
            res.send({error:'member is not found'})
        }
        else{
            res.send(data)
        }
    })
}

exports.deletemember = (req,res)=>{
    console.log('id',req.params)
    var memberID = req.params.memberID;
    addmemberModal.findByIdAndDelete(memberID).exec((err,data)=>{
        if(err){
            res.send({error:'member is not delete'})
        }
        else{
            res.send({msg:'member is delete'})
        }
    })
}

exports.updatemember = (req,res)=>{
    console.log('id',req.params)
    var memberID = req.params.memberID;
    var data = req.body
  addmemberModal.findByIdAndUpdate(memberID,{
  
  studentType:data.studentType,
  firstName:data.firstName,
  lastName:data.lastName,
  dob:data.dob,
  age:data.age,
  gender:data.gender,
  email:data.email,
  primaryPhone:data.primaryPhone,
  secondaryNumber:data.secondaryNumber,
  address:data.address,
  country:data.country,
  state:data.state,
  zipPostalCode:data.zipPostalCode,
  studentBeltSize:data.studentBeltSize,
  program:data.program,
  startDate:data.startDate,
  expiredDate:data.expiredDate,
  lastPromotion:data.lastPromotion,
  location:data.location,
  ID:data.ID,
  dan:data.dan,
  customId:data.customId,
  leadsTracking:data.leadsTracking,
  staff:data.staff,
  intrested:data.intrested,
  school:data.schoool,
  addToGroup:data.addToGroup,
  familyName:data.familyName
    }).exec((err,data)=>{
        if(err){
            res.send({error:'member is not delete'})
        }
        else{
            res.send({msg:'member is update'})
        }
    })
}
