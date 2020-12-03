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