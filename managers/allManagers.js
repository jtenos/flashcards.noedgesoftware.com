"use strict";

module.exports = (function() {

    var result = {
        app: require("./appManager"),
        card: require("./cardManager"),
        user: require("./userManager")
    };

    return result;
})();
