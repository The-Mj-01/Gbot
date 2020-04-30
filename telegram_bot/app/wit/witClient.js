
const request = require('superagent');



module.exports = new class WitClient {
    ask(token , message , cb){
        
        request.get('https://api.wit.ai/message')
            .set('Authorization' , 'Bearer ' + token)
            .query({v :'20200428' })
            .query({q : message })
            .end((err , res)=>{
                if(err) return cb(err);
                if(res.statusCode != 200) return cb(`Expected status 200 but got ${res.statusCode}`);

                const witResponse = this.handleWitResponse(res.body);
                return cb(null , witResponse)
            })

        console.log(`ask : ${message}`);
        console.log(`token : ${token}`);
    }

    handleWitResponse(res){
        return res.entities;
    }
}