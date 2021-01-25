const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();
// Init middleware
app.use(express.json({extended: false}));

app.get('/', (req, res) => {
  console.log('yo ')
  res.send('yeah');
});
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

 app.use('/api/admin', require('./routes/api/admin'));
// app.use('/api/bookings', require('./routes/api/bookings'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
