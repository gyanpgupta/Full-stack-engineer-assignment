require("dotenv").config();
const bcrypt = require("bcrypt");

const { generateAccessToken } = require("../auth/auth");
const { UserModel } = require("../models/userModel");

exports.sign_up = async (req, res) => {
  const { password, email, name } = req.body;

  await bcrypt

    .hash(password, parseInt(process.env.SALTROUNDS))
    .then(function (hash) {
      UserModel.create({
        name,
        email,
        password: hash,
      })
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.login = async (req, res) => {
  const { password, email } = req.body;

  UserModel.findOne({ where: { email } })
    .then(async (user) => {
      if (!user) {
        res.send({ status: 0, message: "You have enter wrong credentials." });
      } else {
        await bcrypt
          .compare(password.trim(), user.password)
          .then(async (result) => {
            if (result) {
              const token = await generateAccessToken();
              res.send({
                status: 1,
                message: "success",
                userId: user.id,
                userName: user.name,
                token,
              });
            } else {
              res.send({
                status: 0,
                message: "You have enter wrong credentials.",
              });
            }
          });
      }
    })
    .catch((err) => res.status(400).send(err));
};
