const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next)=> {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
};


const User = require('../models/User');


const authRole= (role)=> {
    return async (req, res, next) => {
      try{
        const cur_user = await User.findById(req.user.id)
        
      if (cur_user.role !== role) {
        res.status(401)
        return res.send('Not allowed')
      }
    }
    catch(err){
      console.error(err)
    }
  
      next()
    }
  }
module.exports = {auth,authRole}