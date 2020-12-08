const eventModal = require('../models/event')

exports.create = (req,res)=>{
   var eventDetails = req.body;
   var appoinmentId = req.params;
   eventModal.findById(appoinmentId).exec((err,data)=>{
   var event = new eventModal(eventDetails);
    event.save((err,data)=>{
         if(err){
             res.send({error:'event is not create'})
         }
         else{
             res.send(data)
         }
    }) 
   })
 }

exports.remove =(req,res)=>{
     var eventId = req.params.eventId;   
     eventModal.findByIdAndDelete(eventId).exec((err,data)=>{
            if(err){
                res.send({error:'event is not remove'})
            }
            else{
                res.send({msg:'event is successfully remove'})
            }
     })
}

exports.edit = (req,res)=>{
            console.log(req.params,req.body)
            var eventID = req.params.eventId;
            var editDetails = req.body;
            var update =  eventModal.findByIdAndUpdate(eventID,{
                first_name : editDetails.first_name,
                last_name : editDetails.last_name,
                phone : editDetails.phone,
                notes : editDetails.notes,
                email : editDetails.email
            });
            update.exec((err,data)=>{
                if(err){
                    res.send({error:'event is not update'});
                }
                else{
                    res.send({msg:'event is successfully update'});
                }
            })
}
