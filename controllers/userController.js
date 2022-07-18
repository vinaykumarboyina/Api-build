const db = require("../models");
const Users = db.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const mail = (gmail, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ck301878@gmail.com",
      pass: "antasyyiprcsjuxw",
    },
  });

  const mailOptions = {
    from: "ck301878@gmail.com",
    to: gmail,
    text: text,
    subject: "sending mail",
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log("Error msg", err.message);
    } else {
      console.log(data);
    }
  });
};

class userApicalls {
  addUser = async (req, res) => {
    console.log(req.body)
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 5);
    try {
        const userexist = await Users.findOne({
            where: { username: req.body.username},
          });
        if(userexist!==null){
            res.send("User Already Exists")
        }
        else{
            const user = await Users.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                password: hashedPassword,
              });
              res.status(200).send(user);
        }
      
    } catch (error) {
      res.send("error:", error);
    }
  };

  loginUser = async (req, res) => {
    const userexist = await Users.findOne({
      where: { username: req.body.username },
    });
    if (userexist === null) {
      res.send("user name is incorrect").status(200);
    } else {
      const isMatched = await bcrypt.compare(
        req.body.password,
        userexist.password
      );
      console.log(isMatched);
      if (isMatched) {
        const token = jwt.sign(req.body.mail, "kljfbbvafgvthbbjhfs");
        res.send({ result: "Login successfull", Jwt: token }).status(200);
        mail(req.body.username, "log in successful");
      } else {
        res.send("password is incorrect").status(400);
      }
    }
  };

  getAllUsers = async (req, res) => {
    try {
      const users = await Users.findAll({});
      res.status(200).send(users);
    } catch (error) {
      console.log(error);
      res.send("error :", error);
    }
  };

  getOneUser = async (req, res) => {
    try {
      const user = await Users.findOne({ where: { id: req.params.id } });
      res.status(200).send(user);
    } catch (error) {
      console.log(error);
      res.send("error :", error);
    }
  };

  updateUser = async (req, res) => {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 5)
    try {
      const user = await Users.update(
        {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: hashedPassword,
          },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).send(user);
    } catch (error) {
      console.log(error);
    }
  };

  deleteUser = async (req, res) => {
    try {
      const user = await Users.destroy({ where: { id: req.params.id } });
      res.send("user Deleted").status(200);
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = new userApicalls();
