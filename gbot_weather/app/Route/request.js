const express = require('express');
const router = express.Router();
const requestWeatherController = require('../Controller/requestWeatherController')
const apiToken = '1258688959:AAG7e2fzKTMdItZlM2bI8Ueao_5U-jHjnvg';

router.get('/service/:location' ,  requestWeatherController.get)

module.exports = router;
