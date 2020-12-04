const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
var nodemailer=require("nodemailer")
const path = require("path")
const expressValidator = require('express-validator');
require('dotenv').config();
const forget = require("./routes/forget_pass")
// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const braintreeRoutes = require('./routes/braintree');
const orderRoutes = require('./routes/order');
const programRoutes = require("./routes/program")
const manageRankRoutes = require("./routes/program_rank")
const stripe = require("./routes/stripe");
const todo_api = require("./routes/todo_apis")
const adminstrate = require("./routes/administrater_user")
const goals_api = require("./routes/goals_api")
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB Connected'));


app.get("/reset_pass",(req,res)=>{
    res.sendFile(path.join(__dirname + '/reset_pass.html'));

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

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
