// send email 
import nodemailer from 'nodemailer'

export default async function send_mail(email, subject, text, res) {

    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: 'ademolaidris2002@gmail.com',
            pass: 'tbyghkuhvvltfwlq',
        },
        secure: true,
    });

    await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });

    const mailData = {
        from: {
            name: `Email Scheduler App`,
            address: "'ademolaidris2002@gmail.com'm",
        },
        // replyTo: email,
        to: email,
        subject: subject,
        text: text,
        // html: `${text}`,
    };

    await new Promise((resolve, reject) => {
        // send mail
        transporter.sendMail(mailData, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log(info);
                resolve(info);
            }
        });
    });

    res.status(200).json({ status: "Email sent successfully" });
};