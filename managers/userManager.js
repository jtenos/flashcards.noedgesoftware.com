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

let userManager = module.exports = {
    generateSession: (query, callback) => {
        callback = callback || function(){};

        function addUser (query, callback) {
            callback = callback || function(){};

            let userID = utils.createRandom();
            var options = { model: new User(userID, query.email, query.phone) };
            dataAccess.insert(options, (err, res) => {
                if (err) {
                    return callback(err);
                }
                callback(null, {});
            });
        }

        function sendSessionStartedEmail(user, session, callback) {
            callback = callback || function(){};

            utils.sendMail({
                from: config.adminEmailAddress,
                to: user.email,
                subject: "Flashcards Email Verification",
                textBody: `To complete sign-in for the Flashcards application, copy/paste the following code into the login verification box:\n\n${session.sessionID}`,
                htmlBody: `To complete sign-in for Flashcards application, copy/paste the following code into the login verification box:<br><br>${session.sessionID}<br><br>or click the following link: TODO`
            }, callback);          
        }

        let user = null;

        let whereClause = "";
        let whereParameters = [];
        if (query.email) {
            whereClause = "PartitionKey eq ? and email eq ?";
            whereParameters = ["user", query.email];
        } else if (query.phone) {
            whereClause = "PartitionKey eq ? and phone eq ?";
            whereParameters = ["user", query.phone];
        }

        dataAccess.getByWhereClause({
            modelType: User,
            whereClause: whereClause,
            whereParameters: whereParameters
        }, (err, items) => {
            if (err) {
                return callback(err);
            }
            if (!items) {
                return callback("Invalid result");
            }

            if (!items.length) {
                return addUser(query, (err, res) => {
                    if (err) {
                        return callback(err);
                    }
                    userManager.generateSession(query, callback);
                });
            }

            let user = items[0];

            let session = new Session(user.userID, utils.createRandom());
            dataAccess.insert({
                model: session
            }, (err, res) => {
                if (err) {
                    return callback(err);
                }
                sendSessionStartedEmail(user, session, callback);
            });
        });
    }
};
