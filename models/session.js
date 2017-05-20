"use strict";

module.exports = function (userID, sessionID) {
    this.userID = userID;
    this.sessionID = sessionID;

/*
    this.getDynamoObject = () => {
        return {
            userID: { S: this.userID },
            sessionID: { S: this.sessionID }
        };
    };*/
    
};
