"use strict";

const azure = require("azure-storage");
const entGen = azure.TableUtilities.entityGenerator;

module.exports = function(userID, email, phone) {
    this.userID = userID;
    this.email = email;
    this.phone = phone;

    this.getEntity = function() {
        return {
            PartitionKey: entGen.String("user"),
            RowKey: entGen.String(this.userID),
            email: entGen.String(this.email),
            phone: entGen.String(this.phone)
        };
    };
};
