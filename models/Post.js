const {model, Schema} = require('mongoose');


const Post = new Schema({

    components:{
        type: Object,
        required:true
    },
    userID:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type: String,
        required:true
    },
    featuredImage:String,
    description:String

},{timestamps:true});

module.exports = model('Post',Post);