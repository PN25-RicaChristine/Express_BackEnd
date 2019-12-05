const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const multer = require('multer');
const app = express();



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
  	console.log(req)
    cb(null,  Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage:  storage});
app.use(cors())
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/static', express.static('public'))

//Setting a static path
app.use(express.static(path.join(__dirname, 'public')));


app.use(passport.initialize());

require('./config/passport')(passport);


app.get('/images/:filename', (req, res) => {
	res.sendFile(__dirname + '/public/images/' + req.params.filename)
})

app.post('/images/upload/:id', upload.single('file'), (req, res) => {
	console.log(`new upload = ${req.file.filename}\n`);
  console.log(req.file);
  res.json({ route: 'images/' + req.file.filename});
  //res.send({ route: 'images/' + req.file.filename});
  // res.send(req.file.filename);
})



// app.get('/', (req,res) => {
//     res.send("<h1>Hello World!</h1>");
// });

const user = require('./routes/api/users');
const post = require('./routes/api/posts');
app.use('/api/users',user);
app.use('/api/posts',upload.single('img'),post)

mongoose.Promise = global.Promise;
//Connecting to database
const db = require('./config/keys').mongoURI;
mongoose.connect(db, { 
    useNewUrlParser: true})
    .then(() => {
        console.log(`Connected to database ${db}`);
    }).catch(err => {
    console.log(`Unable to connect to database ${err}`);
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Now listening to port ${PORT}`);
})
