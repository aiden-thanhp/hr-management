const router = require('express').Router();

const ProfileController = require('../controllers/ProfileController');

router.put('/', ProfileController.put_updateProfile);

module.exports = router