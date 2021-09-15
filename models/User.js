const {model, Schema} = require('mongoose');


const User = new Schema({

    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    firstName:{
        type: String,
        required:true
    },
    lastName:{
        type: String,
        required:true
    },
    posts:[
        {
            type: Schema.Types.ObjectId,
            ref:"Post",
        }
    ]

});

module.exports = model('User',User);