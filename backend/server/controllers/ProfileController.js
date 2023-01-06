const Profile = require('../models/Profile')

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
        const { newProfile } = req.body;
        const createdProfile = await Profile.create(newProfile)
        res.status(201).send({ message: "Profile creation success.", data: createdProfile })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }
}