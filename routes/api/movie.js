const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { auth, authRole } = require('../../middleware/auth');
const { addMovie, findMovie, getAllMovies,getMovieById,bookMovie,resetMovie } = require('../../controllers/movie');
const { ConnectionStates } = require('mongoose');

router.post('/addMovie', auth, authRole('admin'), (req, res) => {
  
  addMovie(req, res);
});

router.post('/findMovie', auth, authRole('user'), (req, res) => {
  
  findMovie(req, res);
});

router.get('/getAllMovies', auth,  (req, res) => {
  
  getAllMovies(req, res);
});

router.get('/getMovieById/:id', auth,  (req, res) => {
   
    getMovieById(req, res);
  });
  router.post('/bookMovie', auth, authRole('user'), (req, res) => {
    
    bookMovie(req, res);
  });
  router.post('/resetMovie', auth, authRole('admin'), (req, res) => {
    
    resetMovie(req, res);
  });

module.exports = router;
