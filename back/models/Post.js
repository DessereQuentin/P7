const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    userName:{ type: String, required: true },
    title: { type: String, required: true,minlength:1 },
    text: { type: String, required: true, minlength:1 },
    imageUrl: { type: String, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required:true },
    usersLiked: { type: Array, required: true },
    usersDisliked: { type: Array, required:true},
    date:{type:Number,required : true}

});

module.exports = mongoose.model('Post', postSchema);