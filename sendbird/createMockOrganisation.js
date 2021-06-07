const axios = require('axios')
const SDB_API_TOKEN = process.env.SDB_API_TOKEN || "a479b378cd50b9bd77daa067a853441dd25eb0fb";
const { organisation, member } = require('./data/sendbird')

const axiosRetry = require('axios-retry')
axiosRetry(axios, { retriesDelay: axiosRetry.expenentialDelay, retries: 2 } )
const _ = require('lodash')

require('isomorphic-fetch');


// Create Channel #: https://sendbird.com/docs/chat/v3/platform-api/guides/group-channel#2-create-a-channel
// POST https://api-{application_id}.sendbird.com/v3/group_channels


// const readMember =  () =>{

// //    return member.map(m=>{
//     // 
//     //   return [createMember(m),  createOrganisation(m)]
//     // }).flat()
//     // return member.map(m=> createMember(m))
    
// }



const createChannel = () =>{
    return organisation.map(({itemType, deptID, channelID, locationID, memberID})=>{

        let data = {
            "name": "Admin",
            "channel_url": `sys_channel_${memberID}`,
            // "cover_url": "https://sendbird.com/main/img/cover/cover_08.jpg",
            "custom_type": "Sys",
            "is_distinct": true,
            "inviter_id": memberID,
            "user_ids": [memberID]
        }

        if (itemType == `LOC`) {
            data.name = locationID
            data.is_distinct = false
            data.channel_url = `loc_channel_${locationID.replace(/-/g, '')}`
            delete data[`inviter_id`]
            delete data[`user_ids`]
            delete data[`custom_type`]

        }
        else if (itemType == `DEPT`) {
            data.name = deptID

            data.is_distinct = false
            data.channel_url = `dept_channel_${deptID.replace(/-/g, '')}`
            delete data[`inviter_id`]
            delete data[`user_ids`]
            delete data[`custom_type`]

        }
        else if (itemType == `CHANNEL`) {
            data.name = channelID

            data.is_distinct = false
            data.channel_url = `channel_${channelID.replace(/-/g, '')}`
            delete data[`inviter_id`]
            delete data[`user_ids`]
            delete data[`custom_type`]
        }
        return axios({
            url: "/group_channels",
            method: 'post', // default: get
            data: JSON.stringify(data),
            baseURL: `https://api-FC530D5E-C925-4D24-98E0-4D5586CF0E6D.sendbird.com/v3`,
            headers: {
                "Content-Type": "application/json; charset=utf8",
                "Api-Token": SDB_API_TOKEN    
            } 
        })
                    
        // return axios({
        //     url: "/group_channels",
        //     method: 'post', // default: get
        //     data: JSON.stringify({
        //         "name": "Admin",
        //         "channel_url": `sys_channel_${memberID}`,
        //         // "cover_url": "https://sendbird.com/main/img/cover/cover_08.jpg",
        //         "custom_type": "Sys",
        //         "is_distinct": true,
        //         "inviter_id": memberID,
        //         "user_ids": [memberID]
        //     }),
        //     baseURL: `https://api-FC530D5E-C925-4D24-98E0-4D5586CF0E6D.sendbird.com/v3/`,
        //     headers: {
        //         "Content-Type": "application/json; charset=utf8",
        //         "Api-Token": SDB_API_TOKEN    
        //     } 
        // })
                
    })
}


// POST https://api-{application_id}.sendbird.com/v3/users
const createMember = () => {
   
    return member.map(({orgID, memberID})=>{
        return axios({
            method: 'post', // default: get
            url: `/users`,
            baseURL: `https://api-FC530D5E-C925-4D24-98E0-4D5586CF0E6D.sendbird.com/v3`,
            headers: {
                "Content-Type": "application/json; charset=utf8",
                "Api-Token": SDB_API_TOKEN    
            },
            data: {
                user_id: memberID,
                nickname: memberID,
                profile_url: '',
                metadata: {
                    organisationId: orgID,
                },
                discovery_key:[orgID],
                issue_access_token: true
            }
        })
    })
    
}

const listChannel = async () => {
    // GET https://api-{application_id}.sendbird.com/v3/
    let promiseList = []
    // for (let i = 0; i < 80; i++){ 
        return ( await axios({
            method: 'get', // default: get
            url: `/group_channels`,
            baseURL: `https://api-FC530D5E-C925-4D24-98E0-4D5586CF0E6D.sendbird.com/v3`,
            headers: {
                "Content-Type": "application/json; charset=utf8",
                "Api-Token": SDB_API_TOKEN    
            },
            params: {
                metadata_key: "tester",
                metadata_values: "123"
            }
        }) )
        // promiseList.push(axios({
        //     method: 'get', // default: get
        //     url: `/group_channels`,
        //     baseURL: `https://api-FC530D5E-C925-4D24-98E0-4D5586CF0E6D.sendbird.com/v3`,
        //     headers: {
        //         "Content-Type": "application/json; charset=utf8",
        //         "Api-Token": SDB_API_TOKEN    
        //     },
        //     params: {
        //         // user_id: memberID,
        //         // nickname: memberID,
        //         // profile_url: '',
        //         // metadata: {
        //         //     organisationId: orgID,
        //         // },
        //         // discovery_key:[orgID],
        //         // issue_access_token: true
        //     }
        // }))
    // }

    return promiseList
}



const main = async() =>{

    // Promise.all(createMember())
    // .then (members=> 
        
    //     createChannel().then(async cc=>{
    //     }).catch(err=>console.log(err))
    // ).catch(err=>console.log(err))

    const promise = await listChannel()
    console.log(promise.data.channels)
        // TO-DO Loop resolve and implement throttling.
}


main()