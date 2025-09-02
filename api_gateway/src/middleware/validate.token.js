const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Authentication required",
        success: false,
      });
    }
    const user = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;

    next();
  } catch (error) {
    console.log("error \n", error);
    return res.status(429).json({
      message: "Invalid token!",
      success: false,
    });
  }
};

module.exports = { validateToken };
