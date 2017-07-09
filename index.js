'use strict';

const allManagers = require("./managers/allManagers");
const dataAccess = require("./dataAccess");
const utils = require("./utils");

exports.handler = (event, context, callback) => {
    const done = (err, res) => callback(null, {
        statusCode: err ? "400" : "200",
        body: (err && err.message) ? err.message : JSON.stringify(res),
        headers: {
            "Content-Type": "application/json",
        }
    });

    var manager = allManagers[event.query.mgr];
    var func = event.query.func;

    manager[func](event.query, callback);
};
