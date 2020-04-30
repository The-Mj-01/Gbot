const service = require('../server');
const http = require('http');
const request = require('superagent');
const server = http.createServer(service);

const requestRoute = require('./Route');

service.use('/', requestRoute)





server.listen()
server.on('listening', function(){
    console.log(`Gbot_Time service is Listening on ${server.address().port} in ${service.get('env')} mode`);

    const announce = () => {
        request.put(`http://127.0.0.1:4000/service/time/${server.address().port}`, (err , res)=>{
            if(err){
                console.log(err);
                console.log('Error connecting to Gbot');
                return;
            }
            console.log(res.body)
        });
    };
    
    announce();
    setInterval(announce, 15*1000);

});