// Middleware used to vaidate token IDs from Firebase Authentication
const {getAuth} = require('firebase-admin/auth');
const excludedRoutes = ['/ping', '/register', '/login']; // routes to ignore JWT validation

module.exports.validateJWT = (req, res, next) => {
  if (excludedRoutes.includes(req.path)) {
    next();
  } else {
    if (!req.headers.authorization) {
      res.status(400).json({error: 'Token is missing.'});
    } else {
      const token = req.headers.authorization.split(' ')[1];
      getAuth().verifyIdToken(token)
      .then(decodedToken => {
        if (!decodedToken.email_verified) {
          res.status(401).json({error: 'You must verify your E-Mail first.'});
        } else {
          req.auth = decodedToken;
          next();
        }
      })
      .catch(error => {
        if (error.code === 'auth/id-token-expired' || error.code === 'auth/argument-error') {
          res.status(401).json({error: 'Invalid token.'});
        } else {
          console.log(error);
          res.status(500).json({error: 'Internal server error.'});
        }
      });
    }
  }
}

