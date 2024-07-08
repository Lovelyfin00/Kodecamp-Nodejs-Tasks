const express = require("express");
const logger = require("morgan");
const uuid = require("uuid");

const server = express();

//include a middleware to help process requests. It means that when a request comes in
//this express.json should be used to work on the request. This is so it can
//accept json format request body/data
server.use(express.json());

//middleware for files
server.use(express.urlencoded({extended: false}));

server.use(logger("dev"))

let products = [];

server.get("/getProducts", function(request, response){
    response.send(products);
})

//create new product
server.post("/addProducts", function(request, response){
    const id = uuid.v4();
    const productDetails = request.body;

    products.push({
        id,
        name: productDetails.name,
        price: productDetails.price,
    })
    response.send(products);
})

// get a product
server.get("/getProduct/:id", function(request, response){
    const productId = request.params.id;

    const productFound = products.find(product => product.id === productId);
    console.log();(productFound)
    response.send(productFound);
})

//change values of a particular produc
server.put("/editProduct/:id", function(request, response){
    const productId = request.params.id;
    const productBody = request.body;

    console.log(products);
    products.map(product => {
        if( products.length > 0 && product.id === productId){
            product.name = productBody.name;
            product.price = productBody.price || product.price
        }
    })

    const successRes = products.length > 0 ? {
        status: true,
        message: "Product updated successfully",
        data: products
    } : {
        status: false,
        message: "No product has been added.",
        data: products
    }

    response.send(successRes);
})

//delete a product by the id
server.delete("/deleteProduct/:id", function(request, response){
    const productId = request.params.id;

    products = products.filter(product => product.id !== productId);

    response.send({
        status: true,
        message: "Product deleted successfully",
        data: products
    })
})

server.listen(3000, function(){
    console.log("Server is up");
})