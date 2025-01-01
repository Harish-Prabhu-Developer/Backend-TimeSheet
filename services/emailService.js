import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: '',
    pass: ''
  }
});

export const sendOTP = (email, otp) => {
  const mailOptions = {
    from: 'harishpraharshu@gmail.com',
    to: email,
    subject: 'OTP',
     html: '<h1>HI THERE!</h1><p>Your OTP code is '+otp+'</p>'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

export const sendNewPasswordEmail = (email, newPassword) => {
    const mailOptions = {
      from: 'harishpraharshu@gmail.com',
      to: email,
      subject: 'Your New Password',
      text: `Your new password is ${newPassword}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  };
