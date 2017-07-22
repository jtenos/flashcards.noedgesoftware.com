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
const utils = require("../utils");
const config = require("../config");

module.exports = {
    addUser: (query, callback) => {
        // TODO: ensure user doesn't already have an account

        var options = { model: new User(query.userID, query.email, query.phone) };
        console.log("inserting data");
        dataAccess.insert(options, (err, res) => {
            console.log("err:");
            console.log(err);
            console.log("res:");
            console.log(res);
            console.log("query:");
            console.log(query);

            if (err) {
                return callback(err);
            }

            if (query.email) {
                utils.sendMail({
                    from: config.adminEmailAddress,
                    to: query.email,
                    subject: "Flashcards Registration",
                    textBody: "Congratulations! Your account was created successfully.",
                    htmlBody: "<strong>Congratulations!</strong> Your account was created successfully."
                }, (err, res) => {
                    if (err) {
                        return callback(err);
                    }

                    callback(null, "User created");
                });
            }
        });
    },

    generateSession: (query, callback) => {
        var options = {
        	modelType: User,
        	retrievalType: "scan"
        };

        let user = null;
        dataAccess.getByPartition({
            modelType: User,
            partitionKey: "user"
        }, (err, items) => {
            if (err) {
                return callback(err);
            }
            if (!items) {
                return callback("Invalid result");
            }
            for (let i = 0; i < items.length; ++i) {
                if (query.email && items[i].email == query.email) {
                    user = items[i];
                    break;
                } else if (query.phone && items[i].phone == query.phone) {
                    user = items[i];
                    break;
                }
            }

            if (!user) {
                return callback("User not found");
            }

            let session = new Session(user.userID, utils.createRandom());
            dataAccess.insert({
                model: session
            }, (err, res) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, session);
            });
        });
    }
};
