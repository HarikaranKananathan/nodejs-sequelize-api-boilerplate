const express = require('express');
const router = express.Router();

/** home route */
router.use('/', require('./router/home.router'));

module.exports = router;
