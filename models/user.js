const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name :{
        type : String
    },
    username :{
        type : String
    },
    email :{
        type : String,
        required : true
    },
    password :{
        type : String,
        required: true
    },
    contactno :{
        type : String
    },
    date :{
        type : Date,
        default: Date.now
    },
    usertype :{
        type : String
    }
});

module.exports = User = mongoose.model('users',UserSchema);
