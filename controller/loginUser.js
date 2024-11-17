import crypto from 'crypto';
import OTP from '../model/OTPSchema.js';
import { sendOTP } from '../services/emailService.js';
import registerdataschema from '../model/registerdataschema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.params;
    const JWT_SECRET_KEY="hfkdjshjkhjkfhdsgh34652778y87@#&$*sfhdhlhljhdsjgdfhjkgffhds";
    // Find the user by email
    const user = await registerdataschema.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    const pass =user.password;
    console.log("password : ",password);
    console.log("DB Pass : ",pass);
    if (!isMatch) {
      return res.status(400).json({ msg: "login mismatch" });
    }

    // Check if 2FA is enabled
    if (user.tfa) {
      // Generate a random OTP
      const otp = crypto.randomBytes(3).toString('hex'); // 6-digit OTP

      // Save OTP to the database
      const newOTP = new OTP({
        email,
        otp
      });
      await newOTP.save();

      // Send OTP to the user's email
      sendOTP(email, otp);

      return res.status(200).json({ msg: "otp sent" });
    } else {
      // Create a JWT token
      const token = jwt.sign(
        { BuildID: user._id,
          uemail: user.email, 
          uname: user.name,
          udept: user.dept,
          uservices: user.services,
          ulevel: user.Userlevel,
          uiat:user.iat,
          utfa:user.tfa },
        JWT_SECRET_KEY, // Replace with your secret key
        //{ expiresIn: '1h' }
      );

      return res.status(200).json({
        msg: "success",
        token,
      });
    }
  } catch (error) {
      console.log(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
    
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.params;
    const JWT_SECRET_KEY="hfkdjshjkhjkfhdsgh34652778y87@#&$*sfhdhlhljhdsjgdfhjkgffhds";
    // Find the OTP entry
    const otpEntry = await OTP.findOne({ email, otp });
    if (!otpEntry) {
      return res.status(400).json({ msg: "OTP mismatch" });
    }

    // Create a JWT token
    const user = await registerdataschema.findOne({ email });
    const token = jwt.sign(
      { BuildID: user._id,
        uemail: user.email, 
        uname: user.name,
        udept: user.dept,
        uservices: user.services,
        ulevel: user.Userlevel,
        uiat:user.iat,
        utfa:user.tfa },
      JWT_SECRET_KEY, // Replace with your secret key
      //{ expiresIn: '1h' }
    );

    

    // Delete the OTP entry after successful verification
    await OTP.deleteOne({ _id: otpEntry._id });

    return res.status(200).json({
      msg: "success",
      token,
     
    });
  } catch (error) {
    console.log(error.toString())
    return res.status(500).json({ error: "Internal Server Error"});
  }
};
