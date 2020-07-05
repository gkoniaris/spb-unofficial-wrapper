<h1 align="center">Welcome to spb-unofficial-wrapper 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <!-- <a href="https://gkoniaris.gr/scrapingbee-wrapper" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a> -->
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/gkondev" target="_blank">
    <img alt="Twitter: gkondev" src="https://img.shields.io/twitter/follow/gkondev.svg?style=social" />
  </a>
</p>

> An unofficial nodeJS wrapper for the ScrapingBee API.

## Install

```sh
npm install spb-unofficial-wrapper
```

## Usage

The most simple way to use the module is the following:

```javascript
const scrapingbeeUnofficialWrapper = require('scrapingbee-unofficial-wrapper')

const scraper = scrapingbee('YOUR-API-KEY')

const request = scraper.request('https://website.com').get()
                       .then(response => {
                           console.log(repsonse.data)
                           console.log(response.cost)
                       })
                       .catch(err => {
                           console.log(err.message)
                           console.log(err.status)
                       })
```

## Configuration

You can configure your scraper by setting a default config that will be used in all consequent requests. This can be performed with the following code.

```javascript
const configuration = {....} // Please check below for detailed documentation about available settings

const scraper = scrapingbee('YOUR-API-KEY', configuration)
```

The configuration contains the following values by default:

```json
{
    "request": {
        "cookies": [],
        "headers": [],
    },
    "block": {
        "ads": true,
        "resources": true
    },
    "settings": {
        "premiumProxy": false,
        "countryCode": ""
    },
    "javascript": {
        "render": true,
        "snippet": "",
        "waitForLoad": 0,
        "responseWithoutRunningJs": false
    },
    "css": {
        "waitForSelector": ""
    }
}
```

If you only provide on value for a nested object, eg. provide only render flag for javascript settings, the other values will keep their default values. So:

```json
{
    "javascript": {
        "render": false
    } 
}
```

Becomes:

```json
{
    "javascript": {
        "render": false,
        "snippet": "",
        "waitForLoad": 0,
        "responseWithoutRunningJs": false
    }
}
```

## Request Builder
You can also use the request request builder to set each property of the request. See the following example showing how the request builder works:

```javascript
const scraper = scrapingbee('YOUR-API-KEY')

const request = scraper.request('https://website.com')
                       .setAdsBlocking(true)
                       .setResourcesBlocks(false)
                       .setPremiumProxy(true)
                       .get()
                       .then(response => {
                           console.log(repsonse.data)
                           console.log(response.cost)
                       })
                       .catch(err => {
                           console.log(err.message)
                           console.log(err.status)
                       })
```

If you have already passed a default configuration to the scaper, the values will be overrided when using the request builder.

The request builder exposes the following functions:

setAdsBlocking(boolean): If true no ads will be loaded.
setResourcesBlocks(boolean): If true, no resources will be loaded.
setPremiumProxy(boolean): If true a premium proxy will be used (usually true for difficult to scrape websites like search engines or social networks).
setCountryCode(string): Set the country code of the proxy that will perform the request (only use with premium proxies, else it will throw an error).

## Build project

```sh
npm run build
```

## Run tests

```sh
npm run test
```

## Build docs

```sh
npm run docs
```

## Author

👤 **George Koniaris**

* My Blog: https://gkoniaris.gr
* Twitter: [@gkondev](https://twitter.com/gkondev)
* Github: [@gkoniaris](https://github.com/gkoniaris)
* LinkedIn: [@gkon](https://linkedin.com/in/gkon)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_