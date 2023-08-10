const bcrypt = require("bcrypt");

 const ComparePassword = (password, bddHashedPassword) => {
    return bcrypt.compare(password, bddHashedPassword)
  }
  
 const HashPassword = (password) => {
    return bcrypt.hash(password, 10)
  }

const asyncWrapper = (fn) => {
  return async (req,res,next) => {
    try {
      await fn(req,res,next);
    }catch(error){
      next(error);
    }
  }
}

 module.exports = {ComparePassword, HashPassword, asyncWrapper}