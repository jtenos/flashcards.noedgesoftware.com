"use strict";

module.exports = function(userID, email, phone) {
    this.userID = userID;
    this.email = email;
    this.phone = phone;

    this.getKey = function() {
        return { userID: this.userID };
    };
};
