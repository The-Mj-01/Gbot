
const axios = require('axios');
const request = require('superagent');
const url = process.env.URL;
const token = process.env.MAP_TOKEN;
const moment = require('moment');

module.exports=new class requestTimeController {
    
    get(req , res , next){
        // request.get(`https://map.ir/search/v2?text=${req.params.location}&x-api-key=${token}`,(err , response)=>{
        //     if(err){
        //         console.log(err);
        //         return res.sendStatus(500);
        //     }
        //     let lat = response.body.value[0].geom.coordinates[0];
        //     let lng = response.body.value[0].geom.coordinates[1];
        //     res.json({lat , lng})
        //     const location = {lat , lng};

        // });

        const timestamp = +moment().format('X');

        request.get(`http://worldtimeapi.org/api/timezone/Asia/${req.params.location}`,(err , response)=>{
            if(err){
                console.log(err);
                return res.sendStatus(500);
            }
            
            const result = response.body;
            const timeString = moment.unix(timestamp + result.dst_offset + result.raw_offset ).utc().format('dddd, MMMM Do YYYY, h:mm:ss a');
            res.json({ result : timeString });
        });

   
    }
}



