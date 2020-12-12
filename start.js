const {Builder, By, Key, until} = require('selenium-webdriver');
const fs = require('fs');
const C = {
    username: "YOUR_MEWE_ACCOUNT",
    password: "YOUR_MEWE_PASSWORD"
};

const start = async (searchStr) => {
    let driver = await new Builder().forBrowser('chrome').build();
    try  {

        await driver.get('http://www.mewe.com/');
        await driver.wait(until.elementLocated(By.xpath('//*[@id="login-fake-btn"]')), 10000);
        await driver.findElement(By.xpath('//*[@id="login-fake-btn"]')).click();
        await driver.sleep(100);
        await driver.findElement(By.xpath('//*[@id="email"]')).sendKeys(C.username);
        await driver.sleep(100);
        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys(C.password);
        await driver.findElement(By.xpath('//*[@id="login-overlay"]/div/form/button')).click();
        await driver.wait(until.elementLocated(By.xpath('//*[@id="ember24"]')), 20000);
        await new Promise(r => setTimeout(r, 1000));
        await driver.findElement(By.xpath('//*[@id="ember24"]')).sendKeys(searchStr, Key.RETURN);
        await driver.sleep(500);
        await driver.findElement(By.xpath('//div[text() =\'Groups\']')).click();
        await driver.sleep(1000);

        let scrollHeight = 2407
        let numberOfLoop = 5
        for (let i = 0; i < numberOfLoop; i++) {
            await driver.executeScript("document.getElementsByClassName(\"smart-search_result smart-search_result--groups win-scrollbar\")[0].scrollBy(0, " + scrollHeight + ")")
            await driver.sleep(1500);
        }

        let scrollResult = await driver.findElement(By.className('smart-search_result smart-search_result--groups win-scrollbar'))
        let children = await scrollResult.findElements(By.className('smart-search_group c-mw-smart-search-group ember-view'))
        let jsonArr = []
        let allPromise = []
        if (Array.isArray(children)) {
            children.map(async webEle => {
                allPromise.push(new Promise(async (resolve, reject) => {
                    let imgDom = await webEle.findElement(By.className("profile_img usr-avatar-small"))
                    let aDom = await webEle.findElement(By.className("smart-search-group_img ember-view"))
                    let titleDom = await webEle.findElement(By.className("h-trim ember-view"))
                    let numberOfMemberDom = await webEle.findElement(By.className("smart-search-group_members"))
                    let groupType = await webEle.findElement(By.className("h-flex_center_x_y"))

                    jsonArr.push({
                        url: await driver.executeScript("return arguments[0].attributes['href'].value", aDom),//return join link
                        imageSrc: await driver.executeScript("return arguments[0].attributes['src'].value", imgDom),  //return image src from img dom,
                        title: await driver.executeScript("return arguments[0].innerText", titleDom), //return group title,
                        numberOfMember: parseInt(await driver.executeScript("return arguments[0].innerText.split(\"Members (\")[1].split(\")\")[0]", numberOfMemberDom)), //return numberOf member,
                        public:  await driver.executeScript("return arguments[0].innerText", groupType) === "Join Group",  //return is a public group,
                        description: "",
                        country: "",
                        category: "",
                        subCategory: "",
                    })

                    resolve()

                }))

            })
        }
        Promise.all(allPromise)
            .then(res => {
                fs.writeFile('example.json', JSON.stringify(jsonArr), 'utf8', function (err) {
                    if (err) return console.log(err);
                });
            })
            .catch (err => console.log(err))

    } finally {
        // await driver.quit();
    }
}


start("香港人")

