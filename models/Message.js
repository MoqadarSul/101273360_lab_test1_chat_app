const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    from_user : {
        type : String,
        lowercase: true,
        required : true,
    },
    room : {
        type :String,
        lowercase: true,
        required : true,
    },
    message : {
        type : String,
        lowercase: true,
        required: true,
    },
    date_sent: { 
      type: Date,
      default: Date.now,
      alias : 'dateSent'
    },
  });



const Message = mongoose.model("message", MessageSchema);
module.exports = Message;
  