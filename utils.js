"use strict";

let utils = module.exports = {
    createRandom: (numChars) => {
        if (!utils.randomChars) {
            utils.randomChars = [];
            for (let i = 48; i <= 57; ++i) { 
                utils.randomChars.push(String.fromCharCode(i)); 
            } 
            for (let i = 65; i <= 90; ++i) {
                utils.randomChars.push(String.fromCharCode(i)); 
            } 
            for (let i = 97; i <= 122; ++i) { 
                utils.randomChars.push(String.fromCharCode(i)); 
            } 
        }

        var result = "";
        for (let i = 0; i < numChars; ++i) { 
            result += utils.randomChars[Math.floor(Math.random() * utils.randomChars.length)]; 
        }
        return result;
    }
};