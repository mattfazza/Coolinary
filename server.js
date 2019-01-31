const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport'); //look into google OAuth

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config - The config file contains a URI
const db = require('./config/keys').mongoURI;

//connect to MongoDB
//This approach is slightly different from Pymongo.  It's important to notice that mongoose allows you to
//log the error here
mongoose
    .connect(db)
    .then(() => console.log('MongDB Connected'))
    .catch(err => console.log(err));


//passport middleware
app.use(passport.initialize());

// Passport Config - with JWT strategy
require('./config/passport')(passport);

//use routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server running on port 5000'));
