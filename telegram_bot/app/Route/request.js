const express = require('express');
const router = express.Router();
const requestController = require('../Controller/requestController')
const apiToken = '1258688959:AAG7e2fzKTMdItZlM2bI8Ueao_5U-jHjnvg';

// const bot = require('../helpers')

const bot = require('../Controller/requestController').getbot()

router.post(`/bot${apiToken}`, requestController.index2);

// router.post('/', requestController.index)

bot.onText(/\/echo (.+)/ , requestController.echo)

bot.on('message', requestController.message);

module.exports = router;
