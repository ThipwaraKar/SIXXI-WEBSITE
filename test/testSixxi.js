var webdriver = require("selenium-webdriver");
var chrome = require("selenium-webdriver/chrome");
var assert = require("assert");

const {By,Key,Builder} = require("selenium-webdriver");
const { alertIsPresent } = require("selenium-webdriver/lib/until");
const { getSystemErrorMap } = require("util");

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

function build (){
driver =  new webdriver.Builder()
             .forBrowser("chrome")
             .setChromeOptions(chromeOptions)
             .build();
            driver.get("http://localhost:9999/")
}

//build()
//driver.get("http://localhost:9999/")



//testfunction()
testSignup();
//testLogin();
//testSeeMenuList();
//testSearch();
async function testfunction (){
var searchString = "Automation testing with Selenium and JavaScript";


await driver.findElement(By.name("q")).sendKeys(searchString,Key.RETURN);

//Verify the page title and print it
var title =  await driver.getTitle();
console.log('Title is:',title);

//It is always a safe practice to quit the browser after execution
await driver.quit();
}
async function testSeeMenuList(){
    await build()
    await driver.findElement(By.linkText("MENU")).click();
    await driver.findElement(By.linkText("Main Dish")).click();
    var actualUrl= await driver.getCurrentUrl();
 var expectedUrl= "http://localhost:9999/Menu.html";
//console.log(actualUrl)
assert.strictEqual(actualUrl,expectedUrl,"Invalid URL");

    await driver.findElement(By.linkText("MENU")).click();
    await driver.findElement(By.linkText("Dessert")).click();
    var actualUrl2= await driver.getCurrentUrl();
    var expectedUrl2= "http://localhost:9999/Dessert.html";
    console.log(actualUrl)
assert.strictEqual(actualUrl2,expectedUrl2,"Invalid URL");
  
testSearch();
    await  setTimeout(function waitTwoSeconds() {
        driver.quit();
        }, 2000)
    
}

async function testSearch(){
   
    console.log('testSearch')

}

async function testLogin(){
    await build()
    await driver.findElement(By.linkText("LOGIN")).click();
    var username=driver.findElement(By.id("Lusername"));
    var password=driver.findElement(By.id("Lpassword"));
    await username.sendKeys("test1@gmail.com");
    await password.sendKeys("test1");
    await driver.findElement(By.xpath("input[@value='Login' and @type='submit']")).submit();
    //new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(By.cssSelector("input.submit[ id='login-btn1' ]"))).submit();

    await  setTimeout(function waitTwoSeconds() {
        driver.quit();
        }, 2000)
    
}

async function testSignup (){
   /* driver =  await new webdriver.Builder()
             .forBrowser("chrome")
             .setChromeOptions(chromeOptions)
             .build();
             driver.get("http://localhost:9999/")*/
             await build()
    
            
    await driver.findElement(By.linkText("LOGIN")).click();

    
    //await driver.get("http://localhost:9999/LoginRegis.html")
    //await driver.findElement(By.id("sign-up-btn")).click();
    await driver.findElement(By.xpath("//button[@id='sign-up-btn']")).click();

var username=driver.findElement(By.id("username"));
var email=driver.findElement(By.id("email"));
var password=driver.findElement(By.id("password"));

await username.sendKeys("test3");
await email.sendKeys("test3@gmail.com");
await password.sendKeys("test3");
//driver.findElement(By.).click();

driver.findElement(By.xpath("//input[@id='sign-up-btn2']")).click();
//await driver.findElement(By.xpath("//button[@id='sign-in-btn']/div[2]/div/button")).click();

    var title =  await driver.getTitle();
        console.log('Title is:',title);
    
      await  setTimeout(function waitTwoSeconds() {
            driver.quit();
            }, 2000)
        
   // await driver.quit();
}