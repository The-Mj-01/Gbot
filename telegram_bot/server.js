const express = require('express');
const service = express();
const ServiceRegistry = require('./serviceRegistry');
require("dotenv").config();

const bodyParser = require('body-parser');


service.set('serviceRegistry', ServiceRegistry);

service.put('/service/:intent/:port', (req , res , next)=>{
    const serviceIntent = req.params.intent;
    const servicePort = req.params.port;


    const serviceIp = req.connection.remoteAddress.includes('::')
    ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;

    ServiceRegistry.add(serviceIntent, serviceIp , servicePort);
    // res.json({ result : `${serviceIntent} at ${serviceIp}:${servicePort}`});

})

service.use(bodyParser.json());


module.exports = service;

