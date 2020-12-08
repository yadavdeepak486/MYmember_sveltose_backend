var appoinmentModal = require('../models/appoinment');

exports.createAppoinment = (req,res)=>{
    var appoinmentDetails = req.body;
          var appoinment = new appoinmentModal(appoinmentDetails);
          appoinment.save((err,data)=>{
              if(err){
                  res.send({error:'appoinment not create'});
              }
              else{
                  res.send({msg:'appoinment create successfully'});
              }
          })
}
exports.read = (req,res)=>{
    appoinmentModal.find().exec((err,data)=>{
        if(err){
            res.send({error:'appoinment is not found'});
        }
        else{
            if(data.length > 0){
                res.send({data})
            }
            else{
                res.send({msg:'appoinment is empty'})
            }
        }
    })
}         
