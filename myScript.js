"use strict";
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))


app.use(express.static('public'));
var requestURL = "recipes.json";
var request =new XMLHttpRequest();
request.open('GET',requestURL);
request.responseType = 'json';
request.send();
