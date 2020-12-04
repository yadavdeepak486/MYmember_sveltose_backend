const express = require("express");
const router = express.Router();
const User = require("../models/administrate_user")
var nodemailer = require("nodemailer")
var bodyParser = require('body-parser')
const parser = bodyParser.urlencoded({
    extended: false
});

function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
};

router.post('/sent_resetPass_link', parser, (req, res) => {
    var emails = req.body.email
    var code = randomString(8, 'PICKCHAR45SFROM789THI123SSET');
    console.log(emails)
    User.findOne({ email: emails })
        .then((result) => {
            console.log(result)
            if (result === null) {
                res.send("email not found")
            }
            else {
                User.update({ email: emails }, { $set: { reset_code: code } })
                    .then((resp) => {
                        let mailTransporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: 465,
                            secure: true,
                            auth: {
                                user: 'shivanic18@navgurukul.org',
                                pass: 'Chouhan18@'
                            }
                        });
                        let mailDetails = {
                            from: 'shivanic18@navgurukul.org',
                            to: emails,
                            subject: 'Your Reset pasword link',
                            html: '<h3>This is password reset link. please reset Your password. <br> and this is the reset password unique secret.<br>' + code + '<br> The secret is one time use secret.</h3>' + '<h1 style="font-weight:bold;"><a href="http://localhost:4200/reset_pass">http://localhost:4200/reset_pass</a></h1>'
                        };
                        mailTransporter.sendMail(mailDetails, function (err, data) {
                            if (err) {
                                console.log(err)
                                console.log('Error Occurs');
                                res.send(err);
                            } else {
                                res.send(data);
                                console.log('Email sent successfully');
                                res.json("email send sucussfully");
                            }
                        });
                    }).catch((err) => {
                        res.send(err)
                        console.log(err)
                    })

            }
        })

    //   })

});



router.post("/reset_password", parser,async (req, res, next) => {
    const pass = req.body.password
    const confirm_pass = req.body.repassword
    const code = req.body.secret
    console.log(code)
    console.log(req.body)
    if (pass === confirm_pass) {
        const otp_data = await User.findOne({
            reset_code: code
        })
        console.log(otp_data,"$$$###########@@@@@@@@@@@@")
        if (otp_data === null) {
            res.send("your secret is wrong or expired")
        } else {
            User.updateOne({
                email: otp_data.email
            }, {
                $set: {
                    password: pass
                }
            })
                .then((result) => {
                    console.log(result)
                    if(result.nModified ==1){
                        User.updateOne({email:otp_data.email},{$set:{reset_code:''}})
                        .then((resp)=>{
                            console.log(resp,"$$$$$$$$$$");
                            res.send("your password id reset please login now")
                        });
                    }else{
                        res.send("something went wrong")
                    }
                   
                }).catch((err) => {
                    res.send(err)
                })
        }
    } else {
        res.send("Your Confirm Password Is wrong")
    }
})


module.exports = router