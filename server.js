var express= require("express")
var app=express()

app.use('/',function(req,res){
    res.end("Hello World!")
}).listen(8080,function(){
    console.log("listening on port 8080")
})