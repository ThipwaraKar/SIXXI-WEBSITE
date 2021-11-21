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


   
 //remark: change username,email,password every times before test to avoid duplicated in Sign in
                      
testSignup();


async function testSeeMenuList() {
    //await build()
    //[RTM]Testcase#11 see menu list 
    console.log('-------------Test SeeMenulist----------')
    await driver.findElement(By.linkText("MENU")).click();
    await driver.findElement(By.linkText("Main Dish")).click();
    var actualUrl = await driver.getCurrentUrl();
    var expectedUrl = "http://localhost:9999/Menu.html";
    console.log(actualUrl)
    assert.strictEqual(actualUrl, expectedUrl, "Invalid URL");
    console.log('> Test case passed')

    await setTimeout(async function waitTwoSeconds() {
    await driver.findElement(By.linkText("MENU")).click();
    await driver.findElement(By.linkText("Dessert")).click();
    var actualUrl2 = await driver.getCurrentUrl();
    var expectedUrl2 = "http://localhost:9999/Dessert.html";
    console.log(actualUrl2)
    assert.strictEqual(actualUrl2, expectedUrl2, "Invalid URL");
    console.log('> Test case passed')
}, 2000)

await setTimeout(async function waitTwoSeconds() {
    testSearch();
    await setTimeout(async function waitTwoSeconds2() {
        driver.quit();
    }, 2000)
}, 10000)
   // await testSearch();
   /* await setTimeout(function waitTwoSeconds() {
        driver.quit();
    }, 2000)*/

}

async function testSearch() {

    //console.log('testSearch')
    //[RTM]Testcase#10 Search menu         
    var searchString = "T";
    await driver.findElement(By.xpath("//input[@type='text']")).sendKeys(searchString);
    await driver.findElement(By.linkText("Trail Mix Pancakes")).click();
    console.log('-------------Test testSearch----------')
    var actualUrl2 = await driver.getCurrentUrl();
    var expectedUrl2 = "http://localhost:9999/Pancakes/Trail%20Mix%20Pancakes.html";
    console.log(actualUrl2)
     //[RTM]Testcase#12 See menu information     
    assert.strictEqual(actualUrl2, expectedUrl2, "Invalid URL");
    console.log('> Test case passed')

    
}



async function testLogin2() {
    await setTimeout(async() => {
        driver.findElement(By.xpath("//button[@id='sign-in-btn']")).click();
         await setTimeout(async()=>{
           //  console.log('Here')
             var username = driver.findElement(By.id("Lusername"));
            var password = driver.findElement(By.id("Lpassword"));
             await username.sendKeys("admin invalid");
            await password.sendKeys("admin1234");
            await driver.findElement(By.xpath("//form[@id='login']/input")).click();
            await setTimeout(async() => {
            try { 
                 let alert = await driver.switchTo().alert()
                        let alertText = await alert.getText()
                        
                        console.log('-------------Test LogIn----------')
                        console.log(alertText)

                        //[RTM]Testcase#8 check invalid username             
                        assert.strictEqual(alertText, 'Invalid username/password')
                        await driver.switchTo().alert().accept();
                        console.log('> Test case passed')
                        
                        //[RTM]Testcase#6 login with emptpy username              
                       await username.clear()
                       await driver.findElement(By.xpath("//form[@id='login']/input")).then(async(element5)=>{
                           await element5.click()
                           await setTimeout(async()=>{
                               let alert5 = await driver.switchTo().alert()
                               let alertText5 = await alert5.getText()
                               console.log(alertText5)
                               assert.strictEqual(alertText5, 'Invalid username/password')
                               console.log('> Test case passed') 
                               await driver.switchTo().alert().accept();

                        //[RTM]Testcase#7 Check invalid password   
                        await username.sendKeys('admin1')
                        await password.clear().then(await password.sendKeys('invalidpass'))
                        await driver.findElement(By.xpath("//form[@id='login']/input")).then(async(element6)=>{
                             await element6.click()
                            await setTimeout(async()=>{
                                       let alert6 = await driver.switchTo().alert()
                                       let alertText6 = await alert6.getText()
                                       console.log(alertText6)
                                       assert.strictEqual(alertText6, 'Invalid username/password')
                                       console.log('> Test case passed') 
                                       await driver.switchTo().alert().accept();
        
                        //[RTM]Testcase9 login succesfully
                        await username.clear().then(await username.sendKeys('admin1'))
                        await password.clear().then(await password.sendKeys('admin1234'))
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
                                       
                                   },3000)
                               })      
                               
                           },3000)
                       })
                        //await testSeeMenuList()
                         await setTimeout(function waitTwoSeconds() {
                            testSeeMenuList()
                    }, 10000)
                
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
        await driver.findElement(By.xpath("//button[@id='sign-up-btn']")).click();

        var username = driver.findElement(By.id("username"));
        var email = driver.findElement(By.id("email"));
        var password = driver.findElement(By.id("password"));

        await setTimeout(() => {
           
              username.sendKeys("test12");
             email.sendKeys("test12@gmail.com");
            password.sendKeys("test12")
            driver.findElement(By.xpath("//input[@id='sign-up-btn2']")).then(async (element) => {
                await element.click()
                await setTimeout(async () => {
                    try {
                        console.log('-------------Test SignUp----------')

                        //[RTM]Testcase#2 : if username is duplicated
                        let alert = await driver.switchTo().alert()
                        let alertText = await alert.getText()
                        assert.strictEqual(alertText, 'Username already in use')
                        await driver.switchTo().alert().accept();
                        console.log(alertText)
                        console.log('> Test case passed') 

                        //[RTM]Testcase#1 : if username is blank
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
                        
                         
                     //[RTM]Testcase#4 Password too small.                       
                       await password.clear().then(await password.sendKeys('test'))
                       await driver.findElement(By.xpath("//input[@id='sign-up-btn2']")).then(async(element3)=>{
                           await element3.click()
                           await setTimeout(async()=>{
                               let alert3 = await driver.switchTo().alert()
                               let alertText3 = await alert3.getText()
                               console.log(alertText3)
                               assert.strictEqual(alertText3, 'Password too small. Should be atleast 6 characters')
                               console.log('> Test case passed') 
                               await driver.switchTo().alert().accept();

                   
                         //[RTM]Testcase#5 Success register.  
                         /*remark: change username,email,password every times before test
                           to avoid duplicated 
                         */                     
                         await username.clear().then(await username.sendKeys('test3s'))
                        await email.clear().then(await email.sendKeys('test3s@gamil.com'))
                        await password.clear().then(await password.sendKeys('test13s'))
                       await driver.findElement(By.xpath("//input[@id='sign-up-btn2']")).then(async(element4)=>{
                           await element4.click()
                           await setTimeout(async()=>{
                               let alert4 = await driver.switchTo().alert()
                               let alertText4 = await alert4.getText()
                               console.log(alertText4)
                               assert.strictEqual(alertText4, 'Success')
                               console.log('> Test case passed') 
                               await driver.switchTo().alert().accept();

                   
                           },3000)
                       })
                           },3000)
                       })

                                
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

       

        var title = await driver.getTitle();
        console.log('Title is:', title);
       
    } catch (error) {
        console.error('> error : ', error);

    }
}