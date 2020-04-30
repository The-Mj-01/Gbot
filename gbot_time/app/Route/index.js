
const express = require('express');
const router = express.Router();



requestRouter = require('./request')
router.use('/', requestRouter);


module.exports = router;