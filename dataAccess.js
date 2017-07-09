"use strict";

const azure = require("azure-storage");
const entGen = azure.TableUtilities.entityGenerator;
const config = require("./config");
const utils = require("./utils");

const tableService = azure.createTableService(config.azureConnectionString);

module.exports = {

    // options: { modelType }
    createTable: (options, callback) => {
        tableService.createTableIfNotExists(options.modelType.getTableName(), callback);
    },

    // options: { entity }
    insert: (options, callback) {
        tableService.insertEntity(entity.getTableName(), entity, callback);
    },


};


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


/*


var item = {
    PartitionKey: entGen.String("items"),
    RowKey: util.createGuid(),
    name: "John Doe",
    age: 34
};


function select(callback) {
    var query = new azure.TableQuery()
        .select(["PartitionKey", "RowKey", "name", "age"]);
    tableService.queryEntities("mytable", query, null, callback);
}

function deleteItem(item, callback) {
    tableService.deleteEntity("mytable", item, callback);
}

var insertPromise = new Promise((resolve, reject) => {
    insert(item, (err, resp) => {
        if (err) {
            reject(err);
        } else {
            resolve(resp);
        }
    });
});

insertPromise.then(res => {
    select((err, resp) => {
        resp.entries.forEach(x => {
            deleteItem(x, (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                } else {
                    console.log("Deleted");
                }
            });
            console.log(JSON.stringify(x));
        });
    });
})["catch"](x => console.error(x));


*/