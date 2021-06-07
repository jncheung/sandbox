const gql = require('graphql-tag')
const query = require('./query')
const { getOperationAST } = require('graphql')
// const operation = getOperationAST(query)
// const operationName = operation && operation.name
console.log(gql(query).definitions[0].selectionSet.selections)