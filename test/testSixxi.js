var webdriver = require("selenium-webdriver");
var chrome = require("selenium-webdriver/chrome");
var assert = require("assert");

const { By, Key, Builder } = require("selenium-webdriver");
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


function build() {
    driver = new webdriver.Builder()
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
async function testfunction() {
    var searchString = "Automation testing with Selenium and JavaScript";


    await driver.findElement(By.name("q")).sendKeys(searchString, Key.RETURN);

    //Verify the page title and print it
    var title = await driver.getTitle();
    console.log('Title is:', title);

    //It is always a safe practice to quit the browser after execution
    await driver.quit();
}
async function testSeeMenuList() {
    await build()
    await driver.findElement(By.linkText("MENU")).click();
    await driver.findElement(By.linkText("Main Dish")).click();
    var actualUrl = await driver.getCurrentUrl();
    var expectedUrl = "http://localhost:9999/Menu.html";
    //console.log(actualUrl)
    assert.strictEqual(actualUrl, expectedUrl, "Invalid URL");

    await driver.findElement(By.linkText("MENU")).click();
    await driver.findElement(By.linkText("Dessert")).click();
    var actualUrl2 = await driver.getCurrentUrl();
    var expectedUrl2 = "http://localhost:9999/Dessert.html";
    console.log(actualUrl)
    assert.strictEqual(actualUrl2, expectedUrl2, "Invalid URL");

    await testSearch();
    await setTimeout(function waitTwoSeconds() {
        driver.quit();
    }, 2000)

}

async function testSearch() {

    console.log('testSearch')
    var searchString = "T";
    await driver.findElement(By.xpath("//input[@type='text']")).sendKeys(searchString);
    await driver.findElement(By.linkText("Trail Mix Pancakes")).click();
    var actualUrl2 = await driver.getCurrentUrl();
    var expectedUrl2 = "http://localhost:9999/Pancakes/Trail%20Mix%20Pancakes.html";
    console.log(actualUrl2)
    assert.strictEqual(actualUrl2, expectedUrl2, "Invalid URL");
}

async function testLogin() {
    await build()
    await driver.findElement(By.linkText("LOGIN")).click();
    var username = driver.findElement(By.id("Lusername"));
    var password = driver.findElement(By.id("Lpassword"));
    await username.sendKeys("test1@gmail.com");
    await password.sendKeys("test1");
    await driver.findElement(By.xpath("input[@value='Login' and @type='submit']")).submit();
    //new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(By.cssSelector("input.submit[ id='login-btn1' ]"))).submit();

    await setTimeout(function waitTwoSeconds() {
        driver.quit();
    }, 2000)

}

async function testLogin2() {
    await setTimeout(async() => {
        driver.findElement(By.xpath("//button[@id='sign-in-btn']")).click();
         await setTimeout(async()=>{
           //  console.log('Here')
             var username = driver.findElement(By.id("Lusername"));
            var password = driver.findElement(By.id("Lpassword"));
             await username.sendKeys("admin11");
            await password.sendKeys("admin1234");
            await driver.findElement(By.xpath("//form[@id='login']/input")).click();
            await setTimeout(async() => {
            try { 
                 let alert = await driver.switchTo().alert()
                        let alertText = await alert.getText()
                        
                        console.log('-------------Test LogIn----------')
                        console.log(alertText)
                        //[RTM]Testcase : Check uncreate account
                        assert.strictEqual(alertText, 'Invalid username/password')
                        await driver.switchTo().alert().accept();
                        console.log('> Test case passed')

                         //[RTM]Testcase : login succesfully
                        await username.clear().then(await username.sendKeys('test11'))
                        await password.clear().then(await password.sendKeys('test11'))
                        await driver.findElement(By.xpath("//form[@id='login']/input")).then(async(element2)=>{
                            await element2.click()
                            await setTimeout(async()=>{
                                try {                                   
           
                                let alert2 = await driver.switchTo().alert()
                                let alertText2 = await alert2.getText()
                                console.log(alertText2)
                               
                                await driver.switchTo().alert().accept();
                                 } catch (NoSuchAlertError) {
                                    console.log('Loin succesfully')
                                    console.log('> Test case passed')
                                }
                            },3000)
                        })
                
            } catch (testCaseError) {
                if(testCaseError.code == 'ERR_ASSERTION'){
                    console.log("> Test case failed")
                }else{
                    console.error(`> ERROR_CODE : ${testCaseError.code}`);
                }
            }},2000)
          
         },5000)
    }, 10000)

}

async function testSignup() {
  
    try {
        await build()
        await driver.findElement(By.linkText("LOGIN")).click();
        //await driver.get("http://localhost:9999/LoginRegis.html")
        //await driver.findElement(By.id("sign-up-btn")).click();
        //var signup = driver.findElement(By.id("sign-up-btn2"))
        //signup.click()
        await driver.findElement(By.xpath("//button[@id='sign-up-btn']")).click();

        var username = driver.findElement(By.id("username"));
        var email = driver.findElement(By.id("email"));
        var password = driver.findElement(By.id("password"));

        await setTimeout(() => {
           // username.sendKeys("test3");
           // email.sendKeys("test3@gmail.com");
           // password.sendKeys("test1234")
              username.sendKeys("test12");
             email.sendKeys("test12@gmail.com");
            password.sendKeys("test12")
            driver.findElement(By.xpath("//input[@id='sign-up-btn2']")).then(async (element) => {
                await element.click()
                await setTimeout(async () => {
                    try {
                        console.log('-------------Test SignUp----------')

                        //Test if duplicated user name
                        let alert = await driver.switchTo().alert()
                        let alertText = await alert.getText()
                        assert.strictEqual(alertText, 'Username already in use')
                        await driver.switchTo().alert().accept();
                        console.log(alertText)
                        console.log('> Test case passed') 

                        //[RTM]Testcase#2 if username is blank
                        await username.clear().then(await username.sendKeys('test13'))
                        await email.clear().then(await email.sendKeys('test13@gamil.com'))
                        await password.clear()
                        await driver.findElement(By.xpath("//input[@id='sign-up-btn2']")).then(async(element2)=>{
                            await element2.click()
                            await setTimeout(async()=>{
                                let alert2 = await driver.switchTo().alert()
                                let alertText2 = await alert2.getText()
                                console.log(alertText2)
                                assert.strictEqual(alertText2, 'Invalid password')
                                console.log('> Test case passed') 
                                await driver.switchTo().alert().accept();
                                
                            },3000)
                        })
                        await testLogin2()
                    
                    } catch (testCaseError) {
                        if(testCaseError.code == 'ERR_ASSERTION'){
                            console.log(testCaseError)
                            console.log("> Test case failed")
                            await driver.switchTo().alert().accept();
                        }else{
                            console.error(`> ERROR_CODE : ${testCaseError.code}`);
                        }
                    }
                }, 5000)
            })
        }, 5000)

        // await driver.findElement(By.xpath("//form[@id='reg-form']")).then((element)=>{
        //     element.sendKeys(Key.ENTER)
        // })
        // await driver.findElement(By.xpath("//button[@id='sign-in-btn']/div[2]/div/button")).click();

        var title = await driver.getTitle();
        console.log('Title is:', title);
        /*await setTimeout(() => {
            driver.quit();
        }, 30000)*/

        // await driver.quit();
    } catch (error) {
        console.error('> error : ', error);

    }
}