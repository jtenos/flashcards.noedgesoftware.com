"use strict";

const aws = require("aws-sdk");
const config = require("./config");

aws.config.update({
    region: config.awsRegion,
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey
});

const dynamo = new aws.DynamoDB();
const docClient = new aws.DynamoDB.DocumentClient();

let dataAccess = module.exports = {

    // options: { modelType }
    createTable: (options, callback) => {
        let params = {
            TableName: options.modelType.getTableName(),
            ProvisionedThroughput: {
                ReadCapacityUnits: 1, 
                WriteCapacityUnits: 1
            }
        };
        let primaryKey = new options.modelType().getKey();
        let fieldNames = [];
        for (let k in primaryKey) {
            if (primaryKey.hasOwnProperty(k)) {
                fieldNames.push(k);
            }
        }
        if (fieldNames.length == 1) {
            params.KeySchema = [
                { AttributeName: fieldNames[0], KeyType: "HASH" }
            ];
            params.AttributeDefinitions = [
                { AttributeName: fieldNames[0], AttributeType: "S" }
            ];
        } else if (fieldNames.length == 2) {
            params.KeySchema = [
                { AttributeName: fieldNames[0], KeyType: "HASH" },
                { AttributeName: fieldNames[1], KeyType: "RANGE" }
            ];
            params.AttributeDefinitions = [
                { AttributeName: fieldNames[0], AttributeType: "S" },
                { AttributeName: fieldNames[1], AttributeType: "S" }
            ];
        }

        dynamo.createTable(params, callback);
    },

    // same options as getMany
    getOne: (options, callback) => {
        dataAccess.getMany(options, (err, items) => {
            if (err) {
                callback(err);
            } else {
                callback(null, items[0]);
            }
        });
    },

    // options: { modelType, whereClauses, retrievalType }
    // whereClauses: { personID: "123", name: "John" }
    // retrievalType: "query" or "scan" - defaults to "query" - if you're not querying by primary key, then you must select "scan"
    getMany: (options, callback) => {
        try {

            options.retrievalType = options.retrievalType == "scan" ? "scan" : "query";
            let conditionPropertyName = options.retrievalType == "scan" ? "FilterExpression" : "KeyConditionExpression";

            let params = {
                TableName : options.modelType.getTableName()
            };

            if (options.whereClauses) {
                let expressionAttributeNames = {};
                let expressionAttributeValues = {};
                let conditionExpression = "";

                for (let key in options.whereClauses) {
                    if (options.whereClauses.hasOwnProperty(key)) {
                        let hashKey = "#" + key;
                        let colonKey = ":" + key;

                        expressionAttributeNames[hashKey] = key;
                        expressionAttributeValues[colonKey] = options.whereClauses[key];

                        if (conditionExpression) {
                            conditionExpression += " and ";
                        }
                        conditionExpression += `${hashKey} = ${colonKey}`;
                    }
                }
                params.ExpressionAttributeNames = expressionAttributeNames;
                params.ExpressionAttributeValues = expressionAttributeValues;
                params[conditionPropertyName] = conditionExpression;
            }

            docClient[options.retrievalType](params, (err, data) => {
                if (err) {
                    callback(err);
                } else {
                    let items = data ? data.Items : [];
                    callback(undefined, items);
                }
            });

        } catch (ex) {
            callback(`${ex}: dataAccess.getMany`);
        }
    },

    // options: { dataObject }
    insert: (options, callback) => {
        console.log("Inserting " + JSON.stringify(options.dataObject));
        try {
            var params = {
                TableName: options.dataObject.getTableName(),
                Item: options.dataObject
            };

            docClient.put(params, callback);
        } catch (ex) {
            callback(`${ex}: dataAccess.insert`, null);
        }
    },

    // options: { 
    // dataObject, // {/* the account object */}
    // updateExpression, // "set currentBalance = :bal, balanceDate = :dt";
    // updateValues // { bal: amount, dt: moment().format("YYYYMMDDHHmmss") }
    // }
    update: (options, callback) => {
        try {
            var params = {
                TableName: options.dataObject.getTableName(),
                Key: options.dataObject.getKey(),
                UpdateExpression: options.updateExpression,
                ExpressionAttributeValues: options.updateValues,
                ReturnValues: "UPDATED_NEW"
            };

            docClient.update(params, (err, data) => {
                if (err) {
                    callback(err);
                } else {
                    callback(null, {});
                }
            });
        } catch (ex) {
            callback(`${ex}: dataAccess.update`);
        }
    },

    deleteOne: (options, callback) => {
        try {
            dynamo.deleteItem(JSON.parse(event.body), callback);
        } catch (ex) {
            callback(`${ex}: dataAccess.deleteOne`);
        }
    }
};
