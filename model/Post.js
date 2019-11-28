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
        required: false
    },
    category: {
        type: String,
        required: true
    },
    date_time: {
        type: Date.now(),
        required: true
    }
});

module.exports = mongoose.model('posts', postSchema);