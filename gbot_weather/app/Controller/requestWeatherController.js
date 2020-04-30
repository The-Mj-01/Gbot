
const axios = require('axios');
const request = require('superagent');
const url = process.env.URL;
const token = process.env.MAP_TOKEN;
const moment = require('moment');
const weatherToken = process.env.WEATHER_KEY

module.exports=new class requestWeatherController {
    
    get(req , res , next){
        request.get(`https://map.ir/search/v2?text=${req.params.location}&x-api-key=${token}`,(err , response)=>{
            if(err){
                console.log(err);
                return res.sendStatus(500);
            }
            let lat = response.body.value[0].geom.coordinates[0];
            let lng = response.body.value[0].geom.coordinates[1];
            // res.json({lat , lng})
            // console.log({lat , lng})
            
            const location = {lat , lng};

            request.get(`https://api.darksky.net/forecast/${weatherToken}/${lat},${lng}` , (err,resp)=>{
                if(err){
                    console.log(err);
                    return res.sendStatus(500);
                }
                let temp = Math.round((resp.body.currently.temperature-32)*5/9)
                res.json({result: `${resp.body.currently.summary} at ${temp} degrees`});
            })
            

        });


        // const timestamp = +moment().format('X');

        // request.get(`http://worldtimeapi.org/api/timezone/Asia/${req.params.location}`,(err , response)=>{
        //     if(err){
        //         console.log(err);
        //         return res.sendStatus(500);
        //     }
            
        //     const result = response.body;
        //     const timeString = moment.unix(timestamp + result.dst_offset + result.raw_offset ).utc().format('dddd, MMMM Do YYYY, h:mm:ss a');
        //     res.json({ result : timeString });
        // });

   
    }
}



