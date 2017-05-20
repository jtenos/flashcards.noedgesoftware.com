"use strict";

module.exports = function (userID, cardID) {
    this.userID = userID;
    this.cardID = cardID;
/*
    this.getDynamoObject = () => {
        return {
            userID: { S: this.userID },
            cardID: { S: this.cardID }
        };
    };
    */
};
