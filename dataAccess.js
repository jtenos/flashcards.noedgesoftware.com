"use strict";

const azure = require("azure-storage");
const entGen = azure.TableUtilities.entityGenerator;
const config = require("./config");
const utils = require("./utils");
let allModels = require("./models/allModels");

const tableService = azure.createTableService(config.azureConnectionString);

let dataAccess = module.exports = {

    init: (callback) => {
        callback = callback || function(){};

        function createTableForModel(callback) {
            callback = callback || function(){};

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
        callback = callback || function(){};

        let tableName = options.modelType.getTableName();
        console.log("Creating table", tableName);
        tableService.createTableIfNotExists(tableName, callback);
    },

    // options: { model }
    insert: (options, callback) => {
        callback = callback || function(){};

        let tableName = options.model.getTableName();
        tableService.insertEntity(tableName, options.model.getEntity(), callback);
    },

    // options: { model }
    delete: (options, callback) => {
        callback = callback || function(){};

        var entity = options.model.getEntity();
        console.log("deleting entity from table", options.model.getTableName());
        console.log(JSON.stringify(entity));
        tableService.deleteEntity(options.model.getTableName(), entity, callback);
    },

    // options: { modelType, partitionKey, rowKey }
    getOne: (options, callback) => {
        callback = callback || function(){};

        tableService.retrieveEntity(options.modelType.getTableName(), options.partitionKey, options.rowKey, (err, res) => {
            if (err) {
                callback(err);
            } else {
                callback(null, options.modelType.fromEntity(res));
            }
        });
    },

    // options: { modelType, partitionKey }
    getByPartition: (options, callback) => {
        callback = callback || function(){};

        let query = new azure.TableQuery().where('PartitionKey eq ?', options.partitionKey);
        tableService.queryEntities(options.modelType.getTableName(), query, null, (err, res) => {
            if (err) {
                callback(err);
            } else {
                let result = res.entries.map(options.modelType.fromEntity);
                callback(null, result);
            }
        });
    },

    // options: { modelType, whereClause (question marks as params), whereParameters (array) }
    getByWhereClause: (options, callback) => {
        callback = callback || function(){};

        let query = new azure.TableQuery().where(options.whereClause, ...options.whereParameters)
        tableService.queryEntities(options.modelType.getTableName(), query, null, (err, res) => {
            if (err) {
                callback(err);
            } else {
                let result = res.entries.map(options.modelType.fromEntity);
                callback(null, result);
            }
        });
    }
};
