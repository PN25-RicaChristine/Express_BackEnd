const express = require('express');
const router = express.Router();
// const User = require('../../model/User');
const posts = require('../../model/Post');


router.post('/getPost', (req, res) => {
    posts.find().then(response => {
        if(response){
            res.send({
                status: 200,
                response: response
            });
        }
    })
});

module.exports = router;