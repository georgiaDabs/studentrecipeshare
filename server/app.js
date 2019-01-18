"use strict";
const express=require('express');
const bodyParser=require('body-parser');
var cors=require("cors");
const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({    
  extended: true
})); 
app.use(bodyParser.json());
var recipes={"Spaghetti":{
    "name": "Spaghetti",
    "writer": 899,
    "description": "lrevnofn ",
    "rating": 4,
    "image": {
      "small": "\images/foodExample1.jpg",
      "large": "/images/foodExample1.jpg"
	}
},"Cheesecake":{
	"name":"Cheesecake",
	"writer":"doctorwhocomposer",
	"description":"buwfeivnles",
	"rating":3,
	"image":{
		"small":"\images/foodExample3.jpg",
		"large":"\images/foodExample3.jpg"
		}
},"Burgers":{
	"name":"Burgers",
	"writer":"doctorwhocomposer",
	"description":"weogbnildk io1wdqne niowqw",
	"rating":2,
	"image":{
		"small":"\images/foodExample2.jpg",
		"large":"\images/foodExample2.jpg"
		
	}
	
}
};
var people={"doctorwhocomposer":{"username":"doctorwhocomposer", "forename":"Delia", "surname":"Derbyshire"}};
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });
app.all('/allrecipes',function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
	
});
app.all('/people',function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
	
});
app.all('/user/',function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
	
});
app.get("/people/:user", function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
	var person=req.params.user;
	res.send(people[person]);
});
app.get('/recipes/:user',function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
	var userStr=req.params.user;
	var current=[];
	for(var r in recipes){
		if(recipes[r].writer==userStr){
			console.log("sending"+recipes[r]);
			current.push(recipes[r]);
			
		}
	}
	console.log(current);
	res.send(current);
	
});
app.get('/recipe/:recipe',function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
	
	var recipe=req.params.recipe;
	console.log("request made for:"+recipe);
	res.send(recipes[recipe]);
})
app.get('/allrecipes',function(req,resp,next){
	console.log("request made for recipes");
	resp.send(recipes);
});

app.get('/people',function(req,resp,next){
	console.log("request made for people");
	resp.send(people);
	
});
app.get('/',function(req,resp,next){
	resp.send('hello');
	
});
app.listen(3000, ()=>{
	console.log("Listening on port 3000");
	
});
app.get("/isUser/:username",function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
	var username=req.params.username;
	console.log("trying first");
	res.send(people.hasOwnProperty(username));
	
});
app.post("/newRecipe",function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
	console.log("trying to post");
	console.log(req.body);
	console.log("title:"+req.body.title);
	console.log("writer:"+req.body.writer);
	console.log("description:"+req.body.description);
	recipes[req.body.title]={name: req.body.title,
	writer: req.body.writer,
    description: req.body.description ,
    rating: req.body.rating,
    image: {
      small: req.body.image,
     large: req.body.image}
	}
});
app.post("/people",function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
	var u=req.headers.username;
	if(people.hasOwnProperty(u)){
		res.send(400);
	}else{
		if(req.headers.access_token=="concertina"){
			people[req.headers.username]={username:req.headers.username,
			forename: req.headers.forename, surname:req.headers.forename};
		}else{
			console.log("not right");
			res.send(403);
	}}
});

module.exports = app;