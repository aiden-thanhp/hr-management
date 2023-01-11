const User = require('../models/User');
const jwt = require('jsonwebtoken');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const RegistrationToken = require('../models/RegistrationToken');
const passwordForMAC = 'pmsyvtqjtnrutlyg';
const passwordForPC = 'dzbbhumircagrgci';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: passwordForMAC,
    // pass: passwordForPC,
  },
});
exports.send_token = async (req, res) => {
  try {
    const email = req.body.email;
    const name = req.body.name;
    const timeStamp = new Date();
    const regisToken = jwt.sign(
      { email: email, name: name, timeStamp: timeStamp },
      process.env.JWT_KEY,
      {
        expiresIn: 60, // token expired time for demo
        // expiresIn: 60*60*3, // actual expired time for the application
      }
    );
    const options = {
      from: process.env.EMAIL,
      to: email,
      subject: `Welcome to Beaconfire, ${name}`,
      text: `Hi, ${name}, this is the link for you to register http://localhost:4200/register/${email}`,
    };
    const registrationToken = await RegistrationToken.findOneAndUpdate(
      {
        email: email,
      },
      {
        name: name,
        registrationToken: regisToken,
        timeStamp: timeStamp,
        user: null,
      },
      { new: true }
    );
    if (!registrationToken) {
      await RegistrationToken.create({
        email: email,
        name: name,
        registrationLink: `http://localhost:4200/register/${email}`,
        registrationToken: regisToken,
        timeStamp: timeStamp,
        user: null,
      });
    }
    transporter.sendMail(options, (err, info) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('sent: ' + info.response);
    });
    res.json({ email: email });
  } catch (error) {
    console.error(error);
  }
};

exports.send_email = async (req, res) => {
  const { email, subject, text } = req.body;
  const options = {
    from: process.env.EMAIL,
    to: email,
    subject,
    text,
  };

  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('sent: ' + info.response);
  });
  res.json({ email: email })
}
