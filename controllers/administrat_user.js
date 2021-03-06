const administrate = require("../models/administrate_user");
const { errorHandler } = require('../helpers/dbErrorHandler');
const expressJwt = require('express-jwt'); // for authorization check
const jwt = require('jsonwebtoken'); // to generate signed token
const bcrypt = require('bcryptjs');
const uuidv1 = require('uuid/v1');
uuidv1()


exports.signup = (req, res) => {
    console.log("req.body", req.body);
    console.log(req.file)
    const user = new administrate(req.body);
    user.save((err, user) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                // error: errorHandler(err)
                error: 'Email is taken'
            });
        }

        user.salt = undefined;
        user.hashed_password = undefined;
        const cloudenary = require("cloudinary").v2
        cloudenary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.cloud_api_key,
            api_secret: process.env.cloud_api_secret
        });
        if (req.file) {
            console.log(req.file)
            const path = req.file.path
            const uniqueFilename = new Date().toISOString()
            cloudenary.uploader.upload(
                path,
                { public_id: `profile_photo/${uniqueFilename}`, tags: `profile_photo` }, // directory and tags are optional
                function (err, image) {
                    if (err) return res.send(err)
                    console.log('file uploaded to Cloudinary')
                    const fs = require('fs')
                    fs.unlinkSync(path)
                    administrate.findByIdAndUpdate(user._id, { $set: { profile_image: image.url } })
                        .then((response) => {
                            res.json(response)
                        });
                }
            );
        } else {
            res.json({
                user
            });
        }

    });
};



exports.prfile_update = (req, res) => {
    console.log("req.body", req.body);
    const id = req.params.uid;
    console.log(req.file)
    administrate.updateOne({ _id: id }, req.body)
        .then((resp) => {
            user.salt = undefined;
            user.hashed_password = undefined;
            const cloudenary = require("cloudinary").v2
            cloudenary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.cloud_api_key,
                api_secret: process.env.cloud_api_secret
            });
            if (req.file) {
                console.log(req.file)
                const path = req.file.path
                const uniqueFilename = new Date().toISOString()
                cloudenary.uploader.upload(
                    path,
                    { public_id: `profile_photo/${uniqueFilename}`, tags: `profile_photo` }, // directory and tags are optional
                    function (err, image) {
                        if (err) return res.send(err)
                        console.log('file uploaded to Cloudinary')
                        const fs = require('fs')
                        fs.unlinkSync(path)
                        administrate.findByIdAndUpdate(id, { $set: { profile_image: image.url } })
                            .then((response) => {
                                res.json({ data: response, message: "update your profile image successfully" })
                            });
                    }
                );
            } else {
                res.json({
                    data: resp,
                    message: "update your profile successfully"
                });
            }
        });
};


exports.signin = (req, res) => {
    // find the user based on email
    console.log(req.body)
    const { email, password } = req.body;
    administrate.findOne({ email }, (err, user) => {
        console.log(user)
        if (err || !user) {
            console.log(err)
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            });
        }

        // consta = bcrypt.compare(user.hashed_password, function (err, hash) {

        // if user is found make sure the email and password match
        // create authenticate method in user model
        if (!user.authenticate(password)) {
            console.log(password)
            return res.status(401).json({
                error: 'Email and password dont match'
            });
        };
        // generate a signed token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expiry date
        res.cookie('t', token, { expire: new Date() + 9999 });
        // return response with user and token to frontend client
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, email, name, role } });
    });
};


exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({ message: 'Signout success' });
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth'
});

// exports.isAuth = (req, res, next) => {
//     let user = req.profile && req.auth && req.profile._id == req.auth._id;
//     if (!user) {
//         return res.status(403).json({
//             error: 'Access denied'
//         });
//     }
//     next();
// };

// exports.isAdmin = (req, res, next) => {
//     if (req.profile.role === 0) {
//         return res.status(403).json({
//             error: 'Administrator resourse! Access denied'
//         });
//     }
//     next();
// };

exports.read =(req,res)=>{
    administrate.find().exec((err,data)=>{
          if(err){
              res.send({error:'user list not found'})
          }
          else{
              if(data.length>0){
                  res.send(data)
              }
              else{
                  res.send({msg:'user list is empty'})
              }
          }
      })
  }
  
  exports.remove=(req,res)=>{
      var userId = req.params.userId
      administrate.findByIdAndRemove(userId,(err,data)=>{
          if(err){
              res.send({error:'user is not remove'})
          }
          else{
              res.send({msg:'user is remove'})
          }
      })
    }
  
    exports.edit_userInfo = (req,res)=>{
        var userid = req.params.userId;
        administrate.findById(userid).exec((err,userData)=>{
              if(err){
                  res.send({error:'user data is not found'})
              }
              else{
                  res.send(userData)
              }
        })
    }
  
    exports.update =(req,res)=>{
          var userid = req.params.userId;
          administrate.updateOne({_id:userid},req.body)
                  .then((result)=>{
                        if(req.file){
                              const cloudenary = require("cloudinary").v2
                              cloudenary.config({
                              cloud_name: process.env.cloud_name,
                              api_key: process.env.cloud_api_key,
                              api_secret: process.env.cloud_api_secret
                              });
                              const path = req.file.path
                              const uniqueFilename = new Date().toISOString()
                              cloudenary.uploader.upload(
                                  path,
                                  { public_id: `users/${uniqueFilename}`, tags: `user` }, // directory and tags are optional
                                  function (err, image) {
                                      if (err) return res.send(err)
                                      console.log('file uploaded to Cloudinary')
                                      const fs = require('fs')
                                      fs.unlinkSync(path)
                                      administrate.findByIdAndUpdate(userid, { $set: { profile_image: image.url } })
                                          .then((response) => {
                                              res.send({msg:'user is update with profile successfully'})
                                          });
                                  }
                              );  
                          }
                          else {
                              res.send({msg:'user is update successfully'});
                              console.log(result);
                          }
                      }).catch((err) => {
                          console.log(err);
                          res.send(err);
              });
    }
  
  