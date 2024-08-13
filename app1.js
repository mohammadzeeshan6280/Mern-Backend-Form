const express = require("express");
const app = express();
const db = require("./db/conn");
const port = process.env.PORT || 3000;
const path = require("path");
const hbs = require("hbs");
const Register = require("./model/register");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const staticPath = path.join(__dirname, "/public");
const templatePath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");
app.use(express.static(staticPath));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

/*

// Registration Form
app.post("/register", async (req,res) => {
    try{
// console.log(req.body.firstname)
// res.send(req.body.firstname)

const password = req.body.password;
const cpassword = req.body.confirmpassword;

if(password === cpassword){
    const registerEmployee = new Register({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
        gender : req.body.gender,
        phone : req.body.phone,
        age : req.body.age,
        password : req.body.password,
        confirmpassword : req.body.confirmpassword,
    }) 
 const register = await registerEmployee.save();
 res.status(201).render("index")

}else{
    res.send("Password no match")
}

    } catch(err){
        res.status(400).send(err)
    }
})

*/

/*
// Login Form
app.post("/login", async (req, res) => {
    try{

        const email = req.body.email;
        const password = req.body.password;
        
        const useremail = await Register.findOne({email});
        // res.send(useremail)
        // res.send(useremail.password)
        // console.log(useremail)

        if(useremail.password === password){
            res.status(201).render("index")
        } else{
            res.send("invalid login Details")
        }

    } catch(err){
res.status(400).send("invalid login Details")
    }
})
*/

/*
// Login Form
app.post("/login", async (req, res) => {
    try{

        const email = req.body.email;
        const password = req.body.password;
        
        const useremail = await Register.findOne({email});
     

        // Complete Login Form with Validation and BcryptJS using NodeJS & MongoDB
        const isMatch = await bcrypt.compare(password, useremail.password)

        if(isMatch){
            res.status(201).render("index")
        } else{
            res.send("invalid Password Details")
        }

    } catch(err){
res.status(400).send("invalid login Details")
    }
})

*/

// Encryption vs Hashing || Secure Password using BcryptJS
const securePassword = async (password) => {
  const passwordHash = await bcrypt.hash(password, 10);
  console.log(passwordHash);

  const passwordMatch = await bcrypt.compare(password, passwordHash);
  console.log(passwordMatch);
};
// securePassword("ansari123")

/*=============== Json Web Token Start ===================*/
// Authentication & Cookies | JSONWebToken (JWT) with Nodejs & MongoDB
const createToken = async () => {
  const token = await jwt.sign(
    { _id: "6607e0d80b44458f76f3dbfa" }, // object : string, "secretkey" 32 characters
    "mynameismohammadzeeshaniamawebdeveloper",
    {
      expiresIn: "5 seconds",
    }
  );
  console.log(token);

  const userVer = await jwt.verify(
    token,
    "mynameismohammadzeeshaniamawebdeveloper"
  );
  console.log(userVer);
};
createToken();
/*=============== Json Web Token End ===================*/

app.listen(port, () => {
  console.log(`Listening on the server ${port}`);
});
