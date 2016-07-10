var express= require("express")
var errorHandler= require("express-error-middleware")
var app=express()

app.use('/timestamp'/express.static(__dirname))
app.get('/timestamp/:str',function(req,res){
    var reqstr=req.params.str
    var isUnix= reqstr.search(/[a-z]|[A-Z]/)==-1?true:false
    
    var jsonDates= {}

    if(!isUnix && new Date(reqstr)=="Invalid Date")
        jsonDates={
            unix: null,
            natural: null
        }
    else if(isUnix) 
        jsonDates={
            unix: reqstr,
            natural: new Date(reqstr*1000).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric' })
        }
    else 
        jsonDates={
            unix: Date.parse(reqstr)/1000,
            natural: new Date(reqstr).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric' })
        }

    
    res.end(JSON.stringify(jsonDates))
})

app.get('/timestamp/*', errorHandler.NotFoundMiddleware)

app.listen(8080,function(){
    console.log("listening on port 8080")
})

