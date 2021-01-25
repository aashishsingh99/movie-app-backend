const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');
const Bus = require('../models/Bus');
const { log_and_send_error } = require('./error');

const dashboard = async (req, res) => {
  try {
    const admin = await User.findById(req.user.id);
    res.send(admin.name);
  } catch (err) {
    log_and_send_error(err.message, 500, 'Server Error');
  }
};

const addBus = async (req, res) => {
  const { source, destination, startTime, reachTime } = req.body;
  try {
    const newBus = new Bus({
      name: source + ' ' + destination + ' ' + 'Bus',
      source: source,
      destination: destination,
      startTime: startTime,
      reachTime: reachTime,
      seats: Array(40).fill(null),
    });
    const bus = await newBus.save();

    res.json(bus);
  } catch (err) {
    log_and_send_error(err.message, 500, 'Server Error');
  }
};

module.exports = {
  dashboard,
};
