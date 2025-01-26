const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
    },
});

const sendEmail = async (to, subject, text) =>{
    try{
        const mailOptions = {
            from:process.env.EMAIL_USER,
            to,
            subject,
            text,
            html,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent:${info.response}`);
        return info;
    } catch(err){
        console.error(`Error sending email: ${err}`);
        throw error;
    }
};

module.exports = sendEmail;