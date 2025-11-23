import {test, expect} from "@playwright/test";

test('Popup validation',async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
//    await page.goto("https://google.com");
//    await page.goBack();
//    await page.goForward();
   await expect(page.locator('#displayed-text')).toBeVisible();
   await page.locator('#hide-textbox').click();
   await expect(page.locator('#displayed-text')).toBeHidden();
   page.on('dialog',dialog =>dialog.accept()); 
   await page.locator('#confirmbtn').click();
   await page.locator('#mousehover').hover();
   const framePage = page.frameLocator('#courses-iframe');
   //visible can be used in css locators in playwright when the muliple emement identified and only one visible
   await framePage.locator('li [href*="lifetime-access"]:visible').click();
   const subscribers = await framePage.locator('.text h2 span').textContent();
   console.log(subscribers);
   



});