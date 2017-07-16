"use strict";

const allManagers = require("./managers/allManagers");
const dataAccess = require("./dataAccess");
const utils = require("./utils");

module.exports = function (context, req) {

    const callback = function(err, result) {
        if (err) {
            context.res = {
                status: 400,
                body: `Error: ${err}`
            };
            context.done();
        } else {
            let jsonResult = JSON.stringify(result);

            context.res
                .status(200)
                .set("Content-Type", "application/javascript")
                .send(`${req.query.callback}(${jsonResult});`);
        }
    }; 

    var manager = allManagers[req.query.mgr];
    var func = req.query.func;

    manager[func](req.query, callback);
};
