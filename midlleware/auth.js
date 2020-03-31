// const { jwtSecret } = require("../config/config.json");
// const jwt = require("jsonwebtoken");

const storage = require('node-persist')

const auth = async (req, res, next) => {
  const user = await storage.getItem('currentUser')
  console.log('currentUser = ', user)

  if ( !user ) return res.status(401).json({ msg:"No user, authorization denied" });
    
  next()
//   try {
//       const decode = jwt.verify(token, jwtSecret);
//       console.log("decode", decode)
//       req.user = decode;
//       next();
//   } catch (error) {
//       console.log('error auth')
//       res.status(400).json({ msg: 'Token is not valid' })
//   }
};

module.exports = auth