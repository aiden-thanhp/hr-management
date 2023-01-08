const router = require('express').Router();

const ProfileController = require('../controllers/ProfileController');

router.post('/', ProfileController.post_createProfile);
router.put('/', ProfileController.put_updateProfile);

module.exports = router;
