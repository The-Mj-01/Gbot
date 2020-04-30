const service = require('../server');
const http = require('http');

const server = http.createServer(service);
const port = process.env.PORT;
const requestRoute = require('./Route');






service.use('/', requestRoute)




server.listen(port)
server.on('listening', function(){
    console.log(`service Listening on port ${port}`)
});