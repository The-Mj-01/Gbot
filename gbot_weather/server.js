const express = require('express');
const service = express();
require("dotenv").config();

const bodyParser = require('body-parser');



service.use(bodyParser.json());


module.exports = service;

