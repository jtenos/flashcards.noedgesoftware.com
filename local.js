"use strict";

const index = require("./index");
const utils = require("./utils");

const userID = utils.createRandom(20);
console.log(userID);

index.handler({ query: { mgr: "user", func: "addUser", userID: userID } }, null, (err, response) => {
    console.log(`ERR: ${err}`);
    var responseJSON = JSON.stringify(response);
    console.log(`RESPONSE: ${responseJSON}`);
});
