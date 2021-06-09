const { S3 } = require('aws-sdk')
const bucketName = process.env.STORAGE_DESKLESSWORKERSS3_BUCKETNAME || `desklessworkers6f0c759c5eff4f78bc3d14042522ff88122149-dev`
const s3 = new S3()

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
let formData, lastFilePath;

let arr1 = []
// const sendbirdInstance = axios.create({
//     baseURL: SDB_API_URL,
//     headers:{
//         "Api-Token": SDB_API_TOKEN    
//     },
//     timeout: 2000

// })

const sendbirdInstance = rateLimit(axios.create({
    baseURL: SDB_API_URL,
    headers:{
        "Api-Token": SDB_API_TOKEN    
    },
    timeout: 2000

}),{ maxRequests: 10, perMilliseconds: 500 })

const createFormData = async ( path ) => {

    const photo = await downloadProfilePhoto( path )
    const form = new FormData()
    // nickname ? form.append(`nickname`, nickname) : null;
    photo ? form.append('profile_file', photo, { filename : 'photo.png', contentType: 'image/png', }) : null;
    return form
}

// axiosRetry(sendbirdInstance, { retries: 2, shouldResetTimeout:true });

const reqHandler = (c)=>{
    return c
}
const resHandler = (c)=>{

    // if(c.headers[`x-ratelimit-remaining`] < 10 ) sendbirdInstance.setMaxRPS(5)
    // logger.debug(`getMaxRPS: ${sendbirdInstance.getMaxRPS()}`)
    return c.data.profile_url
}

const respErrHandler = async (error) => {
    
    // console.log(error.toJSON())
    // const $error = { ...error.toJSON(), }
    // if($error) console.log($error)

    const $error = { ...error.toJSON(), data: error.response.data, code: error.response.status }
    // console.log($error)
    if ($error.config && $error.data && $error.code === 429) {
            console.log(lastFilePath===$error.config.headers.filePath)

        if ($error.config.headers.filePath) { 
            // console.log(`${lastFilePath}: ${$error.config.headers.filePath}`)
            // console.log(lastFilePath===$error.config.headers.filePath)
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
                // console.log( 1 )
                // logger.warn(`not form`)
                // console.log(1, error.config )
                const retry = await sendbirdInstance(error.config) 
                console.log('retry',retry)
                return Promise.resolve(retry)

            }

        } else {
            const retry = await sendbirdInstance(error.config)
            console.log(`retry`, retry)
            return Promise.resolve(retry)
            // return retry
        }
        

        // if ($error.config && error.response) {
        // logger.warn(`[Axios ${error.response.status} Error]: `)

            // logger.warn(`[Axios 429]: Retying...`)
        // if(tdObj){
        //     logger.warn(`[Axios 429 Retry]: ${JSON.stringify(tdObj)}`)
        //     const newData = createFormData(tdObj.nickname, tdObj.photo)
            
            // try{
                // const retry = await sendbirdInstance.put(error.config.url, formData, {headers: formData.getHeaders(), filePath: error.config.headers.filePath})
        //         logger.warn(`[Axios 429 retry]: Success`)
                // console.log(retry)
        //         // Keep the Promise.all serial loop going
        //         return Promise.resolve(retry)
            // }
            // catch(err){
        //         handleAxiosError
        //         logger.error(`[Axios 429 Retry]: Error`)
                // console.log(err)
        //         // Reject with sendbird origin 429 error
        //         return Promise.reject(error)
            // }
        // }else return Promise.reject(error)

        return Promise.reject($error)
            
    }else if ($error.config && $error.data && $error.code !== 429) {
            //  TO-DO handle errors which are not 429
            console.log(123321123432)
        // ...
        try { 
            return Promise.resolve(await sendbirdInstance($error.config)) 
        }
        catch(err) { 
            console.log(123)
            console.log(err)
        }
    }
    else {
        console.log(`else`)
        return Promise.reject($error);
    }

}
sendbirdInstance.interceptors.request.use(reqHandler)

sendbirdInstance.interceptors.response.use(resHandler, respErrHandler)

module.exports = { sendbirdInstance }