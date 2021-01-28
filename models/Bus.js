const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  source:{
    type: String,
    required: true,
  },
  destination:{
    type: String,
    required: true,
  },
  startTime:{
    type: String,
    required: true,
  },
  reachTime:{
    type: String,
    required: true,
  },
  date:{
    type: String,
    required: true,
  },
  fare:{
    type:Number,
    required: true,

  },
  seats:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }]
});

module.exports = mongoose.model('bus', BusSchema);
