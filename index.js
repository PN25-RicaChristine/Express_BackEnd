const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const multer = require('multer');


const app = express();

// Initializing middleware

// Form Data middleware
app.use(bodyParser.urlencoded({
    extended: false
}));

// Json Body middleware
app.use(bodyParser.json());

//Cors middleware
app.use(cors());

app.use('/static', express.static('public'))

//Setting a static path
app.use(express.static(path.join(__dirname, 'public')));


app.use(passport.initialize());

require('./config/passport')(passport);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+'.jpg')
    }
  });

  var upload = multer({ storage: storage });



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


