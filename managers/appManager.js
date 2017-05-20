"use strict";

const dataAccess = require("../dataAccess");
const allModels = require("../models/allModels");
const JoeTest = allModels.JoeTest;
const utils = require("../utils");

module.exports = {

    init: (query, callback, errorCallback) => {
        let tableNames = [];
        try {
            for (let key in allModels) {
                if (allModels.hasOwnProperty(key)) {
                    tableNames.push(allModels[key].getTableName());
                }
            }
        } catch (ex) {
            errorCallback(`${ex}: app.init`);
        }

        function go() {
            let tableName = tableNames.shift();
            if (!tableName) {
                callback({ message:"OK" });
                return;
            }
            dataAccess.createTable(tableName, go, errorCallback);
        }
        go();
    },

    test: (query, callback, errorCallback) => {
        var partitionKey = "part";
        var rowKey = Math.random().toString();
        var dataObject = new JoeTest("Bill", 34);
        dataObject.PartitionKey = partitionKey;
        dataObject.RowKey = rowKey;

        var rand = utils.createRandom(24);
        callback({val: rand});

        //dataAccess.insert({dataObject: dataObject}, callback,errorCallback);
        //dataAccess.getMany({modelType: JoeTest}, callback, errorCallback);
        //dataAccess.deleteMany({modelType: JoeTest}, callback, errorCallback);

/*
        dataAccess.getMany({modelType: JoeTest}, items => {
            items.forEach(item => {
                item.name = "New Name";
                item.age = 44;
                dataAccess.update({dataObject: item}, () => {
                    dataAccess.getMany({ modelType: JoeTest }, callback, errorCallback);
                }, errorCallback);
            });
        }, errorCallback);
        */
    }
};
