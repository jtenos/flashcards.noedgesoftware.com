'use strict';

console.log('Loading function');
const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();

const allManagers = require("./managers/allManagers");
const appManager = allManagers.app;

/**
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.handler = (event, context, callback) => {
    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: (err && err.message) ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    appManager.test({}, (result) => {
        done(null, result);
    }, (result) => {
        done(result);
    });
    return;

    switch (event.httpMethod) {
        case 'DELETE':
            dynamo.deleteItem(JSON.parse(event.body), done);
            break;
        case 'GET':
            //done(null, "Hello");
            dynamo.scan({ TableName: event.queryStringParameters.TableName }, done);
            break;
        case 'POST':
            dynamo.putItem(JSON.parse(event.body), done);
            break;
        case 'PUT':
            dynamo.updateItem(JSON.parse(event.body), done);
            break;
        default:
            dynamo.scan({ TableName: "foo" }, done);
            break;
    }
};
