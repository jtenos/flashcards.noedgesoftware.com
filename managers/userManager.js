/*
No password. When you create an account, create a GUID for
the client cookie, then send the user an email to confirm
that GUID. When they confirm it, then tie that GUID to
their account.

To authenticate, just get the email and GUID from the
cookies and verify that they are in the table.

To log out, remove the GUID from the table - or "Log Out All"
to remove all GUIDs for that email.
*/

"use strict";

const dataAccess = require("../dataAccess");
const User = require("../models/user");
const Session = require("../models/session");

module.exports = {
    addUser: (query, callback) => {
        var options = { dataObject: new User(query.userID, query.email, query.phone) };
        dataAccess.insert(options, callback);
    },

    generateSession: (query, callback) => {
        var options = {
        	modelType: User,
        	retrievalType: "scan"
        };

        if (query.email) {
        	options.whereClauses = { email: query.email };
        } else if (query.phone) {
        	options.whereClauses = { phone: query.phone };
        } else {
        	return callback("Must provide email or phone");
        }

        dataAccess.getMany(options, callback);
    }
};
