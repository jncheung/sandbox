// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

let Request =  require('/opt/nodejs/appsync-graphql')
const query = require('./query.listOrganisations')
require('isomorphic-fetch');

const client = Request.initialiseClient()
exports.lambdaHandler = async (event, context) => {
    const AppSync = new Request()
    const payload = {
        operation: 'get',
        variables: {
            userID: 'fa8bfa61-c5d3-4430-92cb-af329cd6168b',
            orgID: 'ce17a1a1-6d89-4cfd-b651-76afc753fd18',
            filter: {
                orgID: {
                    eq: 'fa8bfa61-c5d3-4430-92cb-af329cd6168b'
                }
            }                
        },
        query: query,
        // queryName: `listOrganisations`    // complex opeartion doesnt provide queryname, return the full response body
    }

    const response = await AppSync.query(payload, client)  
    // console.log(response)
    return response
};

