const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  date:{
    type: String,
    required: true
  },
  title:{
      type: String,
      required: true
  },
  weekly:{
    type: String,
    required: true
  },
  link:{
    type: String,
    required: true
  },
  time:{
    type: String,
    required: true
  }
});

try {
  mongoose.model('Meeting')
  return true
} catch (e) {
  module.exports = mongoose.model('Meeting', meetingSchema);
  return false
}



