const candidateModal = require("../models/candidates");
const Stripe = require("../models/stripe");
const addmemberModal = require("../models/addmember")

exports.create_candidateList = (req,res) => {
var studentId = req.params.studentId;   
addmemberModal.findById(studentId)
.populate('membership_details')
.exec((err,data)=>{
    if(err){
        res.send({error:'data not find'})
    }
    else{
        console.log(data)

        var membershipDetails = data.membership_details;
        for( row of membershipDetails){
            var expiry_date = row.expiry_date;
        }
        console.log(expiry_date)
        
        candidateData={};
        candidateData.memberprofileImage = data.memberprofileImage;
        candidateData.firstName = data.firstName;
        candidateData.lastName = data.lastName;
        candidateData.program = data.program;
        candidateData.category = data.category;
        candidateData.memberprofileImage = data.memberprofileImage;
        candidateData.expiry_date = expiry_date; 
        var candidateObj = new candidateModal(candidateData);
        candidateObj.save((err,data)=>{
            if(err){
                res.send({error :'student is not add in cadidate list' })
            }
            else{
                res.send({msg :'this student is add in cadidate list' })
            }
        })
    }
})
}

exports.add_stripe = (req,res)=>{
    var candidateId = req.params.candidateId;
    var stripeId = req.params.stripeId;

    Stripe.findById(stripeId).exec((err,stripeData)=>{
        if(err){
            res.send({error:'candidate data not found'})
        }
        else{
            candidateModal.findByIdAndUpdate({_id:candidateId},{$push:{ stripe : stripeData }})
            .exec((err,data)=>{
                if(err){
                    res.send({error:'stripe is not add in candidate'})
                }
                else{
                    res.send({error:'stripe is add in candidate'})
                }
            })
        }
    })
}

exports.candidate_list = (req,res) => {
    candidateModal.find()
    .populate({
        path: 'stripe',
        populate:{
            path:'manage_stripe',
            model:'manageStripe'
        }
}).exec((err,data)=>{
        if(err){
            res.send({error:'candidate list not found'})
        }
        else{
            res.send(data)
        }
    })
}

exports.candidate_remove = (req,res) =>{
    var candidateId = req.params.candidateId
    candidateModal.findByIdAndRemove(candidateId,(err,delCandidate)=>{
        if(err){
            res.send({error:'candidate is not remove'})
        }
        else{
            res.send({msg:'candidate is remove'})
        }
    })
}