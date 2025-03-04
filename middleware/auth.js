// Complete User Authentication & Authorization with JWT in NodeJS, Express & MongoDB
const jwt = require("jsonwebtoken");
const Register = require("../model/register1");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verifyUser);

    const user = await Register.findOne({ _id: verifyUser._id });
    console.log(user);

    /*================================================*/
    req.token = token;
    req.user = user;
    /*================================================*/

    next();
  } catch (err) {
    res.status(401).send(err);
  }
};

module.exports = auth;
