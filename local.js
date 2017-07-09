"use strict";

const index = require("./index");
const utils = require("./utils");
const dataAccess = require("./dataAccess");

dataAccess.init((err, res) => {
    if (err) {
        console.error(err);
    } else {
        index.handler({
            query: {
                mgr: "user",
                func: "addUser",
                email: "joe@jtenos.com",
                userID: utils.createRandom()
                //phone: "6022288125"
            }
        }, null, (err, resp) =>{
            if (err) {
                console.error("ERR");
                console.error(err);
            } else { 
                console.log(JSON.stringify(resp));
            }
        });
    }
})

        

/********* CREATE USER ***********
index.handler({
    query: {
        mgr: "user",
        func: "addUser",
        userID: utils.createRandom(),
        email: "joe@jtenos.com",
        phone: "6022288125"
    }
}, null, (err, resp) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Success");
    }
});
*********  ***********/

/******** CALL INIT *********
index.handler({
    query: {
        mgr: "app", func: "init"
    }
}, null, (err, resp) => {
    if (err) {
        console.error(err);
    } else {
        resp.forEach(result => {
            console.log(`tableName: ${result.tableName}, success: ${result.success}, err: ${result.err}`);
        });
    }
});
********* *********/

//const userID = utils.createRandom(20);
//console.log(userID);
/*
index.handler({ query: { mgr: "card", func: "getCards", userID: "WdFqx8lAQc4AScmCzXjD" } }, null, (err, response) => {
    if (err) {
        console.error(err);
    } else {
        response.forEach(card => {
            console.log(JSON.stringify(card));
        });
    }
});
*/
/*
let items = getItems();
function processItem() {
    if (!items.length) {
        return;
    }
    let item = items.shift();
    let fields = item.split("|");
    let front = fields[1];
    let back1 = fields[2];
    let back2 = fields[3];

    console.log(JSON.stringify(item));
    
    index.handler({
        query: { 
            mgr:"card",
            func:"addCard",
            userID:"of00g898RDu0ZCJt3ZJz",
            front:front,
            back1:back1,
            back2:back2 
        }
    }, null, (err, result) =>{
        if (err) {
            console.error(err);
        } else {
            console.log("Success");
            processItem();
        }
    });
}

processItem();
*/