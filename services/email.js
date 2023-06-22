const nodemailer = require("nodemailer");

const sendEmail =async(des,subject,message)=>{
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
          user:process.env.SENDEREMAIL, // generated ethereal user
          pass: process.env.SENDERPASSWORD, // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: `"Saraha App 👻" <${process.env.SENDEREMAIL}>`, // sender address
        to: des, // list of receivers
        subject: subject, // Subject line
        html: message, // html body
      });
    
}
module.exports={sendEmail};