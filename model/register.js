const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const employeeSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  age: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  /*=========tokens Start ===============*/
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  /*============tokens end ==============*/
});



/*=================Json Web Token Start===================*/
// Registration Form Signing Up User with JWT OAuth Token using
employeeSchema.methods.generateAuthToken = async function () {
  try {
    console.log(this._id);
    const token = jwt.sign(
      { _id: this._id.toString() },
      "mynameismohammadzeeshaniamdeveloper"
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    res.send("The error part" + err);
    console.log("The error part" + err);
  }
};
/*=================Json Web Token End===================*/

/*====================bcrypt Start========================*/
// Secure Registration System Password with BcryptJS || Middleware in NodeJS & MongoDB
employeeSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log(`The current password is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(`The current password is ${this.password}`);

    // this.confirmpassword = undefined;
    this.confirmpassword = await bcrypt.hash(this.password, 10);
  }
  next();
});
/*====================bcrypt End========================*/
const Register = new mongoose.model("Register", employeeSchema);

module.exports = Register;
