const express = require('express');
const router = express.Router();
const fs = require('fs');
const mainPage = require('../lib/mainPage');
const auth = require('../lib/auth');

router.get('/', function(request, response, next){
    fs.readFile('./lib/mainPage.js', 'utf-8' ,function(error){
        if(error){
            next(error);
        }
        else{
            var html = mainPage.HTML(auth.StatusUI(request));
            response.send(html);
        }
    });
});

module.exports = router;