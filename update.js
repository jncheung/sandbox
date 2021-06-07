const AWS = require('aws-sdk')
const ddbc = new AWS.DynamoDB.DocumentClient({region: `us-east-2`})


const query = async () =>{
    return await ddbc.query({
        TableName: "Organisation-5zqssqlsuzc6zkf3qlqmcdt56m-dev", 
    
        // FilterExpression: ' contains(assignedDepts, :aDepts) ',
        KeyConditionExpression: 'orgID = :pk and begins_with ( sortKey, :sk )',
        ExpressionAttributeValues: {
          ':pk': 'e32842c7-7c54-4786-be2b-5a7ab525a223', 
          ':sk': `MEMBER#`,
        //   ':aDepts': `123`
        }
    }).promise()
}


const remove = async () =>{
// const update = async ({tableName, orgID, sortKey, delete_field, delete_index}) =>{
    const { orgID, sortKey, delete_field, delete_index, assignedSize} = {
        orgID: "e32842c7-7c54-4786-be2b-5a7ab525a223",
        sortKey: "MEMBER#fdb7b1b6dfcf4548a982ab153a0cd075",
        delete_field: "assignedDepts",
        delete_index: 0
    }

    
    const tableName = "Organisation-5zqssqlsuzc6zkf3qlqmcdt56m-dev";
    try {

        const candidates = [
            {
              orgID: 'e32842c7-7c54-4786-be2b-5a7ab525a223',
              sortKey: 'MEMBER#e64523e5c77947c4b11a503507e3fc30',
              assignedDepts: [ '456', '123' ],
              assignedLocations: null,
              memberID: 'e64523e5c77947c4b11a503507e3fc30',
              __typename: 'Organisation'
            }
          ]
        const removealList = candidates.map((v)=>{ 
                const isId = (element) => element == removeId;
                return new Promise((resolve, rejectect)=>{
                    const resp = {
                            TableName: tableName, 
                            Key: { 
                                orgID: v.orgID, 
                                sortKey: v.sortKey
                            }, 
                            UpdateExpression: (assignedSize > 1)? `REMOVE ${removeField}[${v[`${removeField}`].findIndex(isId)}] SET updatedAt = :now` : `SET ${removeField} = :null, updatedAt = :now` ,
                            ConditionExpression: `${removeField}[${v[`${removeField}`].findIndex(isId)}] = :valueToRemove`,
                            ExpressionAttributeValues: {
                                ":valueToRemove": removeId,
                                ":null": null,
                                ":now": new Date().toISOString()
                            },
                            ReturnValues: "ALL_NEW"
                        }
                    resolve(resp)
                })

            })
            // return []
            return Promise.all(removealList)
    } catch (error) {
        console.log(error)
        throw error
    }

}

const add = async () =>{
// const update = async ({tableName, orgID, sortKey, delete_field, delete_index}) =>{
    const {tableName, orgID, sortKey, delete_field, delete_index} = {
        tableName : "Organisation-5zqssqlsuzc6zkf3qlqmcdt56m-dev",
        orgID: "e32842c7-7c54-4786-be2b-5a7ab525a223",
        sortKey: "MEMBER#fdb7b1b6dfcf4548a982ab153a0cd075",
        delete_field: "assignedDepts",
        delete_index: 0
    }
    return ddbc.update( {
        TableName: tableName, 
        Key: { 
            orgID: orgID, 
            sortKey: sortKey
        }, 
        UpdateExpression: `SET ${delete_field} = list_append(${delete_field}, :valueToAdd), updatedAt = :now`,
        // ConditionExpression: `not_contains(assignedDepts, :valueToAdd)`,
        ExpressionAttributeValues: {
            ":valueToAdd": ['123'],
            ":now": new Date().toISOString()
        },
        
        // ExpressionAttributeValues:{
        //     ":now": new Date.now().toISOString()
        // },
        ReturnValues: "ALL_NEW"
    }).promise()
}


function main () {
    const adds =  remove()
    const arr = []
    arr.push(adds)
    console.log(arr)
    return arr
    // return query()
}


(async ()=>{

    const candidates = [
        {
          orgID: 'e32842c7-7c54-4786-be2b-5a7ab525a223',
          sortKey: 'MEMBER#e64523e5c77947c4b11a503507e3fc30',
          assignedDepts: [ '456', '123' ],
          assignedLocations: null,
          memberID: 'e64523e5c77947c4b11a503507e3fc30',
          __typename: 'Organisation'
        }
      ]
      const f = `assignedDepts`
    console.log(candidates.map(v=>{return v[`${f}`].length > 1}))
    // const promiseall = Promise.all(main())
    // promiseall.then(async data =>{
    //     data.map(d=>console.log(d.Attributes))

    // })
    // console.log(await query())

    // const queryResp = Promise.all( main() )
    // console.log(queryResp)
    // const queryResp = await main()
    // console.log(queryResp)

})()