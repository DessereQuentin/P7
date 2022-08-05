const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    imageUrl: { type: String, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required:true },
    usersLiked: { type: Array, required: false },
    usersDisliked: { type: Array, required:false },

});

module.exports = mongoose.model('Post', postSchema);

