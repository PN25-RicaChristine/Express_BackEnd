var express = require('express');
const router = express.Router();
const Post = require('../../model/Post');
const Image = require('../../model/Image');
const fs = require('fs');
router.post('/', (req, res) => {
    //let filename;
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
    var finalImg = {
        contentType: req.file.mimetype,
        item: new Buffer(encode_image, 'base64')
    };
    let data = {
        post_text: req.body.post_text,
        post_image: req.file.filename,
        category: req.body.category,
        comments: req.body.comments,
        rating: req.body.rating

    }

    // Define a JSONobject for the image attributes for saving to database

   
    console.log(finalImg)
   
    let post = new Post(data)
    post.save()
        .then((doc) => {
            console.log('wholedoc',doc)
            console.log('image',doc.post_image.toString('base64'))
        //     res.status(200).json({image:doc.post_image.toString('base64'),
        // post_text:doc.post_text, rating: doc.rating})
        res.status(200).json({image:'http://localhost:8081/static/images'+doc.post_image})
            
        }).catch(err => {
            console.log(err)
            res.send(err)
        })
    //let post =  new Post();
})

module.exports = router;