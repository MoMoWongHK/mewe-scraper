# mewe scraper
Scraping MeWe group/page information by using nodejs and selenium-webdriver.
Part of [mewesearch.com](http://mewesearch.com "mewesearch.com") feature.

Since MeWe login page have recaptcha, we can only use our hand to by pass.

[![example](https://media.giphy.com/media/MnzUPfzEW41klskPLi/giphy.gif "example")](mewesearcher.com "example")

[![example](https://media.giphy.com/media/4IZxKZGkUfHutOLH2e/giphy.gif "example")](mewesearcher.com "example")

#Installation
Step 1:
```javascript
npm install
```
Step 2:
change to your mewe username and password (used for auto login) 
```javascript
const C = {
    username: "YOUR_MEWE_ACCOUNT",
    password: "YOUR_MEWE_PASSWORD"
};
```

> [DATA WILL ONLY BE STORED IN YOUR COMPUTER]

Step 3:
```javascript
npm run start
```

Step 4: 
Your data will scraped data will be store to your main directory.


#  Example
````javascript
start("香港人") //change your search string in here
````

#  Features

-  Automated login
- By pass recaptcha (by your hand)
- Scrape mewe group information (page coming soom)
- Json format output

example.json
```json
[
  {
    "url": "/group/5fc36bfa7f1d500f69a484be",
    "imageSrc": "https://img.mewe.com/api/v2/group/5fc36bfa7f1d500f69a484be/public-image/5fcc51ebda6a0364ec119b82/400x400/img",
    "title": "香港人里數/獎賞/旅遊分享區",
    "numberOfMember": 816,
    "public": false,
    "description": "",
    "country": "",
    "category": "",
    "subCategory": ""
  },
  {
    "url": "/group/5fbe3d3ec057695a0a69610a",
    "imageSrc": "https://img.mewe.com/api/v2/group/5fbe3d3ec057695a0a69610a/public-image/5fbe3d3e67b8dd74597c2ace/400x400/img",
    "title": "香港人@英國💛互助圈",
    "numberOfMember": 263,
    "public": false,
    "description": "",
    "country": "",
    "category": "",
    "subCategory": ""
  }
  ]
```

#  Common Problems

`node.js complaining that “The ChromeDriver could not be found on the current PATH” even though chromedriver is on the path`

[solution](https://stackoverflow.com/questions/36410283/node-js-complaining-that-the-chromedriver-could-not-be-found-on-the-current-pat "solution")

`https://stackoverflow.com/questions/49148743/error-econnrefused-connect-econnrefused-127-0-0-162427`

Make sure all process is done before quit the driver.
