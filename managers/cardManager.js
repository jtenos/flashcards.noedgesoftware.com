"use strict";

const dataAccess = require("../dataAccess");
const Card = require("../models/card");
const utils = require("../utils");

module.exports = {
    getCards: function(query, callback) {
        dataAccess.getMany({modelType: Card}, callback); // TODO: Filter by user
    },
    
    addCard: function(query, callback) {
        var cardID = utils.createRandom(20);
        var model = new Card(query.userID, cardID, query.front, query.back1, query.back2);
        dataAccess.insert({ dataObject: model }, callback);
    }
};
