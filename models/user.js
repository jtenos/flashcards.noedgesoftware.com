"use strict";

module.exports = function(userID) {
    this.userID = userID;

    this.getKey = function() {
        return { userID: this.userID };
    };
};
