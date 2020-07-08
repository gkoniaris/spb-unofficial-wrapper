<h1>Welcome to spb-unofficial-wrapper 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://gkoniaris.github.io/spb-unofficial-wrapper/" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/gkondev" target="_blank">
    <img alt="Twitter: gkondev" src="https://img.shields.io/twitter/follow/gkondev.svg?style=social" />
  </a>
</p>

> An unofficial nodeJS wrapper for the ScrapingBee API.

## What is spb-unoffical-wrapper

SPB unofficial wrapper, is a nodeJS module, whose sole purpose is to provide a nice and simple way to access [ScrapingBee](https://www.scrapingbee.com/)'s API while working with NodeJS.

#### DISLAIMER: This is not an official [ScrapingBee](https://www.scrapingbee.com/) product.

## Install

```sh
npm install spb-unofficial-wrapper
```

## Usage

To use this module you have to first create an account on [ScrapingBee](https://www.scrapingbee.com/) to get an API key.

The most simple way to use the module is the following:

```javascript
const Scraper = require('spb-unofficial-wrapper')

const scraper = new Scraper('YOUR_API_KEY')

scraper.request('https://website.com')
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

## Configuration

You can configure your scraper by setting a default config that will be used in all consequent requests. This can be performed with the following code.

```javascript
const Scraper = require('spb-unofficial-wrapper')

const configuration = {....} // Please check below for detailed documentation about available settings

const scraper = new Scraper('YOUR_API_KEY', configuration)
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
You can also use the request builder to set each property of the request. See the following example showing how it works:

```javascript
const Scraper = require('spb-unofficial-wrapper')

const scraper = new Scraper('YOUR_API_KEY')

scraper.request('https://website.com')
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
        console.log(err.statusCode)
    })
```

If you have already passed a default configuration to the scaper, the values will be overrided for the specific request when using the functions of the builder.

You can find detailed documentation about the builder functions and how to use them [here](https://gkoniaris.github.io/spb-unofficial-wrapper/Builder.html), under the Methods section of the Builder class.

## Request responses

After calling the get method of a request, if the request is successfull it will resolve and the response object will contain the following fields:

**data**: The data returned from ScrapingBee

**headers**: The headers returned from the scraper

**cost**: How much the request costed in credits

**statusCode**: The status code that was returned to the scraper (it can be different than the one ScrapingBee returned)

**resolvedURL**: The URL that was scraped (useful in case of redirects)

## Failed Request responses

In case of a failed request the following fields are retunred in the response object:

**error**: A message explaining what went wrong

**cost**: How much the request costed in credits (If the website returns a 404 status the request is charged)

**statusCode**: The status returned from the scraper

**headers**: The headers returned from the scraper

## Cost calculator

This module allows to also calculate the cost of a request before even performing it. Keep in mind these rules can change so don't rely that match on this feature. To calculate the cost of a request you can use the following code:

```javascript
scraper.request('https://website.com')
    .setJavascriptRendering(true)
    .setPremiumProxy(true)
    .calculateCost() // Returns 100 because we use a premium proxy with javascript rendering
```

Another example would be:

```javascript
scraper.request('https://website.com')
    .setJavascriptRendering(false)
    .setPremiumProxy(true)
    .calculateCost() // Returns 10 because we use a premium proxy without javascript rendering
```

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