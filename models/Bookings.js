const mongoose = require('mongoose');

const BookingsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  bus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bus',
  },
  seatNumber:{
      type: Number,
      required: true,
  }
  
});

module.exports = mongoose.model('bookings', BookingsSchema);
