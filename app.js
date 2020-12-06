const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require("path");
const crypto = require("crypto")
const expressValidator = require('express-validator');
require('dotenv').config();

// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const braintreeRoutes = require('./routes/braintree');
const orderRoutes = require('./routes/order');

//shivani's
const User = require("./models/administrate_user");
const forget = require("./routes/forget_pass")
const programRoutes = require("./routes/program")
const manageRankRoutes = require("./routes/program_rank")
const stripe = require("./routes/stripe");
const todo_api = require("./routes/todo_apis")
const adminstrate = require("./routes/administrater_user")
const goals_api = require("./routes/goals_api");
const class_schedule = require("./routes/class_schedule")
const campaign_type = require("./routes/campaign_type");
const organization_setup = require("./routes/organization_setup");
const category_manag = require("./routes/category_manag")
const expense = require("./routes/expences");
const appointment = require('./routes/appointment')
const events = require("./routes/events")
const add_member = require("./routes/addmember")

const app = express();
const parser = bodyParser.urlencoded({
    extended: false
});
const uuidv1 = require('uuid/v1');
uuidv1()
// db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB Connected'));


app.get("/reset_pass/:token",(req,res)=>{
    app.set("token",req.params.token)
    res.sendFile(path.join(__dirname + '/reset_pass.html'));
});


async function hashPassword(password) {
    const salt = uuidv1()
    if (!password) return '';
    try {
        return await crypto
            .createHmac('sha1', salt)
            .update(password)
            .digest('hex');
    } catch (err) {
        return '';
    }
    // return await bcrypt.hash(password, uuidv1());
};




app.post("/reset_password",parser, async (req, res, next) => {
    const pass = req.body.password
    const hashedPassword = await hashPassword(pass);
    console.log(hashedPassword,"%%%%%%%%%%%%%%%%%%%%%%%%%")
    const token = app.get("token")
    const confirm_pass = req.body.repassword  
    console.log(req.body)  
    User.findOne({ resetPasswordToken: token })
        .then((user) => {
            if (!user) {
                res.json({ message: 'Password reset token is invalid or has expired.' });
            }
            if (pass === confirm_pass) {

                var myquery = { resetPasswordToken: token};
                var newvalues = { $set: { hashed_password: hashedPassword, resetPasswordToken: undefined, resetPasswordExpires: undefined } };
                User.updateOne(myquery, newvalues)
                    .then((result) => {
                        console.log(result)
                        res.send("password reset")
                    }).catch((err) => {
                        console.log(err)
                        res.send(err);
                    })
            } else {
                res.send("Your Confirm Password Is wrong")
            }
        })
})

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', braintreeRoutes);
app.use('/api', orderRoutes);
app.use("/api",programRoutes)
app.use("/api",manageRankRoutes);
app.use("/api",stripe);
app.use("/api",adminstrate);
app.use("/api",forget);
app.use('/api',todo_api)
app.use('/api',goals_api)
app.use("/api",class_schedule);
app.use("/api",campaign_type)
app.use("/api",organization_setup)
app.use("/api",category_manag)
app.use("/api",expense);
app.use("/api",appointment);
app.use("/api",events)
app.use("/api",add_member)

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
