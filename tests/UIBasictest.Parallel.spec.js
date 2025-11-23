const {test,expect} = require('@playwright/test');
// test.describe.configure({mode:'parallel'})
test('First Playwright Test',async({browser})=>{
//   chrome - plugins/cookies
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName =  page.locator("#username");
  const signInBtn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
      console.log(await page.title());
      await expect(page).toHaveTitle( "LoginPage Practise | Rahul Shetty Academy");
     await page.locator("#username").fill("rahulshett");
     await page.locator("[type='password']").fill("learning");
     await page.locator("#signInBtn").click();
    //  await page.locator("[style*='block']").textContent().then(console.log);
    console.log(await page.locator("[style*='block']").textContent());
    await expect(await page.locator("[style*='block']")).toContainText("Incorrect");
    // type - fill 
    await userName.fill("rahulshettyacademy");
    await signInBtn.click();
    console.log(await page.locator(".card-body a").first().textContent());
    console.log(await page.locator(".card-body a").nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);


});
 test('Page Playwright Test',async({page})=>{ 
    //   chrome - plugins/cookies
      await page.goto("https://google.com");
      console.log(await page.title());
      await expect(page).toHaveTitle("Google");

 });
//dropdowns,radio buttons
 test('UI Controls',async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    const userName =  page.locator("#username");
    const password = page.locator("#password");
    const signInBtn = page.locator("#signInBtn");
    const dropdowns = page.locator("select.form-control");
    //droopdowns
    await userName.fill("rahulshettyacademy");
    await password.fill("learning");
    await dropdowns.selectOption("consult");
    await dropdowns.selectOption("Teacher");
    //radio buttons
    await page.locator(".radiotextsty").last().click();//radio button
    await page.locator("#okayBtn").click();// alert popup
    //checkbox and assertion
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");
 
 });
 test('@Child windows hadl', async ({browser})=>
   {
      const context = await browser.newContext();
      const page =  await context.newPage();
      const userName = page.locator('#username');
      await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
      const documentLink = page.locator("[href*='documents-request']");
   
      const [newPage]=await Promise.all(
     [
        context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
        documentLink.click(),
     
     ])//new page is opened
     
   
     const  text = await newPage.locator(".red").textContent();
      const arrayText = text.split("@")
      const domain =  arrayText[1].split(" ")[0]
      //console.log(domain);
      await page.locator("#username").fill(domain);
      console.log(await page.locator("#username").inputValue());
   
   })
