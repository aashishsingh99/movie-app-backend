const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  reachTime: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  fare:{
    type:Number,
    required: true,

  },
  poster:{
    type:String,

  },
  seats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }]
});

module.exports = mongoose.model('movie', MovieSchema);
