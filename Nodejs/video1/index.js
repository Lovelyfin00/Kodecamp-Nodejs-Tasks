const express = require("express");

const server = express();

server.get("/", function(request, response){
    response.send("hello");
})

server.get("/about", function(req, res){
    response.send("This is about us endpoint/page");
})

server.get("/add/:val1/:val2", function(req, res){
    const result = parseInt(req.params.val1) + parseInt(req.params.val2);

    res.send("Result is " + result);
})

server.listen(3000, function(){
    console.log("server is up")
})