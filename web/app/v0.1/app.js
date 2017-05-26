"use strict";

(function () {

    var app = angular.module("flashcardsApp", ["ngRoute"]);

    app.config(function ($routeProvider) {
        $routeProvider.when("/", {
            controller: "cardController", templateUrl: "partials/cards.html"
        }).otherwise({
            redirectTo: "/"
        });
    });
})();