const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

const {MOGOURI} = require('./config/keys')
const PORT = process.env.PORT || 5000;


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

    res.json({"message": "welcome to Blog App API."});

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



mongoose.connect(MOGOURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((reponse) => {

        app.listen(PORT);
        console.log(`connected! at post ${PORT}`)


    })
    .catch((error) => console.log(error))

