"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var Config_1 = require("./Config");
var Builder_1 = require("./Builder");
var Request = (function () {
    function Request(url, configuration) {
        this.url = url;
        this.configuration = Object.assign({}, configuration);
    }
    Request.prototype.get = function () {
        var headers = Config_1["default"].getHeaders(this.configuration);
        var params = Config_1["default"].getParams(this.configuration, this.url);
        return axios_1["default"].get('https://app.scrapingbee.com/api/v1/', {
            headers: headers,
            params: params
        }).then(function (response) {
            return {
                data: response.data,
                headers: response.headers,
                cost: parseInt(response.headers['spb-cost']),
                statusCode: parseInt(response.headers['spb-initial-status-code']),
                resolvedURL: response.headers['spb-resolved-url']
            };
        })["catch"](function (e) {
            var response = e.response;
            return Promise.reject({
                error: response.data.message,
                statusCode: response.status,
                headers: response.headers
            });
        });
    };
    Request.prototype.calculateCost = function () {
        if (!this.configuration.javascript.render && !this.configuration.settings.premiumProxy)
            return 1;
        if (this.configuration.javascript.render && !this.configuration.settings.premiumProxy)
            return 5;
        if (!this.configuration.javascript.render && this.configuration.settings.premiumProxy)
            return 10;
        if (this.configuration.javascript.render && this.configuration.settings.premiumProxy)
            return 100;
    };
    Request.prototype.getCookies = function () { return Config_1["default"].getCookies(this.configuration); };
    return Request;
}());
Request.prototype = Object.assign(Request.prototype, Builder_1["default"].prototype);
exports["default"] = Request;
//# sourceMappingURL=Request.js.map