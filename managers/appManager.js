"use strict";

const dataAccess = require("../dataAccess");
const allModels = require("../models/allModels");
const utils = require("../utils");

module.exports = {

    init: (query, callback) => {
        let modelTypes = [];
        let results = [];
        try {
            for (let key in allModels) {
                if (allModels.hasOwnProperty(key)) {
                    modelTypes.push(allModels[key]);
                }
            }
        } catch (ex) {
            callback(`${ex}: app.init`);
        }

        let seq = Promise.resolve();
        modelTypes.forEach(modelType => {
            seq = seq.then(() => {
                return new Promise((resolve, reject) => {
                    dataAccess.createTable({ modelType: modelType }, (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(modelType);
                        }
                    });
                });
            }).then(data => {
                results.push({ modelType: modelType, success: true });
            }).catch(err => {
                results.push({ modelType: modelType, success: false, err: err })
            });
        });

        seq = seq.then(() => {
            callback(undefined, results);
        });
    }
};
