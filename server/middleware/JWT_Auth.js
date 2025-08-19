const jwt = require('jsonwebtoken');

const JWT_AUTH = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) return res.status(403).json({ msg: 'JWT not provided.' });


    const decodedData = jwt.verify(token.split(' ')[1], process.env.SECRET);

    // console.log(decodedData);

    req.decodedData = decodedData;

    next();
  } catch (error) {
    res.status(403).json({ msg: 'Invalid token.' });
  }
};

module.exports = JWT_AUTH;
