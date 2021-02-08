const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Movie = require('../models/Movie');
const { log_and_send_error } = require('./error');

const dashboard = async (req, res) => {
  try {
    const admin = await User.findById(req.user.id);
    res.send(admin.name);
  } catch (err) {
    log_and_send_error(err.message, 500, 'Server Error');
  }
};

const addMovie = async (req, res) => {
  const { name, startTime, reachTime } = req.body;
  try {
    const newMovie = new Movie({
      name: name,
      startTime: startTime,
      reachTime: reachTime,
      seats: Array(40).fill(null),
    });
    const movie = await newMovie.save();

    res.json(movie);
  } catch (err) {
    log_and_send_error(err.message, 500, 'Server Error');
  }
};

module.exports = {
  dashboard,
};
