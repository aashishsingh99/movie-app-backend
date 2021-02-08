const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const { log_and_send_error } = require('./error');

const Movie = require('../models/Movie');
const Bookings = require('../models/Bookings');

const addMovie = async (req, res) => {
  const { name, startTime, reachTime, date, fare, poster} = req.body;
  const seats = Array(40).fill(null);
  try {
    const newMovie = new Movie({
      name: name,
      startTime: startTime,
      reachTime: reachTime,
      date: date,
      seats: seats,
      fare: fare,
      poster: poster,
    });

    await newMovie.save();
    const allMovies = await Movie.find();
    res.json(allMovies);
  } catch (err) {
    log_and_send_error(err.message, 500, 'Server Error');
  }
};

const findMovie = async (req, res) => {
  const { name, date } = req.body;

  try {
    const movies = await Movie.find({
      name:name,
      date: date,
    });
    res.send(movies);
  } catch (err) {
    log_and_send_error(err.message, 500, 'Server Error');
  }
};
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    
    res.json(movies);
  } catch (err) {
    log_and_send_error(err.message, 500, 'Server Error');
  }
};

const getMovieById = async (req, res) => {
  const options = {
    path: 'seats',
    options: {
      retainNullValues: true 
    }
  };
  try {
    const movie = await Movie.findById(req.params.id).populate(options)
    
    res.send(movie);
  } catch (err) {
    log_and_send_error(err.message, 500, 'Server Error');
  }
};
const bookMovie = async (req, res) => {
  const { seatNumber, movieId } = req.body;
  try {
    
    const curMovie = await Movie.findById(movieId);
    const newSeats = curMovie.seats;
    newSeats[seatNumber] = req.user.id;
     await Movie.findByIdAndUpdate(movieId, { seats: newSeats });
     const updatedMovie=await Movie.findById(movieId);
    
    const newBooking = new Bookings({
      user: req.user.id,
      movie: movieId,
      seatNumber: seatNumber,
    });

    await newBooking.save();
    res.json(updatedMovie)
  } catch (err) {
    log_and_send_error(err.message, 500, 'Server Error');
  }
};

const resetMovie = async (req, res) => {
  const { movieId } = req.body;
  try {
    
    const newSeats = Array(40).fill(null);
     await Movie.findByIdAndUpdate(movieId, { seats: newSeats });
     const updatedMovie=await Movie.findById(movieId);

    
    await Bookings.deleteMany({movie:movieId})

    res.json(updatedMovie)
  } catch (err) {
    log_and_send_error(err.message, 500, 'Server Error');
  }
};
module.exports = { findMovie, getAllMovies, addMovie, getMovieById, bookMovie, resetMovie };
