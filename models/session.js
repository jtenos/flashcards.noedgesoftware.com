"use strict";

const azure = require("azure-storage");
const entGen = azure.TableUtilities.entityGenerator;

module.exports = function (userID, sessionID) {
    this.userID = userID;
    this.sessionID = sessionID;

    this.getEntity = function() {
    	return {
			PartitionKey: entGen.String("session"),
			RowKey: entGen.String(this.sessionID),
			userID: entGen.String(this.userID)
    	};
    };
};
