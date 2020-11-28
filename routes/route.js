const mongoose=require("mongoose");
const express=require("express");
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const GridFsStorage = require("multer-gridfs-storage");
var fs = require('fs'); 
const Grid = require('gridfs-stream');
var path = require('path'); 
var multer = require('multer'); 

const router=express();

const User= require("../models/profile");

var storage = multer.diskStorage({ 
  destination: (req, photo, cb) => { 
      cb(null, 'uploads') 
  }, 
  filename: (req, file, cb) => { 
      cb(null, file.fieldname + '-' + Date.now()) 
  },
  fname: (req, horoscope, cb) => { 
    cb(null, horoscope.fieldname + '-' + Date.now()) 
} 
}); 

var upload = multer({ storage: storage });


// Uploading the image 
router.post('/submit', upload.any(), (req, res, next) => { 
  
  var obj = { 
    email: req.body.email,
    password: req.body.password,
      photo: { 
          data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.photo.filename)), 
          contentType: 'image/png'
      } ,
      horoscope: { 
        data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.horoscope.fname)), 
        contentType: 'image/png'
    } 
  } 
  User.create(obj, (err, item) => { 
      if (err) { 
          console.log(err); 
      } 
      else { 
          // item.save(); 
          res.redirect('/upload'); 
      } 
  }); 
}); 

router.post("/submt",upload.single('file'), (req, res) => {
  
    User.findOne({ email: req.body.email }).then(user => {
      
      
        const newUser = new User({
          
          name: req.body.name,
          age:req.body.age,
          gender:req.body.gender,
          createdBy:req.body.createdBy,
          dob:req.body.dob,
          city:req.body.city,
          state:req.body.state,
          createdBy:req.body.createdBy,
          zodiac:req.body.zodiac,
          star:req.body.star,
          lagnam:req.body.lagnam,
          gothram:req.body.gothram,
          mgothram:req.body.mgothram,
          height:req.body.height,
          occupation:req.body.occupation,
          education:req.body.education,
          ownhome:req.body.ownhome,
          fatheroccp:req.body.fatheroccp,
          motheroccp:req.body.motheroccp,
          workcompany:req.body.workcompany,
          timeofbirth:req.bodytimeofbirth,
          birthplace:req.body.birthplace,
          fathername:req.body.fathername,
          mothername:req.body.mothername,
          income:req.body.income,
          pcontact:req.body.pcontact,
          scontact:req.body.scontact,
          email: req.body.email,
          siblings:req.body.siblings,
          password: req.body.password,
          filename:req.file.originalname,
          fileId:req.file.id,
          horoscope:req.body.horoscope,

        });
       
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            
            newUser.password = hash;
  
            newUser
              .save()
              .then((newUser => {
                if (newUser) {
                  const payload = {
                    name: newUser.name,
                    userid:newUser.userid
                  };
                  // jwt tokens
                  jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                      expiresIn: 10000000 
                    },
                    (err, token) => {
                      return res.render('upload');
                      // res.json(req.body);
                    }
                  );
                } else {
                  return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect !!!!!!!!" });
                }
              }))
              .catch(err => console.log(err));
              
          });
        });
        
        
     
      });
    })


    // Retriving the image 
router.get('/get', (req, res) => { 
	User.find({}, (err, data) => { 
		if (err) { 
			console.log(err); 
		} 
		else { 
			res.render('get', { items: data }); 
		} 
	}); 
}); 

  module.exports=router;