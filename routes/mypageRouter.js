const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const nodeGeocoder = require('node-geocoder');
const MyPage = require('../lib/MyPage');
const tasteSetting = require('../lib/mypages/tasteSetting.js');
const locationSetting = require('../lib/mypages/locationSetting.js');
const mysql = require('mysql');

const confiInfor = require('../dev/cofiInfor');
const db = mysql.createConnection(
    confiInfor.DBinfor
);

const geocoder = nodeGeocoder({ 
    provider : 'google', 
    apiKey : 'AIzaSyCMDf2l1t3TI4vWzFFYXN8R44KaGsP0Gl4',
    formatter: null });


router.get('/', function(request, response, next){
    fs.readdir('./lib/mypages', function(error, filelist){
        if(error){
            next(error);
        }
        else{
            if(request.user===undefined) {
                return response.redirect('/');
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
        }
    });
});

router.post('/taste_process', function(request, response){
    var post = request.body;
    var taste = post.body+ "/" + post.sweet + "/" + post.acidity + "/" + post.btterness + "/" + post.balance
    var id = request.user.id;
    db.query('UPDATE user SET taste = ' + '"' + taste + '"' + ' WHERE id = ' + '"' + id + '"');
    console.log('UPDATE user SET taste = ' + '"' + taste + '"' + ' WHERE id = ' + '"' + id + '"');
    response.writeHead(302, {Location : '/mypage'});
    response.end();
});

router.post('/mlocation_process', function(request, response){
    var post = request.body;
    var _lat = post.lat;
    var _lng = post.lng;

    geocoder.reverse({lat:_lat, lon:_lng})
    .then((res)=> {
    console.log(res);
    })
    .catch((err)=> {
    console.log(err);
    });

    console.log(`lat : ${_lat}, lng : ${_lng}`);

    db.query(`INSERT INTO user(location, latitude, longitude) values(${loc}, ${_lat}, ${_lng})`);
    console.log(`INSERT INTO user(location, latitude, longitude) values(${loc}, ${_lat}, ${_lng})`);

    response.writeHead(302, {Location : '/mypage'});
    response.end();
});

router.post('/location_process', function(request, response){
    var post = request.body;
    var loc = post.loc;
    var lat;
    var lng;

    geocoder.geocode(loc)
    .then((res)=> {
    console.log(res);
    })
    .catch((err)=> {
    console.log(err);
    });

    console.log(`loc: ${loc}, lat : ${lat}, lng : ${lng}`);

    //db.query(`INSERT INTO user(location, latitude, longitude) values(${loc}, ${lat}, ${lng})`);
    //console.log(`INSERT INTO user(location, latitude, longitude) values(${loc}, ${lat}, ${lng})`);

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

