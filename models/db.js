const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Lms',{useNewUrlParser: true},(err)=>{
    if(!err) { console.log('Mongodb connection for web app Succeded') }
    else { console.log('Error in DB connection :' + err) }
});

require('./user');