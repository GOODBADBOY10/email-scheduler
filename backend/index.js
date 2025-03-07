import nodemailer from 'nodemailer'
import express from 'express'
import cors from 'cors'
import send_email from "./utils.js"


const app = express()
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.send('Hello from server please work');
})

app.get('/api/health', (req, res) => {
  res.send('Up and Running');
})

app.post('/api/send-email', async (req, res) => {
  const { email, subject, text } = req.body
  try {
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
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('error', error)
      } else {
        console.log('email send', info.response)
      }
    });
    res.send('Email sent successfully');
  } catch (error) {
    console.error(error)
  }
})

app.post('/api/send-email-2', async (req, res) => {
  const { email, subject, text } = req.body
  try {
    send_email(email,subject,text, res)
    console.log('Email sent to ' + email)
  } catch (e) {
    console.error(e)
  }
})

app.listen(3000, () => {
  console.log('server listening on port 3000');
});
