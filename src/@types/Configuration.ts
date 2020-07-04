import Header from './Header'

type ConfigurationType = {
    apiKey: string,
    premium: boolean,
    headers: Array<Header>,
    cookies: Array<Header>,
    blockAds: boolean,
    blockResources: boolean,
    countryCode: string,
    javascriptSnipet: string,
    renderJavascript: boolean,
    returnPageSource: boolean,
    waitForJavascriptMs: number,
    waitForSelector: string
}

export default ConfigurationType