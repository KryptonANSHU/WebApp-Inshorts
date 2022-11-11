const jwt = require("jsonwebtoken");
const { user } = require("../models/");
const cookie = require("cookie");

exports.authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    console.log("VERIFY TOKEN",token);

    if (token == null) return res.status(401).json({msg:"No Token Found"});

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      try {
        if (err) return res.status(403).json({msg:"Not Authorized"});
        req.user = user;
        next();
      } catch (err) {
        console.log(err);
        res.status(403).json(err)
      }
    });
  } catch (e) {
    console.log(err);
    res.status(403).json(err);
  }
};

