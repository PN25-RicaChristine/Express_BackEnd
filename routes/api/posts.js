var express = require('express');
const router = express.Router();
const Post = require('../../model/Post');
const Image = require('../../model/Image');
const fs = require('fs');
router.post('/', (req, res) =>{
    console.log(req.body)
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
    // Define a JSONobject for the image attributes for saving to database
     
    var finalImg = {
         contentType: req.file.mimetype,
         item:  new Buffer(encode_image, 'base64')
      };
      let image = new Image(finalImg)
      image.save()
      .then((doc) =>{
          //console.log('saved')
          res.status(200).send()
      }).catch(err =>{
          console.log(err)
          res.end()
      })
    //let post =  new Post();
})

module.exports = router;