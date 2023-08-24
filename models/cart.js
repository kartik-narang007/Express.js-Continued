const fs = require('fs');

const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);


module.exports = class Cart{
    static addProduct(id, productPrice){
        //Fetch the previous cart
        fs.readFile(p, (err,fileContent)=>{
            let cart = {products : [], totalPrice : 0};
            if(!err){
                cart = JSON.parse(fileContent);
            }
        

        //Analyze the Cart => Find existing Product

        const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
        const existingProduct = cart.products[existingProductIndex];
        let updatedProduct;
        //Add new Product/ increase Quantity.
        if(existingProduct){
            updatedProduct = {...existingProduct };
            updatedProduct.qty = updatedProduct.qty + 1;
            cart.products = [...cart.products];
            cart.products[existingProductIndex] = updatedProduct;
        }
        else{
            updatedProduct = {id : id, qty : 1};
            cart.products = [...cart.products, updatedProduct];
        }
        cart.totalPrice = cart.totalPrice + +productPrice;
        fs.writeFile(p, JSON.stringify(cart), (err)=>{
            console.log(err);
        })
        })
    }
    

}








//isliye ham contructor na banake ek static method banayenge addProduct naam se jisme ham id ka inoput lenge.

// ab cart me 3 steps honge ek to previous cart ko fetch krna
//Analyze krna cart ko and existing product ko find krna
//Add new product and quantity increase krna

//ab previous cart fetch hame fileSystem se krna pdega to ham kya krenge sbse pehle file system ki module ko import krenge and same time path module ko bhi
//and ek cart.json tk ka path banayenge const p naame se

//ab ham check krenge pehle ki system me cart.json file hai ke nahi 
//cart create krenge jisme ek products naam ke empty array and ek totalPrice naam ka variable hoga jiski value 0 hogi.
//agar hamein file read krte waqt error nahi milta matlab kya hai ki file mili hai to ham json file jo parse krke usko cart me store kr denge.



//Step - 2 : ab cart ko analyze krenge and check krenge ki ham jo cart me product add krne ki koshish kr rhe hai vo already hai ke nahi?
        //iske liye ham cart ke products array me find method lagakar check krenge ki us product ki id cart me kisi product se milti hai ke nahi?
        //agar milti hai to ham updatedProduct naam ka ek variable banayenge and spread operater ki madad se usme existing product ki saari properties store kr lenge
        // and updated product ki quantity updatedProduct.qty + 1 kr denge.


        //agar hame cart me new product add krna hai to uski id ko ham product ki id set krenge and qty ko 1 rkhenge.

        //ab product price se deal krne ke liye function me ham productPrice bhi as a parameter lenge


        //ye sb hp gya ab hame products array ka bhi kuchh krna pdega to hame kya krenge ki agar hamne naya product add kiya hai to ham spread operator se 
                //cart.products = [...cart.products, updatedProduct];
        //kr denge
        

        //otherwise agar hamne existing product add kiya hai to ham ek chhota sa modification krenge existingProduct jahan utha rhe the ab vahan existingProductIndex uthayenge find ki jagah findIndex method use krke.
        //and existingProducts = cart.products[existingProductIndex];

        //isse hame us specific index pr pde purane product ko naye updatedProduct se replace krne me asani hogi

        