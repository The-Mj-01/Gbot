const express = require('express');
const router = express.Router();
const requestTimeController = require('../Controller/requestTimeController')
const apiToken = '1258688959:AAG7e2fzKTMdItZlM2bI8Ueao_5U-jHjnvg';

router.get('/service/:location' ,  requestTimeController.get)

module.exports = router;
