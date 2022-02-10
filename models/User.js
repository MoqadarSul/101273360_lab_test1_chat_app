const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        lowercase: true,
        required : true,
    },
    firstname : {
        type :String,
        lowercase: true,
        required : true,

    },
    lastname : {
        type : String,
        lowercase: true,
        required: true,
    },
    password :{
        type : String
    },
    created: { 
      type: Date,
      default: Date.now,
      alias : 'createdat'
    },
  });



const User = mongoose.model("user", UserSchema);
module.exports = User;
  