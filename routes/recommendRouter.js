const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const nodeGeocoder = require('node-geocoder');
const recommendpage = require('../lib/recommendPage.js');
const recommend1 = require('../lib/recommendPages/recommend1.js');
const recommend2 = require('../lib/recommendPages/recommend2.js');
const recommend3 = require('../lib/recommendPages/recommend3.js');
const recommendMap = require('../lib/recommendMap.js');
const mysql = require('mysql');
const confiInfor = require('../dev/cofiInfor');
const db = mysql.createConnection(
    confiInfor.DBinfor
);

const geocoder = nodeGeocoder({
    provider : 'openstreetmap'});

function getDistance(lat1, lon1, lat2, lon2) {              //현재위치와 사용자 사이의 거리구하기
    if ((lat1 == lat2) && (lon1 == lon2)){
      return 0;
    }
    var radLat1 = Math.PI * lat1 / 180;
    var radLat2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radTheta = Math.PI * theta / 180;
    var dist = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
    if (dist > 1){
        dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515 * 1.609344 * 1000;
    if (dist < 100) {
      dist = Math.round(dist / 10) * 10;            //반올림
    }
    else {
      dist = Math.round(dist / 100) * 100;          //반올림
    }
    return dist;                                    //dist의 단위는 m 이다.
}


router.post('/', function(request, response, next){
  fs.readdir('./lib/recommendPages', function(error, filelist){
    if(error){
      next(error);
    }
    else{
      var title = "recommend";
      var list = ["원두 추천", "일반인 평가 추천", "프로 평가 추천"];
      if(list.length === filelist.length){
        var flist = recommendpage.list(filelist, list);
        var html = recommendpage.HTML(title, flist);
        response.send(html);
      }
    }
  });
});

router.post('/:pageId', function(req, res, next){
    let cafe1 = [];
    let cafe2 = [];
    let cafe3 = [];
    let cafe3_sort = [];
    var filterId = path.parse(req.params.pageId).base;
    fs.readFile(`./lib/recommendPages/${filterId}.js`, 'utf-8', function(error){
        if(error){
            next(error);
        }
        else{
            var title = req.params.pageId;
            var sanitizeTitle = sanitizeHtml(title);
            if(title === "recommend1"){

              var html = recommend1.HTML(sanitizeTitle);
              res.send(html);
            }
            if(title === "recommend2"){
              var html = recommend2.HTML(sanitizeTitle);
              res.send(html);
            }
            if(title === "recommend3"){
              var html = recommend3.HTML(sanitizeTitle);
              res.send(html);
            }
        }
    });
});

module.exports = router;
