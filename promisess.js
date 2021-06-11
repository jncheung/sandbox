console.time(1)
const axios = require('axios')
const qs = require('qs')
const _ = require('lodash')
const rateLimit = require('axios-rate-limit');

let maxRequests = 40
let perMilliseconds = 500
const rateLimitConfig = { maxRequests, perMilliseconds }

let arr = []
var i=0
var index = 0
var jade = 0
function test (arr){
    let responseArray = []
    function abc(){
        // return arr.map(d=>{
            
            // console.log(jade, arr[jade])
            return Promise.all(arr[jade]).then(d=>{
                responseArray.push(d)
                // console.log(responseArray)
                jade +=1; 
                if ( jade < arr.length ) return abc();
                else {
                    // console.log('responseArray', responseArray)
                    return responseArray
                    // return Promise.resolve(responseArray)
                }

                // return responseArray
            }).catch(err=>{
                responseArray.push(err)
                if ( jade < arr.length ) return abc();
                else {
                    // console.log('responseArray', responseArray)
                    return responseArray
                    // return Promise.resolve(responseArray)
                }
            })


                // return d.map(a=>{
                //     index +=1
                //     if(index <= arr.length ){
                //         // setTimeout((arr)=>{
                //         //     console.log(  arr[index]   )
                //         //     return abc()
                //         // }, 120, arr)
                //         // return sendbirdInstance.request(  arr[index]   ).then((d)=>{
                //         //     // if(!d.data.profile_url) {
                //         //     //     console.log(arr[index]   )
                //         //         // console.log(d.status, d)
                //         //         console.log(d.duration)
                //         //     // }
                //         //     responseArray.push({duration: d.duration, path :d.request.path})
                //         //     return abc()
                //         // }).catch(err=>console.log(err))
                        
                //         return abc()
                //     }else return responseArray;    
                // })
        // })
    }
    return abc()
    
}


const sendbirdRequestBuilder = ({method, endpoint, headers, data, params}) =>{
    // console.log({method, endpoint, headers, data, params})
    return {
        url: endpoint,
        method: method, // default
        baseURL: `https://api-4a718245-7032-4f93-97d5-b07e954cf5cf.sendbird.com/`,
        headers: headers,
        params: params,
        paramsSerializer: function (params) {
          return qs.stringify(params, {arrayFormat: 'brackets'})
        },
        data: data,
        responseType: 'json', // default
        responseEncoding: 'utf8', // default
        xsrfCookieName: 'XSRF-TOKEN', // default
        xsrfHeaderName: 'X-XSRF-TOKEN', // default
        maxContentLength: 2000,
        maxBodyLength: 100000,
        maxRedirects: 5, // default
        socketPath: null, // default
        // httpAgent: new http.Agent({ keepAlive: true }),
        // httpsAgent: new https.Agent({ keepAlive: true }),
    }
}

const sendbirdInstance = rateLimit(axios.create({
    baseURL: `https://api-4a718245-7032-4f93-97d5-b07e954cf5cf.sendbird.com/`,
    headers:{
        "Api-Token": `efe2af9624fb4301c2563fbb907cbbf4039de2ac`    
    },
    // timeout: 2000

}), rateLimitConfig )


sendbirdInstance.interceptors.request.use(function (config) {
 
    config.metadata = { startTime: new Date()}
    return config;
    }, function (error) {
        return Promise.reject(error);
});

sendbirdInstance.interceptors.response.use(function (response) {

    response.config.metadata.endTime = new Date()
    response.duration = response.config.metadata.endTime - response.config.metadata.startTime
    return response.duration;
    // return response.duration;
}, function (error) {
    error.config.metadata.endTime = new Date();
    error.duration = error.config.metadata.endTime - error.config.metadata.startTime;
    return Promise.reject(error);
});
for(;i<250;i++){
    arr.push( sendbirdInstance( sendbirdRequestBuilder( { method: `get`, endpoint: `/v3/users/ce100fb31c8c4b2c9d783367d7e2204b`, params: i} ) ) )
    
    // arr.push( sendbirdRequestBuilder( {method: `get`, endpoint: `/v3/users/${Math.floor(Math.random() * 50)}` }) )
}

test(_.chunk(arr, 5)).then(console.log)
// .then(console.log)