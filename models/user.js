"use strict";

const azure = require("azure-storage");
const entGen = azure.TableUtilities.entityGenerator;

let User = module.exports = function(userID, email, phone) {
    this.userID = userID;
    this.email = email;
    this.phone = phone;

    this.getEntity = () => {
        return {
            PartitionKey: entGen.String("user"),
            RowKey: entGen.String(this.userID),
            email: entGen.String(this.email),
            phone: entGen.String(this.phone)
        };
    };
};

User.fromEntity = entity => {
    return new User(
        entity.RowKey._,
        entity.email ? entity.email._ : null,
        entity.phone ? entity.phone._ : null
    );
}