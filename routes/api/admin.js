const express = require('express');
const router = express.Router();
const {auth,authRole} = require('../../middleware/auth');
const { check } = require('express-validator');
const {dashboard} = require('../../controllers/admin');
const User = require('../../models/User');


 
// admin dashboard
router.get('/dashboard',auth,authRole('admin'),(req,res)=>{
    dashboard(req,res);
})

// add bus

router.post('/addBus',auth,authRole('admin'),(req,res)=>{
   addBus(req,res);

})

// delete bus

//  Show buses


// reset the bus with bus id


module.exports = router;
