"use strict";

const azure = require("azure-storage");
const entGen = azure.TableUtilities.entityGenerator;
const config = require("./config");
const utils = require("./utils");
let allModels = require("./models/allModels");

const tableService = azure.createTableService(config.azureConnectionString);

let dataAccess = module.exports = {

    init: (callback) => {
        function createTableForModel(callback) {
            console.log("callback is a", typeof callback);
            if (!modelTypes.length){
                callback(null, {});
                return;
            }
            let model = modelTypes.shift();
            dataAccess.createTable({ modelType: model }, (err, res) => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
                console.log("success");
                createTableForModel(callback);
            });
        }

        let modelTypes = [];
        for (let key in allModels) {
            if (allModels.hasOwnProperty(key)) {
                modelTypes.push(allModels[key]);
            }
        }
        createTableForModel(callback);
    },

    // options: { modelType }
    createTable: (options, callback) => {
        let tableName = options.modelType.getTableName();
        console.log("Creating table", tableName);
        tableService.createTableIfNotExists(tableName, callback);
    },

    // options: { model }
    insert: (options, callback) => {
        let tableName = options.model.getTableName();
        tableService.insertEntity(tableName, options.model.getEntity(), callback);
    },

    // options: { model }
    delete: (options, callback) => {
        tableService.deleteEntity(options.model.getTableName(), options.model, callback);
    },

    // options: { modelType, partitionKey, rowKey }
    getOne: (options, callback) => {
        tableService.retrieveEntity(options.modelType.getTableName(), options.partitionKey, options.rowKey, (err, res) => {
            if (err) {
                callback(err);
            } else {
                let result = new options.modelType();
                for (let key in res) {
                    if (res.hasOwnProperty(key)) {
                        result[key] = res[key];
                    }
                }
                callback(null, result);
            }
        });
    },

    // options: { modelType, partitionKey }
    getByPartition: (options, callback) => {
        let query = new azure.TableQuery().where('PartitionKey eq ?', options.partitionKey);
        tableSvc.queryEntities(options.modelType.getTableName(), query, null, (err, res) => {
            if (err) {
                callback(err);
            } else {
                let result = res.entries.map(x => {
                    let model = new options.modelType();
                    for (let key in x) {
                        if (x.hasOwnProperty(key)) {
                            model[key] = x[key];
                        }
                    }
                    return model;
                });
                callback(null, result);
            }
        });
    }
};
