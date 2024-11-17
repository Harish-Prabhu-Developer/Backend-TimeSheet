// controllers/changeTFA.js
import registerdataschema from '../model/registerdataschema.js';

export const changeTFA = async (req, res) => {
  const { buildid, tfa } = req.params;

  try {
    // Find the user by ID
    const user = await registerdataschema.findById(buildid);
    

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update the TFA setting
    user.tfa = tfa;
    await user.save();

    res.status(200).json({ msg: 'TFA setting changed successfully', status: user.tfa });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
