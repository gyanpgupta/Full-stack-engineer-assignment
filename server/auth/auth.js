require("dotenv").config();

const jwt = require("jsonwebtoken");

const generateAccessToken = async () => {
  return jwt.sign({}, process.env.JWT_SECRET);
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);
    next();
  });
};

module.exports = {
  generateAccessToken,
  authenticateToken,
};
