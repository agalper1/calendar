const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
  const token = req.headers.authorization;
  if(!token) return res.status(401).send('Zugriff verweigert');
  
  try{
    const verified = jwt.verify(token,process.env.SECRET_TOKEN);
    req.user = verified;
    next();
  } catch(err){
    res.status(400).send('Ungueltiger Token');
  }
}
