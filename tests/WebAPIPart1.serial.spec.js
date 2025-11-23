import {test, expect,request} from "@playwright/test";
import { APIUtils } from "../utils/ApiUtils";
test.describe.configure({mode:'serial'})
const loginPayload = {
    userEmail: "anshika@gmail.com",
    userPassword: "Iamking@000"
}
const OrderPayload ={orders:[{country:"Cuba",productOrderedId:"68a961459320a140fe1ca57a"}]};
let response;


test.beforeAll(async()=>{
   const apiContext =  await request.newContext();
   const apiUtils = new APIUtils(apiContext,loginPayload);
   response = await apiUtils.createOrder(OrderPayload);
});
//create order
test('@Api Place the Order',async({page})=>{
   await page.addInitScript(value =>
        {
        window.localStorage.setItem('token',value);
        },
        response.token
    ); 
    await page.goto("https://rahulshettyacademy.com/client");
    // await page.getByPlaceholder("email@example.com").fill('anshika@gmail.com');
    // await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    const productName = 'ZARA COAT 3';
    const products = page.locator('.card-body');
    const email = 'anshika@gmail.com';
    // created order trough api
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
  
  
    for (let i = 0; i < await rows.count(); ++i) {
       const rowOrderId = await rows.nth(i).locator("th").textContent();
       if (response.orderId.includes(rowOrderId)) {
          await rows.nth(i).locator("button").first().click();
          break;
       }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
   //  await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
  
 });