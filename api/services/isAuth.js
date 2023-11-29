
const isAuthenticated = (req, res, next) => {
    console.log(req.session);
    if (req.session && req.session.user) {
      return next();
    }
    res.status(401).json({message:'Unauthorized'});
  }

module.exports = isAuthenticated;