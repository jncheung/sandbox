
const axiosRetry = require('axios-retry')
const rax = require('retry-axios');
const rateLimit = require('axios-rate-limit');
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const http = require('http');
const https = require('https');
require('dotenv').config()
const application_id = process.env.SDB_API_ID
const SDB_API_URL = process.env.SDB_API_URL
const SDB_API_VERSION = process.env.SDB_API_VERSION
const SDB_API_TOKEN = process.env.SDB_API_TOKEN
const SDB_USER_API_SERVICE = `users`
const sendbird = rateLimit(axios.create({
    baseURL: SDB_API_URL,
    headers:{
        "Api-Token": SDB_API_TOKEN    
    },
    // timeout: 2000

}),{ maxRequests: 20, perMilliseconds: 400 } )

axiosRetry(sendbird, { retries: 2, shouldResetTimeout: true });

const downloadProfilePhoto = async (key, bucketName = bucketName) =>{

    const params = { Bucket: bucketName, Key: key}
    logger.info(`[ProfilePhoto]: S3 Object bucket: ${bucketName} | key: ${key}`)
    try {
        const data = await s3.getObject(params).promise()

        return data.Body
    }catch(e){
        console.log(e)
        throw e
    }
    
};  

const reqHandler = (c)=>{
    return c
}
const resHandler = (c)=>{
    console.log(c.config.headers.index, 'remaining ', c.headers[`x-ratelimit-remaining`])
    console.log(c.config.headers.index, 'retryafter ', c.headers[`x-ratelimit-retryafter`])
    console.log(c.config.headers.index, 'reset ', c.headers[`x-ratelimit-reset`])
    // console.log(c.headers[`x-ratelimit-remaining`] > 5)
    if(c.headers[`x-ratelimit-remaining`] < 10 ) sendbird.setMaxRPS(5)
    console.log(`getMaxRPS: `,sendbird.getMaxRPS())
    return c
}

const errHandler =  async (error) => {
    // console.log(`[Axios ${error.response.status} Error]: `)
    // console.log(error)
    if (error.config && error.response && error.response.status === 429) {
        console.log(`[Axios 429]: Retying...`)
        if(tdObj){
            console.log(`[Axios 429 Retry]: ${JSON.stringify(tdObj)}`)
            const newData = createFormData(tdObj.nickname, tdObj.photo)
            
            try{
                const retry = await sendbird.put(error.config.url, newData, {headers: newData.getHeaders()})
                console.log(`[Axios 429 retry]: Success`)
                console.log(retry)
                // Keep the Promise.all serial loop going
                Promise.resolve(retry)
            }
            catch(err){
                console.log(`[Axios 429 Retry]: Error`)
                console.log(err)
                // Reject with sendbird origin 429 error
                Promise.reject(error)
            }
        }else  Promise.reject(error)

    }else if(error.config && error.response && error.code.match('ECONN')) {
        console.log(error)
        Promise.reject(error)
        //  TO-DO handle errors which are not 429
        // ...
    }
    // else if(error.code.match('ECONN')){ console.log(error);}
    else {
        console.log(error);
        Promise.reject(error);
    }
}

sendbird.interceptors.request.use(reqHandler)

sendbird.interceptors.response.use(resHandler, errHandler)


// sendbird.interceptors.response.use(null,err=>console.log(err.config.headers.index, err.response.code))
// let sendbirdList = [];

// (async()=>{

//     for (var i=0; i<100;i++){
//         sendbirdList.push(sendbird.get(`/${SDB_API_VERSION}/${SDB_USER_API_SERVICE}/8034babfc4094f2684790992fb52465c`, {headers: {index: i}}))
//         //  sendbird.get(`/${SDB_API_VERSION}/${SDB_USER_API_SERVICE}/8034babfc4094f2684790992fb52465c`, {headers: {index: i}})

//     }

// console.log(await Promise.all( sendbirdList ))

// })()

