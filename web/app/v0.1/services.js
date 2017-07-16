"use strict";

window.flashcardsServices = {
    execute: function execute(manager, action, dataObject, loginCompleted, callback) {
        var url = "http://localhost:9999/?mgr=" + manager + "&func=" + action;
        for (var key in dataObject) {
            if (dataObject.hasOwnProperty(key)) {
                url += "&" + key + "=" + dataObject[key];
            }
        }
        jQuery.ajax({
            url: url,
            dataType: "jsonp"
        }).done(function (result) {
            console.log("DONE: " + result);
        }).fail(function (result) {
            console.log("FAIL: " + result);
        });
    }
};