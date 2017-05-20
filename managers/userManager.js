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

module.exports = {
    addUser: (query, callback) => {
        callback({
            email: query.email,
            message: "Hello!"            
        });
    },

    authenticate: (query, callback) => {
        // throw exception if unauthorized, else do nothing
    }
};
