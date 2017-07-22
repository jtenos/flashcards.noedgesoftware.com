"use strict";

const azure = require("azure-storage");
const entGen = azure.TableUtilities.entityGenerator;

let CardGroup = module.exports = function (userID, cardGroupID, name) {
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

CardGroup.fromEntity = entity => {
    return new CardGroup(
        entity.PartitionKey._,
        entity.RowKey._,
        entity.name ? entity.name._ : null
    );
};
