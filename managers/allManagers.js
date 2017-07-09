"use strict";

module.exports = (function() {

    var result = {
        //a/pp: require("./appManager"),
        card: require("./cardManager"),
        user: require("./userManager")
    };

    return result;
})();
