
import { test as base } from "@playwright/test";

export const customtest = base.extend({
    testDataForOrder: async ({}, use) => {
        await use({
            username: "mail.srinivasakc@gmail.com",
            password: "password1234",
            productName: "ZARA COAT 3",
        });
    },
});

// import {base} from "@playwright/test"

// exports.customtest = base.test.extend({
//     testDataForOrder : {
//      "username" : "mail.srinivasakc@gmail.com",
//         "password" : "password1234",
//         "productName":"ZARA COAT 3"
//     }
// })