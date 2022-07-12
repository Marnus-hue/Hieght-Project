const CustomApiErrorHandler = require('../utils/CustomApiErrorHandler');
const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');

// mailgun configuration
const mg = require('mailgun-js');

const mailgun = () =>
  mg({
    apiKey: process.env.API_KEY,
    domain: process.env.DOMAIN,
  });

exports.sendAndSaveHeight = async (req, res) => {
  const { name, height, email } = req.body;
  if (!name || !height || !email)
    throw new CustomApiErrorHandler('Please provide all the values', 400);

  await User.create({ name, height });

  const heightUser = await User.findOne({ name, height });

  //   Calculate average
  const allUsers = await User.find();
  const allUsersHeight = Object.values(allUsers);
  const countDocuments = await User.estimatedDocumentCount();
  const sumHeights = allUsersHeight.reduce((acc, curr) => acc + curr.height, 0);
  const average = (sumHeights / countDocuments).toFixed(2);

  //   send Email

  // send email to user
  const subject = 'Height Info';

  // email message
  const message = `Your height is ${heightUser.height} and the average height is ${average}`;

  const data = {
    from: 'Admin <BadenhorstMarthinus21@gmail.com>',
    to: `${email}`,
    subject: `${subject}`,
    html: `<p>${message}</p>`,
  };

  mailgun()
    .messages()
    .send(data, (error, body) => {
      if (error) {
        res.status(500).json({ message: 'Error in sending the email' });
      } else {
        res.status(200).json({ message: 'Email sending to user successfully' });
      }
    });
};
