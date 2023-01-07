const Profile = require('../models/Profile');
const User = require('../models/User');

// When user saves or submits:
exports.put_updateProfile = async (req, res) => {
    try {
        const { newProfile } = req.body;
        const updatedProfile = await Profile.findByIdAndUpdate(newProfile._id, newProfile, { new: true });
        res.status(201).send({ message: "Profile update success.", data: updatedProfile })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }
}

exports.post_createProfile = async (req, res) => {
    try {
        const { newProfile, userId } = req.body;
        const createdProfile = await Profile.create(newProfile)
        const foundUser = await User.findByIdAndUpdate(userId, { profile: createdProfile._id }, { new: true });
        const updatedProfile = await Profile.findByIdAndUpdate(createdProfile._id, { user: foundUser._id }, { new: true });
        
        res.status(201).send({ message: "Profile creation success.", data: updatedProfile })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }
}