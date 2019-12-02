const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Post schema
const postSchema = new Schema({
    account_id: {
        type: Schema.Types.ObjectId, ref: 'User', sparse: true
    },
    post_text: {
        type: String,
        required: false
    },
    post_image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    date_time: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

module.exports = mongoose.model('posts', postSchema);