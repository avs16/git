const express=require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');
const users=require('./routes/route')
const app =express();
app.set('trust proxy', 1);
const db = require("./config/keys").mongoURI;
app.use( 
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

mongoose.connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true,useFindAndModify: false}
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, './static')));

app.get('/', function (req, res) {
    res.render('index')
  });
app.get('/register', function (req, res) {
    res.render('register')
  });
  app.get('/get', function (req, res) {
    res.render('get')
  });
app.use('/',users);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));