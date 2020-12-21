const express = require('express');
const ejs = require('ejs')
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require("path");
const crypto = require("crypto")
const fileUpload = require('express-fileupload');
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
const test_fees = require("./routes/test_fees")
const pcategory = require("./routes/pcategory")
const psubcategory = require("./routes/psubcategory")
const add_membership = require("./routes/membership")
const finance_info = require("./routes/finance_info")
const document = require("./routes/document")
const bymember_ship = require("./routes/buy_membership")

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const uuidv1 = require('uuid/v1');
uuidv1()
// db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB Connected'));


// middlewares
app.use(morgan('dev'));

app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
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
app.use("/api",test_fees)
app.use("/api",pcategory)
app.use("/api",psubcategory)
app.use('/api', add_membership)
app.use('/api', finance_info)
app.use('/api', document);
app.use('/api', bymember_ship);
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
