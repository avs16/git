const mongoose = require("mongoose");
const shortid = require('shortid');
const Schema = mongoose.Schema;
 
const UserSchema = new Schema({
  userid: { 
    unique:true,
    type: String,
    'default': shortid.generate
  },
  tier:{
    type: String,
    enum : ['free', 'silver','gold','platinum'],
    default:'free'
  },
  name: {
    type: String
  },
  age:{
      type:Number
  },
  gender:{
      type:String
  },
  physicalstatus:{
    type:String
},
drinkinghabits:{
type:String
},
eatinghabits:{
  type:String
  },
  smokinghabits:{
    type:String
    },
  weight:{
    type:String
    },
  email: {
    type: String
  },
  password: {
    type: String
  },
  createdBy:{
      type:String
  },
  dob:{
      type:Date
  },
  likes:{
      type:Number,
      default:0
  },
  visitedcounts:{ // profiles i visited 
    type:Number,
    default:0
  },
  active:{
    type: String,
    enum : ['yes', 'no']
  },
  zodiac:{
    type:String
  },
  star:{
    type:String
  },
  lagnam:{
    type:String
  },
  gothram:{
    type:String
  },
  mgothram:{
    type:String
  },
  timeofbirth:{
    type:String
  },
  birthplace:{
    type:String
  },
  dosham:{
    type:String
  },

  // education details

  education:{
    type:String
  },
  occupation:{
    type:String
  },
  workcompany:{
    type:String
  },

  // family details

  fathername:{
    type:String
  },
  fatheroccp:{
    type:String
  },
  mothername:{
    type:String
  },
  motheroccp:{
    type:String
  },

  address:{
    type:String
  },
  city:{
    type:String
  },
  state:{
    type:String
  },
  currentcity:{
    type:String
  },
  income:{
    type:String
  },
  siblings:{
    type:String
  },
  ownhome:{
    type:String
  },
  finstatus:{
    type:String
  },
  
  // personal details

  height:{
    type:String
  },
  bio:{
    type:String
  },
  nri:{
    type:String
  },
  age:{
    type:String
  },
  // contact
  pcontact:{
    type:String
  },
  scontact:{
    type:String
  },
  horoscope: {
    data: Buffer, 
      contentType: String 
  },
photo: 
  { 
      data: Buffer, 
      contentType: String 
  } ,   
  likes:{ 
    type: Number,
        min:0,
        default: 0
  },  filename: {
    type: String,
},
fileId: {
    type: String,
},
  favourites:{  
		type: Number,
        min:0,
        default: 0
    },
  likedby:[{
        type: Schema.Types.ObjectId,
        ref:'User'
    }]
 },
 {
     timestamps: true
 });
const User = mongoose.model("users", UserSchema);
module.exports = User;