const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var userSchema = new Schema({

  email:    {type: String,required: true,unique: true,  },

  password: { type: String , required: true, minlength: 6},

  username: {type: String, required:true},
});

module.exports = User = mongoose.model('user', userSchema);
