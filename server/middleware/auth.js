const { Unauthorized } = require("../errors");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeaders = req.headers.Authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    throw new Unauthorized("Access denied");
  }
  try {
    const token = authHeaders.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    throw new Unauthorized("Invalid or expired token");
  }
};

module.exports = auth;
