const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();


const indexRouter = require('./routes/auth');
const meetingRouter = require('./routes/meetings');
// const calendar = require('./routes/calendar');

dotenv.config();



// MongoDB

mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

mongoose.connect(process.env.DB_CONNECT, () => console.log('Server gestartet'));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/', indexRouter);
app.use('/api/', meetingRouter);
// app.use('/api/calendar', calendar);


module.exports = app;
