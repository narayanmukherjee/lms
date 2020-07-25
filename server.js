require('./models/db');

const express = require('express');

const bodyparser = require('body-parser');

const cors = require('cors');

var app = express();

app.use(cors());

app.use(bodyparser.urlencoded({
    extended : false  
}));

app.use(bodyparser.json());

var Users =  require('./routes/Users');

app.use('/users', Users);

app.listen(3000, () =>{
    console.log('Web app Server started at port : 3000');
});

