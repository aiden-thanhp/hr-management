const express = require("express");
const router = express.Router();
const passport = require("passport");
const houseController = require('../controllers/houseController');

router.get('/', houseController.get_houses);
router.post('/', houseController.add_house);
router.delete('/:id', houseController.delete_house);
router.get('/:_id', houseController.get_house);
router.get('/report/:id', houseController.get_report);
router.put('/report', houseController.add_report);
router.put('/comment', houseController.add_comment);
router.put('/report/:id/status', houseController.change_status);

module.exports = router;
