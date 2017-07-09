"use strict";

module.exports = (() => {

    const result = {
        Card: require("./card"),
        Session: require("./session"),
        User: require("./user"),
        CardGroup: require("./cardgroup")
    };

    for (let key in result) {
        if (result.hasOwnProperty(key)) {
            result[key].getTypeName = ((x) => {
                return () => x;
            })(key);
            result[key].prototype.getTypeName = result[key].getTypeName;

            result[key].getTableName = ((x) => {
                return () => x;
            })(key.toLowerCase());
            result[key].prototype.getTableName = result[key].getTableName;
        }
    }

    return result;
})();
