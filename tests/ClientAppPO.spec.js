
import {test, expect} from '@playwright/test';
import { POManager } from '../pageobjects/PoManager';
import dataSet from '../utils/placeorderTestData.json';
import {customtest} from '../utils/test-base.js';
 
for(const data of dataSet){
 test(`Client App login for ${data.productName}`, async ({page})=>
 {
   const poManager = new POManager(page);
  //  const username = "mail.srinivasakc@gmail.com";
  //  const productName = 'ZARA COAT 3';
  //  const loginPage = new LoginPage(page);
  //  const dashboard = new DashboardPage(page)
  //  const password = "password1234";
    //js file- Login js, DashboardPage
    //  const products = page.locator(".card-body");
     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(data.username,data.password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(data.productName);
     await dashboardPage.navigateToCart();
    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    let orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy(); 
 });
}
customtest('Client App login', async ({page,testDataForOrder})=>
  {
    const poManager = new POManager(page);
   //  const username = "mail.srinivasakc@gmail.com";
   //  const productName = 'ZARA COAT 3';
   //  const loginPage = new LoginPage(page);
   //  const dashboard = new DashboardPage(page)
   //  const password = "password1234";
     //js file- Login js, DashboardPage
     //  const products = page.locator(".card-body");
      const loginPage = poManager.getLoginPage();
      await loginPage.goTo();
      await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password);
      // page.pause()
      const dashboardPage = poManager.getDashboardPage();
      // page.pause()
      await dashboardPage.searchProductAddCart(testDataForOrder.productName);
      await dashboardPage.navigateToCart();
 
     const cartPage = poManager.getCartPage();
     await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
     await cartPage.Checkout();
 
    
  });

 
  
 
  
 
 
 
  
 
 

 

 



 

