const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

const MONGOURI = 'mongodb://127.0.0.1:27017/blog?gssapiServiceName=mongodb';


app.use(bodyParser.json());




app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
})






app.use(authRoutes);
app.use(postRoutes);


app.use('/', (req, res, next) => {

    res.json({"message": "success 1"});

})



app.use((error, req, res, next) => {

    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;


    if (error.errors) {
        res.status(status).json({
            message: message,
            error:error.errors
        })
    } else {
        res.status(status).json({
            message: message
        })
    }


    res.status(500);

})



mongoose.connect(MONGOURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((reponse) => {

        console.log('connected!')
        app.listen(5000);


    })
    .catch((error) => console.log(error))

