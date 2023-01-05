const Profile = require('../models/Profile')

// When user saves or submits:
exports.put_updateProfile = async (req, res) => {
    try {
        const { newProfile } = req.body;
        
        // Check if Jun has auth middleware
        // to compare user to see if they have
        // authorization to update Profile?
        // Check if they are HR, HR cannot edit
        // user profile. Actually, only user
        // can edit user profile.


        // What to authorize?
        // Only HR can change onboardingStatus, and optStatus
        // Only user can update other information
        // Only when status of onboarding is approved, user can update other document;
        if (true) {
            const updatedProfile = await Profile.findByIdAndUpdate(newProfile._id, newProfile, { new: true });
            res.status(201).send({ message: "Profile update success.", data: updatedProfile })
        } else {
            res.status(403).send({ message: "You are not authorized to update user profile." })
        }
    } catch (error) {
        console.log(error)
    }
}