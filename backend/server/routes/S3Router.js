const router = require('express').Router();

const S3Controller = require('../controllers/S3Controller');

router.get('/', S3Controller.get_getS3URL);

module.exports = router