const { DynamoDB } = require('aws-sdk')
const {organisation} = require('./organisation')
const ddbc = new DynamoDB.DocumentClient({region:`us-east-2`, convertEmptyValues:true})

// console.log(ddbc)
let a = organisation.map(item=>{
    let UpdateExpression  = 'SET '
    Object.keys(item).map(i=>{ let partialExpression = `${i} = :${i},`; UpdateExpression = UpdateExpression.concat(partialExpression)})
    return (UpdateExpression)
})

console.log(a)
// Promise.all(organisation.map(({id, orgID, sortKey, deptID, locationID, itemType, assignedDepts, assignedRoles, assignedLocations, targetDepts, targetLocations, targetRoles, channelID, memberID, fullName, phoneNumber })=>{


//     return ddbc.update({
//         TableName: `Organisation-5zqssqlsuzc6zkf3qlqmcdt56m-dev`, 
//         Key: { 
//             orgID: orgID, 
//             sortKey: sortKey
//         }, 
//         UpdateExpression: ` SET 
//             itemType = :itemType, 
//             deptID = :deptID, 
//             locationID  = :locationID, 
//             createdAt = :now, 
//             targetDepts = :targetDepts, 
//             targetLocations = :targetLocations, 
//             targetRoles = :targetRoles, 
//             assignedLocations = :assignedLocations, 
//             assignedRoles = :assignedRoles, 
//             assignedDepts = :assignedDepts,
//             fullName = :fullName,
//             phoneNumber = :phoneNumber,
//             channelID = :channelID,
//             id = :id,
//             memberID = :memberID`,
//         // ConditionExpression: `${removeField}[${v[`${removeField}`].findIndex(isId)}] = :valueToRemove`,
//         ExpressionAttributeValues: {
//             ":itemType": itemType != undefined  ? itemType: null,
//             ":now": new Date().toISOString(),
//             ":assignedDepts": assignedDepts ,
//             ":assignedLocations": assignedLocations ,
//             ":assignedRoles":  assignedRoles ,
//             ":targetRoles": targetRoles ,
//             ":targetLocations": targetLocations ,
//             ":targetDepts": targetDepts ,
//             ":channelID": channelID ,
//             ":deptID": deptID ,
//             ":locationID": locationID ,
//             ":id": id ,
//             ":fullName": fullName ,
//             ":phoneNumber": phoneNumber ,
//             ":memberID": memberID ,

//         },
//         ReturnValues: "ALL_NEW"
//     }).promise()
// })).then(d=>console.log(d)).catch(e => console.log(e))


// // ":itemType": itemType != undefined  ? itemType: null,
// // ":now": new Date().toISOString(),
// // ":assignedDepts": assignedDepts != undefined ? assignedDepts : null,
// // ":assignedLocations": assignedLocations != undefined ? assignedLocations : null,
// // ":assignedRoles":  assignedRoles != undefined ? assignedRoles : null,
// // ":targetRoles": targetRoles != undefined ? targetRoles : null,
// // ":targetLocations": targetLocations != undefined ? targetLocations : null,
// // ":targetDepts": targetDepts != undefined ? targetDepts : null,
// // ":channelID": channelID != undefined ? channelID : null,
// // ":deptID": deptID != undefined ? deptID : null,
// // ":locationID": locationID != undefined ? locationID : null,
// // ":id": id != undefined ? id : null,
// // ":fullName": fullName != undefined ? fullName : null,
// // ":phoneNumber": phoneNumber != undefined ? phoneNumber : null,
// // ":memberID": memberID != undefined ? memberID : null


