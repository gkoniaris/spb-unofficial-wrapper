"use strict";
exports.__esModule = true;
var constants_1 = require("./constants");
var Builder = (function () {
    function Builder(configuration) {
        this.configuration = configuration;
    }
    Builder.prototype.setApiKey = function (apiKey) {
        if (!apiKey)
            throw new Error('You cannot pass an empty API key');
        this.configuration.apiKey = apiKey;
        return this;
    };
    Builder.prototype.setAdsBlocking = function (blockFlag) {
        this.configuration.block.ads = blockFlag;
        return this;
    };
    Builder.prototype.setResourcesBlocking = function (blockFlag) {
        this.configuration.block.resources = blockFlag;
        return this;
    };
    Builder.prototype.setCountryCode = function (countryCode) {
        if (!this.configuration.settings.premiumProxy) {
            throw new Error('Settting proxy country is only allowed in premium proxies');
        }
        if (!constants_1["default"].countryCodes.includes(countryCode)) {
            throw new Error('Country code provided is not supported');
        }
        this.configuration.settings.countryCode = countryCode;
        return this;
    };
    Builder.prototype.setPremiumProxy = function (premiumFlag) {
        this.configuration.settings.premiumProxy = premiumFlag;
        return this;
    };
    Builder.prototype.setCookies = function (cookies) {
        if (cookies === null)
            cookies = [];
        this.configuration.request.cookies = cookies;
        return this;
    };
    Builder.prototype.setHeaders = function (headers) {
        if (headers === null)
            headers = [];
        this.configuration.request.headers = headers;
        return this;
    };
    Builder.prototype.setJavascriptRendering = function (renderFlag) {
        this.configuration.javascript.render = renderFlag;
        return this;
    };
    Builder.prototype.setJavascriptSnippet = function (snippet) {
        var snippetBuffer = new Buffer(snippet);
        var base64Snippet = snippetBuffer.toString('base64');
        this.configuration.javascript.snippet = base64Snippet;
        return this;
    };
    Builder.prototype.setJavascriptWaitForLoad = function (wait) {
        this.configuration.javascript.waitForLoad = wait;
        return this;
    };
    Builder.prototype.setJavascriptWaitForSelector = function (selector) {
        this.configuration.javascript.waitForSelector = selector;
        return this;
    };
    return Builder;
}());
exports["default"] = Builder;
//# sourceMappingURL=Builder.js.map