const httpError = require("../utils/http-error");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      const error = new httpError("Authentication failed", 401);
      return next(error);
    }

    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.user = { id: payload.userId };
    next();
  } catch (err) {
    req.user = { auth: false };
    const error = new httpError("Authentication failed", 401);
    return next(error);
  }
};

module.exports = auth;
