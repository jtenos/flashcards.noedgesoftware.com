"use strict";

const dataAccess = require("../dataAccess");
const allModels = require("../models/allModels");
const User = allModels.User;
const utils = require("../utils");

module.exports = {

    init: (query, callback) => {
        let tableNames = [];
        try {
            for (let key in allModels) {
                if (allModels.hasOwnProperty(key)) {
                    tableNames.push(allModels[key].getTableName());
                }
            }
        } catch (ex) {
            callback(`${ex}: app.init`);
        }

        function go() {
            let tableName = tableNames.shift();
            if (!tableName) {
                callback(null, { message:"OK" });
                return;
            }
            dataAccess.createTable(tableName, (err, data) => {
                if (err) {
                    callback(err, null);
                } else {
                    go();
                }
            });
        }
        go();
    }
};
