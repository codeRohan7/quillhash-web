const nodemailer = require('nodemailer');
const mailConstructor = require('../mail_templates');
const Mailgun = require('mailgun-js');

var api_key = 'a76ad96e7c576853e383a6c8bd0544b2-816b23ef-000bb7c1';
var domain = 'mail.quillhash.co.uk';

const mailgun = new Mailgun({apiKey: api_key, domain: domain});

// const mailer = ({ mailType, to, data }) => {
//
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'colossus.test.org@gmail.com',
//       pass: 'pw-testorgcollosus'
//     }
//   });
//
//   const sendMail = ({ subject = 'Subject not defined', html = '<h3>Text Unavailable</h3>' }) => {
//     //return new Promise((resolve, reject) => {
//     const from = '"collosius 👻" <admin@collosius.com>'; // sender address
//     const mailOptions = {
//       from,
//       to, // list of receivers
//       subject, // Subject line
//       //text, // plain text body
//       html // html body
//     };
//
//     // send mail with defined transport object
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         return console.log(error);
//       }
//       console.log('Message sent: %s', info.messageId);
//       console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//       return;
//     });
//     //});
//   };
//
//   const mailContent = mailConstructor({ mailType,data });
//   const subject = mailContent.subject,
//     html = mailContent.html;
//
//   sendMail({ to, subject, html });
//
// };

const mailer = ({ mailType, to, data }) => {

  const sendMail = ({ subject = 'Subject not defined', html = '<h3>Text Unavailable</h3>' }) => {

    const from = 'postmaster@mail.quillhash.com'; // sender address
    let mailOptions = {
      from: from,
      to: to,
      cc : 'preetam@quillhash.com',
      subject: subject,
      html: html
    }

    mailgun.messages().send(mailOptions, (err, body) => {
      //If there is an error, render the error page
      if (err) {

        return  console.log('got an error: ', err);
      }
      //Else we can greet    and leave
      else {

        console.log(body);
      }
    });
  }

  const mailContent = mailConstructor({ mailType,data });
  const subject = mailContent.subject,
    html = mailContent.html;

  sendMail({ to, subject, html });

};


module.exports = mailer;
