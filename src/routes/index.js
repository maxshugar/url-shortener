const express = require('express');
const router = express.Router();

const shorten = require('./shorten');
const redirect = require('./redirect');

router.use('/', shorten);
router.use('/', redirect);

module.exports = router;