"use strict";

module.exports = function (userID, cardID, front, back1, back2) {
    this.userID = userID;
    this.cardID = cardID;
    this.front = front;
    this.back1 = back1;
    this.back2 = back2;

    this.getKey = function() {
        return { userID: this.userID, cardID: this.cardID };
    };
};
