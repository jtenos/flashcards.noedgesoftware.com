"use strict";

const azure = require("azure-storage");
const entGen = azure.TableUtilities.entityGenerator;

let Card = module.exports = function (cardGroupID, cardID, front, back1, back2) {
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

Card.fromEntity = entity => {
    return new Card(
        entity.PartitionKey._,
        entity.RowKey._,
        entity.front ? entity.front._ : null,
        entity.back1 ? entity.back1._ : null,
        entity.back2 ? entity.back2._ : null
    );
};
