"use strict";

const aws = require("aws-sdk");
const config = require("./config");

aws.config.update({
    region: config.awsRegion
});

const docClient = new aws.DynamoDB.DocumentClient();

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

            docClient.put(params, (err, data) => {
                if (err) {
                    errorCallback(err);
                } else {
                    callback(data);
                }
            });
        } catch (ex) {
            errorCallback(`${ex}: dataAccess.insert`);
        }
    },

    // options: { dataObject }
    update: (options, callback, errorCallback) => {
        try {
            var params = {
                TableName: options.dataObject.getTableName()
            };
            params.Key = options.dataObject.getKey();

            /*
            var params = {
                TableName:table,
                Key:{
                    "year": year,
                    "title": title
                },
                UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
                ExpressionAttributeValues:{
                    ":r":5.5,
                    ":p":"Everything happens all at once.",
                    ":a":["Larry", "Moe", "Curly"]
                },
                ReturnValues:"UPDATED_NEW"
            };

            console.log("Updating the item...");
            docClient.update(params, function(err, data) {
                if (err) {
                    console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                }
            });
            */
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
