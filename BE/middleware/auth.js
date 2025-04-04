const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret'; // Nên dùng biến môi trường

exports.verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  
  if (!token) {
    return res.status(403).send({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    req.userId = decoded.id;
    req.userType = decoded.type;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  if (req.userType !== '1') {
    return res.status(403).send({ message: 'Require Admin Role' });
  }
  next();
};

exports.isUser = (req, res, next) => {
  if (req.userType !== '2') {
    return res.status(403).send({ message: 'Require User Role' });
  }
  next();
};