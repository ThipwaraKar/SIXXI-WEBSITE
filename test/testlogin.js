var webdriver = require("selenium-webdriver");
var chrome = require("selenium-webdriver/chrome");


const {By,Key,Builder} = require("selenium-webdriver");

/** 
 * Set chrome command line options/switches
*/      
var chromeOptions = new chrome.Options();
chromeOptions.addArguments("test-type");
chromeOptions.addArguments("start-maximized");
chromeOptions.addArguments("--js-flags=--expose-gc");
chromeOptions.addArguments("--enable-precise-memory-info");
chromeOptions.addArguments("--disable-popup-blocking");
chromeOptions.addArguments("--disable-default-apps");
chromeOptions.addArguments("--disable-infobars");

driver =  new webdriver.Builder()
             .forBrowser("chrome")
             .setChromeOptions(chromeOptions)
             .build();

driver.get("http://localhost:9999/")

testfunction()
testSixxi1();

async function testfunction (){
var searchString = "Automation testing with Selenium and JavaScript";


await driver.findElement(By.name("q")).sendKeys(searchString,Key.RETURN);

//Verify the page title and print it
var title =  await driver.getTitle();
console.log('Title is:',title);

//It is always a safe practice to quit the browser after execution
await driver.quit();
}

async function testSixxi1 (){
    await driver.findElement(By.linkText("LOGIN")).click();
}