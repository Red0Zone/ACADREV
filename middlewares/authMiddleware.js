const jwt = require('jsonwebtoken');
const { checkBlacklist } = require('./checkBlacklist');

const authenticateToken = async (req, res, next) => {
  await checkBlacklist(req, res, async () => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET || 'default_secret', (err, user) => {
      if (err) return res.sendStatus(401);
      req.user = user;
      next();
    });
  });
};

const authorizeRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Unauthorized role' });
    }
    next();
  };
};

module.exports = { authenticateToken, authorizeRole };
