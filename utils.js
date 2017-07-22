"use strict";

const postmark = require("postmark");
const config = require("./config");

let utils = module.exports = {
    createRandom: (numChars) => {
        numChars = numChars || 20;
        if (!utils.randomChars) {
            utils.randomChars = [];
            for (let i = 48; i <= 57; ++i) { 
                utils.randomChars.push(String.fromCharCode(i)); 
            } 
            for (let i = 65; i <= 90; ++i) {
                utils.randomChars.push(String.fromCharCode(i)); 
            } 
            for (let i = 97; i <= 122; ++i) { 
                utils.randomChars.push(String.fromCharCode(i)); 
            } 
        }

        var result = "";
        for (let i = 0; i < numChars; ++i) { 
            result += utils.randomChars[Math.floor(Math.random() * utils.randomChars.length)]; 
        }
        return result;
    },

    sendMail: (options, callback) => {
        let client = new postmark.Client(config.postmarkKey);
        client.sendEmail({
            From: options.from,
            To: options.to,
            Subject: options.subject,
            textBody: options.textBody,
            htmlBody: options.htmlBody
        } ,callback);
    },

    MailMessage: function (from, to, subject, textBody, htmlBody) {
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.textBody = textBody;
        this.htmlBody = htmlBody;
    }
};
