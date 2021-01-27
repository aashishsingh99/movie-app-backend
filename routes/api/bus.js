const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { auth, authRole } = require('../../middleware/auth');
const { addBus, findBus, getAllBuses,getBusById,bookBus,resetBus } = require('../../controllers/bus');
const { ConnectionStates } = require('mongoose');

router.post('/addBus', auth, authRole('admin'), (req, res) => {
  console.log('Add bus route');
  addBus(req, res);
});

router.post('/findBus', auth, authRole('user'), (req, res) => {
  console.log('Add bus route');
  findBus(req, res);
});

router.get('/getAllBuses', auth, authRole('admin'), (req, res) => {
  console.log('Add bus route hi');
  getAllBuses(req, res);
});

router.get('/getBusById/:id', auth,  (req, res) => {
   
    getBusById(req, res);
  });
  router.post('/bookBus', auth, authRole('user'), (req, res) => {
    console.log('book Bus route');
    bookBus(req, res);
  });
  router.post('/resetBus', auth, authRole('admin'), (req, res) => {
    console.log('reset Bus route');
    resetBus(req, res);
  });

module.exports = router;
