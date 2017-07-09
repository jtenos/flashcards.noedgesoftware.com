"use strict";

const azure = require("azure-storage");
const entGen = azure.TableUtilities.entityGenerator;

module.exports = function (userID, cardGroupID, name) {
    this.userID = userID;
    this.cardGroupID = cardGroupID;
    this.name = name;

    this.getEntity = function() {
    	return {
			PartitionKey: entGen.String(userID),
			RowKey: entGen.String(this.cardGroupID),
			name: entGen.String(this.name)
    	};
    };
};
