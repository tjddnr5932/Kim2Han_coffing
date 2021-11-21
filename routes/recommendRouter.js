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
