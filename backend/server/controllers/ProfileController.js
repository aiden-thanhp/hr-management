const Profile = require('../models/Profile');
const User = require('../models/User');

// When user saves or submits:
exports.put_updateProfile = async (req, res) => {
    try {
        const { profileId } = req.params
        const { newProfile } = req.body;
        const updatedProfile = await Profile.findByIdAndUpdate(profileId, newProfile, { new: true });
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

exports.get_getAllProfiles = async (req, res) => {
    try {
        const data = await Profile.find().populate('user');
        res.status(200).send({ message: "Get Profiles success.", data: data })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }
}

exports.get_getProfileById = async (req, res) => {
    try {
        const { profileId } = req.params
        const data = await Profile.findById(profileId).populate('user');
        res.status(200).send({ message: "Get Profile success.", data: data })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }
}