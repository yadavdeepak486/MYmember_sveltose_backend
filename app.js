const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const ejs = require('ejs')
const path = require('path')
const expressValidator = require('express-validator');
require('dotenv').config();
// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const braintreeRoutes = require('./routes/braintree');
const orderRoutes = require('./routes/order');
const add_member = require('./routes/addmember');
const support = require('./routes/support')
const appoinment = require('./routes/appoinment')
const event = require('./routes/event')
const add_membership = require('./routes/membership')
const document = require('./routes/document')

// app
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// db
mongoose
    .connect("mongodb://127.0.0.1:27017/mymember",{
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB Connected'));

// middlewares
app.use(morgan('dev'));
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended : false}));
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
app.use('/api', add_member);
app.use('/api', support);
app.use('/api', appoinment);
app.use('/api', event);
app.use('/api', document);
app.use('/api', add_membership);


const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
