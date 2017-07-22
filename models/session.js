"use strict";

const azure = require("azure-storage");
const entGen = azure.TableUtilities.entityGenerator;

let Session = module.exports = function (userID, sessionID) {
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

Session.fromEntity = entity => {
    return new Session(
        entity.userID ? entity.userID._ : null,
        entity.RowKey._
    );
};
