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
        text:"",
        html: `<div style="width:'100%';"><img style="margin-left:-105px;padding-top:18px;" src="https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2FScreenshot_2022-09-25_111653-removebg-preview.png?alt=media&token=31ec55b6-9da2-41f3-8ea2-8a41c8904bd6" alt="logo" /><p style="margin-left:25px;">Hi ,</p><p style="margin-left:25px;">Your password reset code for the <span style="font-weight:bold">CatchBlog</span><h2 style="margin-left:25px;">${otp}</h2></p></div>`
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
module.exports = { main }