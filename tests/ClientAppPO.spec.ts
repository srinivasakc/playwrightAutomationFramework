
 import {test, expect} from '@playwright/test';
import { POManager } from '../pageobjects/PoManager';
 
{
 test('@Web Client App login for', async ({page})=>
 {
   const poManager = new POManager(page);
   const username = "mail.srinivasakc@gmail.com";
   const productName = 'ZARA COAT 3';
  //  const loginPage = new LoginPage(page);
  //  const dashboard = new DashboardPage(page)
   const password = "password1234";
    //js file- Login js, DashboardPage
     const products = page.locator(".card-body");
     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(username,password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(productName);
     await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    let orderId:any;
     orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy(); 
 });
}


 

 



 

