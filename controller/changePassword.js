import registerdataschema from '../model/registerdataschema.js';
import bcrypt from 'bcrypt';

export const changePassword = async (req, res) => {
  const { buildid, oldpass, newpass } = req.params;

  try {
    const user = await registerdataschema.findById(buildid);

  
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const isMatch = await bcrypt.compare(oldpass, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid old password' });
    }

    user.password = newpass;
    await user.save();

    res.status(200).json({ msg: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
