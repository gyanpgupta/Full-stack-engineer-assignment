const jwt = require("jsonwebtoken");

const generateAccessToken = async () => {
  return jwt.sign({}, "abc");
};

console.log("generateAccessToken", generateAccessToken());

const authenticateToken = (req, res, next) => {
  console.log("middle ware...............");
  const authHeader = req.headers["authorization"];
  console.log("authHeader...............", authHeader);

  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "abc", async (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    next();
  });
};

module.exports = {
  generateAccessToken,
  authenticateToken,
};
