const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const MyPage = require('../lib/MyPage');
const tasteSetting = require('../lib/mypages/tasteSetting.js');
const locationSetting = require('../lib/mypages/locationSetting.js');
const Itis = require('../gitignore');
const mysql = require('mysql');


const db = mysql.createConnection(
    Itis.DBinfor
);


router.get('/', function(request, response, next){
    fs.readdir('./lib/mypages', function(error, filelist){
        if(error){
            next(error);
        }
        else{
            var title = "MyPage";
            var list = ["위치 설정", "자격증 인증", "맛 설정"];
            if(list.length === filelist.length){
                var flist = MyPage.list(filelist, list);
                var html = MyPage.HTML(title, flist);
                response.send(html);
            }
            else{
                console.log("마이페이지 리스트의 개수가 갖지 않습니다.");
                response.send("서버에 오류가 발생했습니다.");
            }
        }
    });
});

router.post('/taste_process', function(request, response){
    var post = request.body;
    var taste = post.body+ "/" + post.sweet + "/" + post.acidity + "/" + post.btterness + "/" + post.balance
    db.query('UPDATE user SET taste = ' + '"' + taste + '"' + ' WHERE id = "test1"');
    console.log('UPDATE user SET taste = ' + '"' + taste + '"' + ' WHERE id = "test1"');
    response.writeHead(302, {Location : '/mypage'});
    response.end();
});

router.post('/:pageId', function(request, response, next){
    var filterId = path.parse(request.params.pageId).base;
    fs.readFile(`./lib/mypages/${filterId}.js`, 'utf-8', function(error){
        if(error){
            next(error);
        }
        else{
            var title = request.params.pageId;
            var sanitizeTitle = sanitizeHtml(title);
            if(title === "tasteSetting"){
                var html = tasteSetting.HTML(sanitizeTitle);
                response.send(html);
            }
            if(title === "locationSetting"){
                var html = locationSetting.HTML(sanitizeTitle);
                response.send(html);
            }
        }
    });
});


module.exports = router;