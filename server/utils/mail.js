const nodemailer = require("nodemailer");

async function main(otp, email) {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${process.env.email}`,
            pass: `${process.env.password}`,
        },
    });

    let info = await transporter.sendMail({
        from: 'CatchBlog',
        to: [`${email}`],
        subject: "Reset Password || OTP",
        text: `otp=${otp}`
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
module.exports = { main }