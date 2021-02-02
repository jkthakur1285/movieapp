var express = require("express");
var app = express();
var request = require("request");
app.set("view engine","ejs");

app.get("/",(req, res)=>{
	res.render("search");
})

app.get("/search",function(req, res){
	res.render("search");
});

app.get("/results",function(req, res){
	var query = req.query.searched_item;
	var url = "http://www.omdbapi.com/?s=";
	var api_key = "&apikey=thewdb";
	request(url+query+api_key, function(error, response, body){
		if(!error && response.statusCode == 200){
			var parsedData = JSON.parse(body);
			if(parsedData.Response=='False'){
				res.render("search");
			}
			res.render("search",{data:parsedData});}
		else
		    res.render("search");	
	});
});

app.get("/show/:name",function(req, res){
	var query = req.params.name;
	var url = "http://www.omdbapi.com/?t=";
	var api_key = "&apikey=thewdb";
	request(url+query+api_key, function(error, response, body){
		if(!error && response.statusCode == 200){
			var parsedData = JSON.parse(body);
			if(parsedData.Response=='False'){
				res.render("search");
			}
			//console.log(parsedData);
			res.render("view",{data:parsedData});}
		else
		    res.render("search");	
	});
});




const PORT = process.env.PORT

app.listen(PORT,function(){
	console.log("server has started at port no "+PORT)
});