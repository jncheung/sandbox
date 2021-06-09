const { S3 } = require('aws-sdk')
const bucketName = process.env.STORAGE_DESKLESSWORKERSS3_BUCKETNAME || `desklessworkers6f0c759c5eff4f78bc3d14042522ff88122149-dev`
const s3 = new S3()


const downloadProfilePhoto = async (key =`protected/us-east-2:ea2a3c10-0275-4f3f-a993-95818abcf1a2/ProfilePhoto.png`, bucketName = process.env.STORAGE_DESKLESSWORKERSS3_BUCKETNAME || `desklessworkers6f0c759c5eff4f78bc3d14042522ff88122149-dev`) =>{

    const params = { Bucket: bucketName, Key: key}
    console.log('getting s3')
    // logger.info(`[ProfilePhoto]: S3 Object bucket: ${bucketName} | key: ${key}`)
    try {
        const data = await s3.getObject(params).promise()

        return data.Body
    }catch(e){
        console.log(e)
        throw e
    }
    
};  

module.exports = { downloadProfilePhoto };

// (async()=>{
//     console.log(await downloadProfilePhoto())
// })()