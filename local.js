"use strict";

const index = require("./index");

index.handler(null, null, (err, response) => {
    console.log(`ERR: ${err}`);
    var responseJSON = JSON.stringify(response);
    console.log(`RESPONSE: ${responseJSON}`);
});
