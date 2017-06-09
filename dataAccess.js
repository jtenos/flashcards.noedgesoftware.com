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

    createTable: (tableName, callback, errorCallback) => {
        errorCallback("createTable Not implemented");
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

    // options: { modelType, fieldNames, whereClauses }
    // whereClauses: [ TODO: FIGURE THIS OUT
    // ]
    // callback: function(items)
    getMany: (options, callback) => {
        try {
            let tableName = options.modelType.getTableName();
            //console.log(`Querying table ${tableName}`);
            //docClient.query({
            docClient.scan({
                TableName: tableName
            }, (err, data) => {
                let items = (data ? data.Items : []);
                callback(err, items);
            });
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
            callback(`${ex}: dataAccess.getMany`, null);
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
