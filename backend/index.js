import nodemailer from 'nodemailer'
import express from 'express'
import cors from 'cors'


const app = express()
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
  extended: true
}));

app.post('/api/send-email', (req, res) => {
  const { email, subject, text } = req.body
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'ademolaidris2002@gmail.com',
      pass: 'tbyghkuhvvltfwlq',
    }
  });
  
  const mailOptions = {
    from: 'ademolaidris2002@gmail.com',
    to: email,
    subject,
    text,
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log('error', error)
    } else {
      console.log('email send', info.response)
    }
  });
  res.send('Email sent successfully');
})

app.listen(3000, () => {
  console.log('server listening on port 3000');
});