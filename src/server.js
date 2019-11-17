var express=require('express');
var app=express();
app.set('view engine','html');
app.get('/',function(req,res)
{
res.render('index',
{})
});
var server=app.listen(3000,function() {});
