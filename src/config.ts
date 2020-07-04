import Configuration from './@types/Configuration'

export const initConfiguration = function (userConfiguration: Configuration) {
    const defaultConfiguration: Configuration = {
        apiKey: '',
        premium: false,
        cookies: [],
        headers: [],
        blockAds: true,
        blockResources: false,
        countryCode: "",
        javascriptSnipet: "",
        renderJavascript: true,
        returnPageSource: false,
        waitForJavascriptMs: 0,
        waitForSelector: ""
    }

    const configuration: Configuration = {
        ...defaultConfiguration,
        ...userConfiguration
    }
    
    return configuration
}