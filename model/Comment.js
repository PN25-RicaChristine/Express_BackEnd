const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create new Schema
const commentSchema = new Schema({
    account_id: {
        type: Schema.Types.ObjectId, ref: 'User', sparse: true
    },
    post_id: {
        type: Schema.Types.ObjectId, ref: 'posts', sparse: true
    },
    comment_text: {
        type: String,
        required: true
    },
    date_time: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

module.exports = mongoose.model('comments', commentSchema);