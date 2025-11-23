import {test,expect} from "@playwright/test"
import { PoManager } from "../pageobjects/PoManager";

test('@Web Client App login', async ({ page }) => {
    //js file- Login js, DashboardPage
    const poManager = new PoManager(page);
    const userName = "mail.srinivasakc@gmail.com";
    const productName = 'ZARA COAT 3';
   //  const loginPage = new LoginPage(page);
   //  const dashboard = new DashboardPage(page)
    const password = "password1234";

    const loginPage= poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(userName,password);

    const dashboard = poManager.getDashboardPage();
    await dashboard.searchProducts(productName);
    await dashboard.navigateToCart();
    //await page.pause();

    const cartPage = poManager.getCartPage();
    cartPage.verifyProductIsDisplayed(productName);
    cartPage.Checkout();



  
   //  await page.locator("div li").first().waitFor();
   //  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   //  expect(bool).toBeTruthy();
   //  await page.locator("text=Checkout").click();
  
   //  await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
   //  const dropdown = page.locator(".ta-results");
   //  await dropdown.waitFor();
   //  const optionsCount = await dropdown.locator("button").count();
   //  for (let i = 0; i < optionsCount; ++i) {
   //     const text = await dropdown.locator("button").nth(i).textContent();
   //     if (text === " India") {
   //        await dropdown.locator("button").nth(i).click();
   //        break;
   //     }
   //  }
  
    expect(page.locator(".user__name [type='text']").first()).toHaveText(userName);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
  
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
  
  
    for (let i = 0; i < await rows.count(); ++i) {
       const rowOrderId = await rows.nth(i).locator("th").textContent();
       if (orderId.includes(rowOrderId)) {
          await rows.nth(i).locator("button").first().click();
          break;
       }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
  
 });