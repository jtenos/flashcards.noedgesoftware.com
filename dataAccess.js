"use strict";

const config = require("./config");
const azure = require("azure-storage");
const tableService = azure.createTableService(config.connectionString);
const entGen = azure.TableUtilities.entityGenerator;

/*
    Azure table operators:
    eq (default), gt, ge, lt, le, ne
*/

let dataAccess = module.exports = {

    // callback: (err, result, response)
    createTable: (tableName, callback, errorCallback) => {
        tableService.createTableIfNotExists(tableName, (err, result, response) => {
            if (err) {
                errorCallback(`${err}: dataAccess.createTable`);
                return;
            }
            callback();
        });
    },

    // same options as getMany
    getOne: (options, callback, errorCallback) => {
        dataAccess.getMany(options, items => callback(items[0]), errorCallback);
    },

    // options: { modelType, fieldNames, whereClauses } 
    // whereClauses: [
    //     { name: "PartitionKey": value: "abc" }, // default is "eq"
    //     { name: "someval", operator: "le", value: 34 }   
    // ]
    // callback: function(items)
    getMany: (options, callback, errorCallback) => {
        try {
            var query = new azure.TableQuery();
            if (options.fieldNames && options.fieldNames.length) {
                query = query.select(options.fieldNames);
            }

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

            tableService.queryEntities(options.modelType.getTableName(), query, null, (err, result, response) => {
                if (err) {
                    errorCallback(`${err}: dataAccess.getMany.queryEntities`);
                    return;
                }

                try {
                    let items = [];
                    result.entries.forEach(val => {
                        let item = new options.modelType();
                        for (let key in val) {
                            if (val.hasOwnProperty(key)) {
                                item[key] = val[key]._;
                            }
                        }
                        items.push(item);
                    });
                    callback(items);
                } catch (ex) {
                    errorCallback(`${ex}: dataAccess.getMany.map`);
                }
            });
        } catch (ex) {
            errorCallback(`${ex}: dataAccess.getMany`);
        }
    },

    // options: { dataObject }
    // callback: function()
    insert: (options, callback, errorCallback) => {
        try {
            tableService.insertEntity(options.dataObject.getTableName(), options.dataObject, (err, result, response) => {
                if (err) {
                    errorCallback(`${err}: dataAccess.insert.insertEntity`);
                    return;
                }
                callback();
            });
        } catch (ex) {
            errorCallback(`${ex}: dataAccess.insert`);
        }
    },

    // options: { dataObject }
    update: (options, callback, errorCallback) => {
        try {
            tableService.replaceEntity(options.dataObject.getTableName(), options.dataObject, (errr, result, response) => {
                if (err) {
                    errorCallback(`${ex}: dataAccess.update.replaceEntity`);
                    return;
                }

                callback({});
            });
        } catch (ex) {
            errorCallback(`${ex}: dataAccess.update`);
        }
    },

    // options: same as getMany
    // options.fieldNames is ignored
    deleteMany: (options, callback, errorCallback) => {
        try {
            options.fieldNames = ["PartitionKey", "RowKey"];
            dataAccess.getMany(options, items => {
                try {
                    let queue = items;
                    let itemCount = items.length;
                    function deleteItem() {
                        try {
                            if (!queue.length) {
                                callback({ numRecords: itemCount });
                                return;
                            }
                            let item = queue.shift();
                            tableService.deleteEntity(options.modelType.getTableName(), item, (err, resp) => {
                                if (err) {
                                    errorCallback(`${err}: dataAccess.deleteMany.deleteEntity`);
                                    return;
                                }
                                deleteItem();
                            });
                        } catch (ex) {
                            errorCallback(`${ex}: dataAccess.deleteMany.deleteItem`);
                        }
                    }
                    deleteItem();
                } catch (ex) {
                    errorCallback(`${ex}: dataAccess.deleteMany.getMany`);
                    return;
                }
            }, errorCallback)
        } catch (ex) {
            errorCallback(`${ex}: dataAccess.deleteMany`);
        }
    }
};
