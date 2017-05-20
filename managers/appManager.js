"use strict";

const dataAccess = require("../dataAccess");
const allModels = require("../models/allModels");
const User = allModels.User;
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

        var dataObject = new User(utils.createRandom(24));
        dataAccess.insert({ dataObject: dataObject }, callback, errorCallback);

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
