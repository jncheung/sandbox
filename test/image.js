const { sendbirdInstance: sendbird, sendbirdRequestBuilder, makeRequestsFromArray } = require('./axiosInstance')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const FormData = require('form-data')
const fs = require('fs')

const { downloadProfilePhoto,  } = require('./sthree')

// console.log(text)



const getProfilePhotoFromS3 = async () => {
    const form = new FormData()
    const path = 'protected/us-east-2:ea2a3c10-0275-4f3f-a993-95818abcf1a2/ProfilePhoto.png'
    const photo = await downloadProfilePhoto(path)
    // const path = 'test/image/s1.png'
    // let bucket, key, region;
    // let {bucket, region, key} = profilePhoto
    // const file = fs.readFileSync(path)
    // The form requires dummy file name to successfully upload
    form.append('profile_file', photo, { filename : 'photo.png', contentType: 'image/png', })
    // form.append('profile_file', await downloadProfilePhoto(bucket, key), { filename : 'photo.png', contentType: 'image/png', })
    // const response = await joinGroupChannel(memberID, form)

    return {form, path}
    // return response

}

const updateUserProfilePhoto = async (memberID) =>{
    const {form: $form, path: filePath} = await getProfilePhotoFromS3();
    // console.log($form)

    try {
        const response = {endpoint: `/v3/users/${memberID}`, data: $form, headers: {...$form.getHeaders(), filePath } }
        // console.log(response)
        return response
        
    } catch (error) {
        console.log(error)
    }
    // logger.info(`[Photo]: ${JSON.stringify(response, null ,2)}`)
};

// (async()=>{await updateUserProfilePhoto(`ce100fb31c8c4b2c9d783367d7e2204b`)})()

let arr = []
const s3Object = getProfilePhotoFromS3();

s3Object.then(({form: $form, path: filePath})=>{
    let j=0;
    for(var i = 0; i < 200; i++){
       arr.push(sendbird ( sendbirdRequestBuilder( {method: `get`, endpoint: `/v3/users/ce100fb31c8c4b2c9d783367d7e2204b` }) ) )
    }
    Promise.all(arr).then(d=>console.log(d.data.profile_url)).catch(err=>console.log(err))
})



// for(var i = 0; i < 30; i++){
//     (async()=>{
//         try {
//             const resp = await updateUserProfilePhoto(`ce100fb31c8c4b2c9d783367d7e2204b`)
//             arr.push(resp)   
// console.log(arr.length)
//         } catch (error) {
//             arr.push(error)
// console.log(arr.length)
//         }
//     })()
// }


// Promise.all(arr)
// .then(console.log)
// .catch(err=>console.log(err))