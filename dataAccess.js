"use strict";

const dynamodbDoc = require("dynamodb-doc");
const dynamo = new dynamodbDoc.DynamoDB();

/*
        case 'DELETE':
            dynamo.deleteItem(JSON.parse(event.body), done);
        case 'GET':
            dynamo.scan({ TableName: event.queryStringParameters.TableName }, done);
        case 'POST':
            dynamo.putItem(JSON.parse(event.body), done);
        case 'PUT':
            dynamo.updateItem(JSON.parse(event.body), done);
*/

let dataAccess = module.exports = {

    // callback: (err, result, response)
    createTable: (tableName, callback, errorCallback) => {
        errorCallback("createTable Not implemented");
    },

    // same options as getMany
    getOne: (options, callback, errorCallback) => {
        dataAccess.getMany(options, items => callback(items[0]), errorCallback);
    },

    // options: { modelType, fieldNames, whereClauses }
    // whereClauses: [ TODO: FIGURE THIS OUT
    // ]
    // callback: function(items)

    getMany: (options, callback, errorCallback) => {
        try {
            // TODO: Figure out defining columns and where clauses
            dynamo.scan({
                TableName: options.modelType.getTableName()
            }, callback);

            /*
            if (options.whereClauses && options.whereClauses.length) {
                let whereClauseItems = [];
                let whereClauseValues = [];
                options.whereClauses.forEach(whereClause => {
                    let operator = whereClause.operator || "eq";
                    whereClauseItems.push(`${whereClause.name} ${operator} ?`);
                    whereClauseValues.push(whereClause.value);
                });
                let whereText = "";
                while (whereClauseItems.length) {
                    let item = whereClauseItems.shift();
                    if (whereText) {
                        whereText += " and ";
                    }
                    whereText += `${item}`;
                }

                query = query.where(whereText, whereClauseValues);
            }
            */
        } catch (ex) {
            errorCallback(`${ex}: dataAccess.getMany`);
        }
    },

    // options: { dataObject }
    // callback: function()
    insert: (options, callback, errorCallback) => {
        try {
            var params = {
                TableName: options.dataObject.getTableName(),
                Item: options.dataObject
            };
            dynamo.put(params, callback);
        } catch (ex) {
            errorCallback(`${ex}: dataAccess.insert`);
        }
    },

    // options: { dataObject }
    update: (options, callback, errorCallback) => {
        try {
            dynamo.updateItem(JSON.parse(options.dataObject), callback);
        } catch (ex) {
            errorCallback(`${ex}: dataAccess.update`);
        }
    },

    deleteOne: (options, callback, errorCallback) => {
        try {
            dynamo.deleteItem(JSON.parse(event.body), callback);
        } catch (ex) {
            errorCallback(`${ex}: dataAccess.deleteOne`);
        }
    }
};
