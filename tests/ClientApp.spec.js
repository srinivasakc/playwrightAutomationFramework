import {test,expect} from "@playwright/test"

test("Client page",async({page})=>{
    const productName = 'ZARA COAT 3';
    const products = page.locator('.card-body');
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill('anshika@gmail.com');
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    await page.getByRole('button',{name:'login'}).click();
    await products.first().waitFor();
    await products.filter({hasText:productName})
    .getByRole('button',{name:' Add To Cart'}).click();
    //click on cart button
    await page.getByRole('listitem').getByRole('button',{name:'cart'}).click();
    //wait for cart page to load
    await page.locator('div li').first().waitFor();
   await expect(page.getByText(productName)).toBeVisible();
    //click on checkout
    page.getByRole('button',{name:'Checkout'}).click();
    //enter credit card details
    await page.getByRole('textbox').first().clear();
    await page.getByRole('textbox').first().fill('2222 9931 9292 1111');
    await page.getByRole('textbox').nth(1).fill('123');
    await page.getByRole('textbox').nth(2).fill('Ansika');
    await page.getByRole('combobox').first().selectOption('05');
    await page.getByRole('combobox').last().selectOption('29');
    await page.locator('input[name="coupon"]').fill('Ansika');
    await page.getByRole('textbox',{name:'Select Country'}).pressSequentially('Ind',{delay:150})
    await page.getByRole('button',{name:'India'}).nth(1).click();
    await page.getByText('PLACE ORDER').click();
    await expect(page.getByText('Thankyou for the order.')).toBeVisible();
    const orderID= await page.locator('tr.ng-star-inserted td label').textContent();
    console.log(orderID);
    await page.getByRole('listitem').getByRole('button',{name:'ORDERS'}).click();
    await page.locator('tbody').waitFor();
    const rows =page.locator('tbody tr');
    for (let i=0 ;i<await rows.count();i++){
        const rowOrderID = await rows.locator('th').nth(i).textContent();
        console.log(rowOrderID);
        if(orderID.includes(rowOrderID)){
            await rows.getByRole('button',{name:'View'}).nth(i).click();
        }

    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderID.includes(orderIdDetails)).toBeTruthy();
   

});