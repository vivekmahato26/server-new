const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(" ")[1];
  if (!token || token === ""||token =="null") {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_KEY);
    if (decodedToken.email) {
      req.isAuth = true;
      req.userId = decodedToken.id;
      req.email = decodedToken.email;
      req.userType = decodedToken.userType;
    } else {
      req.isAuth = false;
      return next();
    }
  } catch (err) {
    console.log(err);
    req.isAuth = false;

    return next();
  }
  return next();
};
