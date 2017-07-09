"use strict";

const azure = require("azure-storage");
const entGen = azure.TableUtilities.entityGenerator;

module.exports = function (cardGroupID, cardID, front, back1, back2) {
    this.cardGroupID = cardGroupID;
    this.cardID = cardID;
    this.front = front;
    this.back1 = back1;
    this.back2 = back2;

    this.getEntity = function() {
    	return {
			PartitionKey: entGen.String(cardGroupID),
			RowKey: entGen.String(this.cardID),
			front: entGen.String(this.fromt),
			back1: entGen.String(this.back1),
			back2: entGen.String(this.back2)
    	};
    };
};
