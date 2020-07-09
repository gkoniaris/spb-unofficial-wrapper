"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var constants_1 = require("./constants");
var Config = (function () {
    function Config() {
    }
    Config.prototype.init = function (apiKey, userConfiguration) {
        if (!apiKey) {
            if (!apiKey)
                throw new Error('You cannot pass an empty API key');
        }
        var defaultConfiguration = {
            apiKey: apiKey,
            request: {
                cookies: [],
                headers: []
            },
            block: {
                ads: true,
                resources: true
            },
            settings: {
                premiumProxy: false,
                countryCode: ''
            },
            javascript: {
                render: true,
                snippet: '',
                waitForLoad: 0,
                responseWithoutRunningJs: false
            },
            css: {
                waitForSelector: ''
            }
        };
        userConfiguration.request = __assign(__assign({}, defaultConfiguration.request), userConfiguration.request || {});
        userConfiguration.block = __assign(__assign({}, defaultConfiguration.block), userConfiguration.block || {});
        userConfiguration.settings = __assign(__assign({}, defaultConfiguration.settings), userConfiguration.settings || {});
        userConfiguration.javascript = __assign(__assign({}, defaultConfiguration.javascript), userConfiguration.javascript || {});
        userConfiguration.css = __assign(__assign({}, defaultConfiguration.css), userConfiguration.css || {});
        if (userConfiguration.settings.countryCode !== '' && !userConfiguration.settings.premiumProxy) {
            throw new Error('Settting proxy country is only allowed in premium proxies');
        }
        if (userConfiguration.settings.countryCode !== '' && constants_1["default"].countryCodes.includes(userConfiguration.settings.countryCode)) {
            throw new Error('Country code provided is not supported');
        }
        if (!userConfiguration.settings.premiumProxy)
            delete userConfiguration.settings.countryCode;
        var configuration = __assign(__assign({}, defaultConfiguration), userConfiguration);
        return configuration;
    };
    Config.prototype.getHeaders = function (configuration) {
        var headers = {};
        configuration.request.headers.forEach(function (header) {
            headers['Spb-' + header.name] = header.value;
        });
        return headers;
    };
    Config.prototype.getCookies = function (configuration) {
        var cookies = configuration.request.cookies.map(function (cookie) {
            return cookie.name + '=' + cookie.value;
        }).join(';');
        return cookies;
    };
    Config.prototype.getParams = function (configuration, url) {
        var cookies = this.getCookies(configuration);
        var params = {
            url: url,
            api_key: configuration.apiKey,
            block_ads: configuration.block.ads,
            block_resources: configuration.block.resources,
            render_js: configuration.javascript.render,
            country_code: configuration.settings.countryCode,
            forward_headers: configuration.request.headers.length > 0,
            js_snippet: configuration.javascript.snippet,
            premium_proxy: configuration.settings.premiumProxy,
            return_page_source: !configuration.javascript.responseWithoutRunningJs,
            wait: configuration.javascript.waitForLoad,
            wait_for: configuration.css.waitForSelector
        };
        if (cookies !== '')
            params.cookies = cookies;
        return params;
    };
    return Config;
}());
exports["default"] = new Config();
//# sourceMappingURL=Config.js.map