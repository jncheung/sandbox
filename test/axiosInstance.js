const { S3 } = require('aws-sdk')
const bucketName = process.env.STORAGE_DESKLESSWORKERSS3_BUCKETNAME || `desklessworkers6f0c759c5eff4f78bc3d14042522ff88122149-dev`
const s3 = new S3()
const qs = require('qs')
const http = require('http')
const https = require('https')
const axios = require('axios')
const axiosRetry = require('axios-retry')
const rateLimit = require('axios-rate-limit');

const SDB_API_ID = process.env.SDB_API_ID||  "14A718245-7032-4F93-97D5-B07E954CF5CF";
const SDB_API_URL = process.env.SDB_API_URL || `https://api-4A718245-7032-4F93-97D5-B07E954CF5CF.sendbird.com/`;
// const SDB_API_URL = process.env.SDB_API_URL || `https://api-${SDB_API_ID}.sendbird.com/`;

const SDB_API_VERSION = process.env.SDB_API_VERSION || "v3";
const SDB_API_TOKEN = process.env.SDB_API_TOKEN || "efe2af9624fb4301c2563fbb907cbbf4039de2ac";

const { downloadProfilePhoto } = require('./sthree')
const FormData = require('form-data')

console.log('SDB_API_TOKEN', SDB_API_TOKEN)
console.log('SDB_API_URL', SDB_API_URL)
const logger = require('./logger')

let count = 0

let maxRequests = 20
let perMilliseconds = 1000

const rateLimitConfig = { maxRequests, perMilliseconds }
let ceilingRPS = 7, maxRPS = 7;
let formData, lastFilePath;

let arr1 = []
const sendbirdInstance = axios.create({
    baseURL: SDB_API_URL,
    headers:{
        "Api-Token": SDB_API_TOKEN    
    },
    timeout: 2000

})

// const sendbirdInstance = rateLimit(axios.create({
//     baseURL: SDB_API_URL,
//     headers:{
//         "Api-Token": SDB_API_TOKEN    
//     },
//     // timeout: 2000

// }), rateLimitConfig )

const createFormData = async ( path ) => {

    const photo = await downloadProfilePhoto( path )
    const form = new FormData()
    // nickname ? form.append(`nickname`, nickname) : null;
    photo ? form.append('profile_file', photo, { filename : 'photo.png', contentType: 'image/png', }) : null;
    return form
}

axiosRetry(sendbirdInstance, { retries: 2, shouldResetTimeout:true });

const reqHandler = (c)=>{

    // console.log(`c:` ,c)

    // console.log('getMaxRPS', sendbirdInstance.getMaxRPS())

    return c
}
const respHandler = (c)=>{
    // console.log('c.headers', c)
    // ceilingRPS = c.headers[`x-ratelimit-remaining`] < ceilingRPS ? c.headers[`x-ratelimit-remaining`]  : c.headers[`x-ratelimit-remaining`] /2  >= ceilingRPS ? c.headers[`x-ratelimit-remaining`] : ceilingRPS ;
    console.log('c.data.profile_url', c.data.profile_url)
    // console.log('ceilingRPS', ceilingRPS)
    // console.log('setMaxRPS', sendbirdInstance.setRateLimitOptions( { maxRequests: ceilingRPS, perMilliseconds: 1000 }  ))
    // logger.error(c.headers[`x-ratelimit-retryafter`] * 1000)
    console.log(count++)
    return c
    // return c.data.profile_url
}

const respErrHandler = async (error) => {
    try{
        console.log(error)
        const $error = { ...error.toJSON(), data: error.response.data = null, code: error.response.status = null, headers: error.response.headers }
        if ($error.config && $error.data && $error.code === 429) {
            if ($error.config.headers.filePath) { 
                if( lastFilePath !== $error.config.headers.filePath) {
                    formData = await createFormData( $error.config.headers.filePath )
                    lastFilePath = $error.config.headers.filePath
                    try { 
                        const retry = await sendbirdInstance.put(error.config.url, formData, {headers: formData.getHeaders(), filePath: error.config.headers.filePath})
                        return Promise.resolve(retry)
                    }catch(err){
                        return Promise.reject(err)
                    }
                }else {
                    const retry = await sendbirdInstance(error.config) 
                    return Promise.resolve(retry)
                }
            } else {
                const retry = await sendbirdInstance(error.config)
                return Promise.resolve(retry)
            }            
        }else if ($error.config && $error.data && $error.code !== 429) {
            //  TO-DO handle errors which are not 429

            // setTimeout(async () => {
                try { 
                    const rawRetry = await sendbirdInstance($error.config)
                    // console.log(rawRetry)
                    return Promise.resolve(rawRetry) 
                }
                catch(err) { 
                    return Promise.reject($error)
                }
            // }, $error.headers[`x-ratelimit-retryafter`] * 1200);
            

            // setTimeout(async () => {
            //     try { 
            //         const rawRetry = await sendbirdInstance($error.config)
            //         // console.log(rawRetry)
            //         return Promise.resolve(rawRetry) 
            //     }
            //     catch(err) { 
            //         return Promise.reject($error)
            //     }
            // }, $error.headers[`x-ratelimit-retryafter`] * 1200);
            logger.error(`error`)
        }
        else {
            console.log('else')
            return Promise.reject($error);
        }
    }
    catch(err){
        console.log(346)
        return Promise.reject(err)
    }

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
          return Qs.stringify(params, {arrayFormat: 'brackets'})
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


function makeRequestsFromArray(arr) {
    let index = 0;
    function request() {
        return sendbirdInstance(arr[index]).then((d) => {
        // return sendbirdInstance.request(arr[index].url, arr[index]).then((d) => {
            // console.log(d)
            index++;
            if (index >= arr.length) {
                return;
            }
            return request();
        });

    }
    return request();
}

// const test1 = async (arr)=> {
//     let promiseArray = []
//     let count, limit

//     arr.maps(async(element) => {

//         const resp = await sendbirdInstance.request( element )
//         console.log(resp)
//         return resp
//         // if (!limit){
//         //     const resp = await sendbirdInstance.request( acc )
//         //     console.log(resp)
//         //     return acc
//         //     // limit = resp.headers[`x-ratelimit-retryafter`]
//         //     // limit = resp.headers[`x-ratelimit-remaining`]
//         //     // limit = resp.headers[`x-ratelimit-retry`]
//         //     // return resp
//         // }
//         // else {
//         //     console.log(`item`)
//         //     return item
//         // }
//         // console.log(acc, item)
        
//         // return item
//         // let count, remaining;
//         // if (!remaining){
//         //     for(var i=0;i<arr.length;i++){
//         //         promiseArray.push(item)
//         //     }
//         // }
//     })

//     // console.log(promiseArray.length)
// }

// makeRequestsFromArray([0, 1, 2]);





sendbirdInstance.interceptors.request.use(reqHandler)
sendbirdInstance.interceptors.response.use(respHandler, respErrHandler)
module.exports = { sendbirdInstance, makeRequestsFromArray, sendbirdRequestBuilder }