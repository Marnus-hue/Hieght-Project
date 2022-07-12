const { sendAndSaveHeight } = require('../controllers/userController');

const router = require('express').Router();

router.route('/').post(sendAndSaveHeight);

module.exports = router;
