"use strict";

module.exports = function (userID, sessionID) {
    this.userID = userID;
    this.sessionID = sessionID;

    this.getKey = function() {
        return { userID: this.userID, sessionID: this.sessionID }
    };
};
