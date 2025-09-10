// server.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const cors = require('cors');

const app = express();
const port = 3003;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

app.get('/', function (req, res) {
    res.send('Welcome To Deveraa E-mail Service API.');
});

app.post('/mail', (req, res) => {
    const mailto = req.body.mailto;
    const subject = req.body.subject;
    const body = req.body.message;
    const username = req.body.username;
    const password = req.body.apppassword;
    const senderName = req.body.senderName;

    console.log("mailto:", mailto);
    console.log("subject:", subject);
    console.log("body:", body);
    console.log("username:", username);
    console.log("password:", password);
    console.log("senderName:", senderName);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: username,
            pass: password,
        },
    });

    const mailOptions = {
        from: `${senderName} <${username}>`, // Set the sender's name and email
        to: mailto,
        subject: subject,
        html: body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
