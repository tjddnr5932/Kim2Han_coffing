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
            var title = "메인 페이지";
            request.session.lognum = 0;
            var html = mainPage.HTML(title, auth.StatusUI(request, response));
            response.send(html);
        }
    });
});

module.exports = router;