const router = require('express').Router();

const ProfileController = require('../controllers/ProfileController');

router.post('/', ProfileController.post_createProfile);
router.put('/', ProfileController.put_updateProfile);

module.exports = router;
router.get('/', ProfileController.get_getAllProfiles);
router.get('/:profileId', ProfileController.get_getProfileById);
router.put('/:profileId', ProfileController.put_updateProfile)
