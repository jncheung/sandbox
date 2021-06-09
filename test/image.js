const { sendbirdInstance: sendbird } = require('./axiosInstance')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const FormData = require('form-data')
const fs = require('fs')

const { downloadProfilePhoto } = require('./sthree')

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
        const response = await sendbird.put(`/v3/users/${memberID}`, $form, {headers: {...$form.getHeaders(), filePath}} )
        // console.log(response)
        return response
        
    } catch (error) {
        console.log(error)
    }
    // logger.info(`[Photo]: ${JSON.stringify(response, null ,2)}`)
};

// (async()=>{await updateUserProfilePhoto(`ce100fb31c8c4b2c9d783367d7e2204b`)})()

let arr = []
for(var i = 0; i < 30; i++){
    (async()=>{
        const resp = await updateUserProfilePhoto(`ce100fb31c8c4b2c9d783367d7e2204b`)
        console.log(resp)
    })()
}

// Promise.all(arr)
// .then(console.log)
// .catch(err=>console.log(err))