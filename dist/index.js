"use strict";
exports.__esModule = true;
var Config_1 = require("./Config");
var Request_1 = require("./Request");
var Scraper = (function () {
    function Scraper(apiKey, userConfiguration) {
        if (userConfiguration === void 0) { userConfiguration = {}; }
        this.configuration = Config_1["default"].init(apiKey, userConfiguration);
    }
    Scraper.prototype.request = function (url) {
        return new Request_1["default"](url, this.configuration);
    };
    return Scraper;
}());
module.exports = Scraper;
//# sourceMappingURL=index.js.map