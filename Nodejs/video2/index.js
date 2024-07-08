const express = require("express");
const server = express();

//include a middleware to help process requests. It means that when a request comes in
//this express.json should be used to work on the request. This is so it can
//accept json format request body/data
server.use(express.json());

//middleware for files
server.use(express.urlencoded({extended: false}));

server.use(function (request, response, next){
    console.log(request.protocol,  request.url, request.method);
    next(); //redirects to the correct route
})

server.get("/", function(request, response){
    response.send("hello");
})

server.get("/about", function(req, res){
    res.send("This is about us endpoint/page");
})

server.post("/login", function(req, res){
    console.log(req.body);
    console.log(req.headers["content-type"]);
    res.json({
        status: true,
        message: "Login successful"
    });
})

//anothee method to limit the json middleware to just one handler/route
// server.post("/login", express.json(), function(req, res){
//     console.log(req.body);
//     res.send("You sent a request");
// })

server.listen(3000, function(){
    console.log("Server is up");
})