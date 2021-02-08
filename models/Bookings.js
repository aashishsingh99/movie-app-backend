const mongoose = require('mongoose');

const BookingsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
  },
  seatNumber:{
      type: Number,
      required: true,
  }
  
});

module.exports = mongoose.model('bookings', BookingsSchema);
