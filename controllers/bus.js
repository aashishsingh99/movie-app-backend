const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const {log_and_send_error} = require('./error');

const Bus = require('../models/Bus');

const addBus =async (req,res)=>{
    const {name,source,destination,startTime,reachTime,date}=req.body;
    const seats = Array(40).fill(null);
    try {
        
        const newBus = new Bus({
            name: name,
            source: source,
            destination: destination,
            startTime: startTime,
            reachTime: reachTime,
            date: date,
            seats: seats,
          });
    
          await newBus.save();
          const allBuses = await Bus.find();
          res.json(allBuses);
    

    } catch (err) {
        log_and_send_error(err.message,500,'Server Error');
    }
}

const findBus=async(req,res)=>{
    const {source,destination,date}=req.body;

    try {
        const buses = await Bus.find({source:source,destination:destination,date:date});
        res.send(buses);
      } catch (err) {
       
        log_and_send_error(err.message,500,'Server Error');
        
      }
}
const getAllBuses=async(req,res)=>{
    try {
        const buses = await Bus.find();
        console.log(buses)
        res.json(buses);
      } catch (err) {
       
        log_and_send_error(err.message,500,'Server Error');
        
      }
}
module.exports = {findBus,getAllBuses,addBus};
