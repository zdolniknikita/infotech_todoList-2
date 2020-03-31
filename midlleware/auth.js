const storage = require('node-persist')

const auth = async (req, res, next) => {
  const user = await storage.getItem('currentUser')

  if ( !user ) return res.status(401).json({ msg:"No user, authorization denied" });
    
  next()
};

module.exports = auth