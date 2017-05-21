"use strict";

module.exports = function (userID, cardID) {
    this.userID = userID;
    this.cardID = cardID;

    this.getKey = function() {
        return { userID: this.userID };
    };
};
