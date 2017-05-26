"use strict";

(() => {
    
    var app = angular.module("flashcardsApp", [
        "ngRoute"
    ]);
    
    app.config($routeProvider => {
        $routeProvider.when("/", {
            controller: "cardController", templateUrl: "partials/cards.html"
        }).otherwise({
            redirectTo: "/"
        });
    });
})();
