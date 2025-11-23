export class APIUtils{
    constructor(apiContext,loginPayload)
        {
            this.apiContext = apiContext;
            this.loginPayload = loginPayload;
        }
   async getToken(){
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data:this.loginPayload
            })
            const loginResponseJson = await loginResponse.json();
            const token = loginResponseJson.token;
            console.log(token);
            return token;
        
    }

    async createOrder(OrderPayload){
        let response ={};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: OrderPayload,
                headers:{
                    'Authorization': response.token,
                    'content-type': 'application/json',
                },
            })
         const oderResponseJson = await orderResponse.json();
         console.log(oderResponseJson)
         const orderId = oderResponseJson.orders[0]
         console.log('Order ID: ',orderId)
         response.orderId=orderId;
         return response;
    }
}