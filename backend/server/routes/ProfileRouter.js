const router = require('express').Router();

const ProfileController = require('../controllers/ProfileController');

router.post('/', ProfileController.post_createProfile);

module.exports = router