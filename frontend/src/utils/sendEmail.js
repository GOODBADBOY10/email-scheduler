nodemailer.createTransport({
    host: "smtp.example.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "username",
      pass: "password",
    },
});


const sendEmail = async (title, time, description, emails) => {
    const transporter = nodemailer.createTransport({
        host: '',
        port: '',
        secure: false,
        auth: {
            user: '',
            password: '',
        },
    });

    const mailOptions = {
        from: '',
        to: '',
        subject: title,
        text: `Reminder: ${title} on ${time} \n \n ${description}`,
    };
}

export default sendEmail;