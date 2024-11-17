import crypto from 'crypto';
import bcrypt from 'bcrypt';
import registerdataschema from '../model/registerdataschema.js';
import { sendNewPasswordEmail } from '../services/emailService.js';

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.params;

    // Check if the user exists
    const user = await registerdataschema.findOne({ email });
    if (!user) {
      console.log('User does not exist');
      return res.status(400).json({ msg: 'User does not exist' });
    }

    // Generate a new password
    const newPassword = crypto.randomBytes(4).toString('hex'); // Generate an 8-character password
    console.log('Generated new password:', newPassword);

    // Hash the new password
 /*   const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log('Hashed new password:', hashedPassword);

    // Update the user's password in the database
   // user.password = hashedPassword;*/
    user.password = newPassword;

    const savedUser = await user.save();
    console.log('Updated user:', savedUser);

    // Send the new password to the user's email
    sendNewPasswordEmail(email, newPassword);

    return res.status(200).json({ msg: 'New password sent to your email' });
  } catch (error) {
    console.error('Error updating password:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
