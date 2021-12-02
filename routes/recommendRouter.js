const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const nodeGeocoder = require('node-geocoder');
const recommendpage = require('../lib/recommendPage.js');
const recommend1 = require('../lib/recommendPages/recommend1.js');
const recommend2 = require('../lib/recommendPages/recommend2.js');
const recommendMap = require('../lib/recommendMap.js');
const recommendList = require('../lib/recommendList.js');
const recommendListDist = require('../lib/recommendListDist.js');
const recommendListScope = require('../lib/recommendListScope.js');
const auth = require('../lib/auth');
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

function compare(a,b){                            //두배열을 비교하는 함수 true : 원소전부 같은 배열 , false : 원소 중 하나라도 다른 배열
  var c = true;
  for(var i=0; i<a.length;i++){
    if(a[i] != b[i]){
      c = false;
      break;
    }
  }
  return c;
}

function cafe_sort(a, b) {                       //distance로 정렬해주기 위해 json의 distance비교
  if(a.cafe_distance == b.cafe_distance){
    return 0;
  }
  return a.cafe_distance > b.cafe_distance ? 1 : -1;
}


router.post('/', function(request, response, next){
  fs.readdir('./lib/recommendPages', function(error, filelist){
    if(error){
      next(error);
    }
    else{
      if(request.user===undefined) {
        response.send("<script>alert('로그인이 필요합니다.');location.href='/';</script>");
      }
      else{
        var html = recommendpage.HTML(auth.StatusUI(request));
        response.send(html);
      }
    }
  });
});

router.post('/list/:pageId', function(request, response){
  const filterId = path.parse(request.params.pageId).base;
  const post = request.body;
  const cafe1 = JSON.parse(post.cafe1);
  const cafe2 = JSON.parse(post.cafe2);
  const cafe3 = JSON.parse(post.cafe3);
  const title = post.title;
  let html;

    db.query(`SELECT body, sweet, acidity, bitterness, balance, location FROM user WHERE id = "${request.user.id}"`, function(err, res){
      const temp = res[0].location.split(",");
      temp.pop();
      temp.pop();
      const loc=temp.reverse().join(" ");
      if(filterId==="grade"){html = recommendList.HTML(cafe1, cafe2, cafe3, res[0].body, res[0].sweet, res[0].acidity, res[0].bitterness, res[0].balance, loc, title);}
      else if(filterId==="distance"){html = recommendListDist.HTML(cafe1, cafe2, cafe3, res[0].body, res[0].sweet, res[0].acidity, res[0].bitterness, res[0].balance, loc, title);}
      else if(filterId==="scope"){
        var s_cafe1 = cafe1
        var s_cafe2 = cafe2
        var s_cafe3 = cafe3
        function scopeSort(a, b) { if(a.scope == b.scope){ return 0} return a.scope < b.scope ? 1 : -1; }
        s_cafe1.sort(scopeSort);
        s_cafe2.sort(scopeSort);
        s_cafe3.sort(scopeSort);
        html = recommendListScope.HTML(cafe1, cafe2, cafe3, res[0].body, res[0].sweet, res[0].acidity, res[0].bitterness, res[0].balance, loc, title, s_cafe1, s_cafe2, s_cafe3);
      }
      response.send(html);
    });
});

router.post('/:pageId', function(req, res, next){
    let cafe1 = [];
    let cafe2 = [];
    let cafe3 = [];
    var filterId = path.parse(req.params.pageId).base;
    fs.readFile(`./lib/recommendPages/${filterId}.js`, 'utf-8', function(error){
        if(error){
            next(error);
        }
        else{
            var title = req.params.pageId;
            var sanitizeTitle = sanitizeHtml(title);
            if(title === "recommend1"){
              db.query(`SELECT * FROM user WHERE id="${req.user.id}"`,function(error,user){
                if(error){
                  console.log(error);
                }
                else{
                  var taste = user[0].taste;
                  var lat_user = user[0].latitude;
                  var lon_user = user[0].longitude;
                  db.query(`SELECT * FROM cafe where city="${user[0].city}"`,function(error,cafe){
                    if(error){
                      console.log(error);
                    }
                    else{
                      db.query(`SELECT COUNT(*) as total FROM cafe where city="${user[0].city}"`,function(error, count){
                        if(error){
                          console.log(error);
                        }
                        else{
                          var user_taste_1 = [user[0].body-1, user[0].sweet,user[0].acidity,user[0].bitterness,user[0].balance];
                          var user_taste_2 = [user[0].body, user[0].sweet-1,user[0].acidity,user[0].bitterness,user[0].balance];
                          var user_taste_3 = [user[0].body, user[0].sweet,user[0].acidity-1,user[0].bitterness,user[0].balance];
                          var user_taste_4 = [user[0].body, user[0].sweet,user[0].acidity,user[0].bitterness-1,user[0].balance];
                          var user_taste_5 = [user[0].body, user[0].sweet,user[0].acidity,user[0].bitterness,user[0].balance-1];
                          var user_taste_6 = [user[0].body+1, user[0].sweet,user[0].acidity,user[0].bitterness,user[0].balance];
                          var user_taste_7 = [user[0].body, user[0].sweet+1,user[0].acidity,user[0].bitterness,user[0].balance];
                          var user_taste_8 = [user[0].body, user[0].sweet,user[0].acidity+1,user[0].bitterness,user[0].balance];
                          var user_taste_9 = [user[0].body, user[0].sweet,user[0].acidity,user[0].bitterness+1,user[0].balance];
                          var user_taste_10 = [user[0].body, user[0].sweet,user[0].acidity,user[0].bitterness,user[0].balance+1];
                          for(var i =0;i<count[0].total;i++){
                            var lat_cafe = cafe[i].cafe_latitude;
                            var lon_cafe = cafe[i].cafe_longitude;
                            var cafe_bean = cafe[i].cafe_bean;
                            var cafe_bean_split = cafe[i].cafe_bean.split("/");
                            var distance = getDistance(lat_user,lon_user,lat_cafe,lon_cafe);
                            if(distance <= user[0].distance){
                              if(taste === cafe_bean){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe1.push(cafe_json);
                              }
                              else if(compare(cafe_bean_split,user_taste_1)){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe2.push(cafe_json);
                              }
                              else if(compare(cafe_bean_split,user_taste_2)){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe2.push(cafe_json);
                              }
                              else if(compare(cafe_bean_split,user_taste_3)){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe2.push(cafe_json);
                              }
                              else if(compare(cafe_bean_split,user_taste_4)){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe2.push(cafe_json);
                              }
                              else if(compare(cafe_bean_split,user_taste_5)){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe2.push(cafe_json);
                              }
                              else if(compare(cafe_bean_split,user_taste_6)){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe2.push(cafe_json);
                              }
                              else if(compare(cafe_bean_split,user_taste_7)){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe2.push(cafe_json);
                              }
                              else if(compare(cafe_bean_split,user_taste_8)){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe2.push(cafe_json);
                              }
                              else if(compare(cafe_bean_split,user_taste_9)){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe2.push(cafe_json);
                              }
                              else if(compare(cafe_bean_split,user_taste_10)){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe2.push(cafe_json);
                              }
                            }
                          }
                          console.log(cafe2);
                        }
                      });
                    }
                  });
                }
              });
            }
            if(title === "recommend2"){
              db.query(`SELECT * FROM user WHERE id="${req.user.id}"`,function(error,user){
                if(error){
                  console.log(error);
                }
                else{
                  var taste = user[0].taste;
                  var taste_split = taste.split("/");
                  var lat_user = user[0].latitude;
                  var lon_user = user[0].longitude;
                  db.query(`SELECT * FROM cafe where city="${user[0].city}"`,function(error,cafe){
                    if(error){
                      console.log(error);
                    }
                    else{
                      db.query(`SELECT COUNT(*) as total FROM cafe where city="${user[0].city}"`,function(error, count){
                        if(error){
                          console.log(error);
                        }
                        else{
                          var user_taste_1 = [user[0].body-1, user[0].sweet,user[0].acidity,user[0].bitterness,user[0].balance];
                          var user_taste_2 = [user[0].body, user[0].sweet-1,user[0].acidity,user[0].bitterness,user[0].balance];
                          var user_taste_3 = [user[0].body, user[0].sweet,user[0].acidity-1,user[0].bitterness,user[0].balance];
                          var user_taste_4 = [user[0].body, user[0].sweet,user[0].acidity,user[0].bitterness-1,user[0].balance];
                          var user_taste_5 = [user[0].body, user[0].sweet,user[0].acidity,user[0].bitterness,user[0].balance-1];
                          var user_taste_6 = [user[0].body+1, user[0].sweet,user[0].acidity,user[0].bitterness,user[0].balance];
                          var user_taste_7 = [user[0].body, user[0].sweet+1,user[0].acidity,user[0].bitterness,user[0].balance];
                          var user_taste_8 = [user[0].body, user[0].sweet,user[0].acidity+1,user[0].bitterness,user[0].balance];
                          var user_taste_9 = [user[0].body, user[0].sweet,user[0].acidity,user[0].bitterness+1,user[0].balance];
                          var user_taste_10 = [user[0].body, user[0].sweet,user[0].acidity,user[0].bitterness,user[0].balance+1];
                          for(var i =0;i<count[0].total;i++){
                            var lat_cafe = cafe[i].cafe_latitude;
                            var lon_cafe = cafe[i].cafe_longitude;
                            var cafe_review_public = cafe[i].cafe_review_public;
                            var cafe_review_public_split = cafe[i].cafe_review_public.split("/");
                            var distance = getDistance(lat_user,lon_user,lat_cafe,lon_cafe);
                            if(distance <= user[0].distance){
                              if(taste === cafe_review_public){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe1.push(cafe_json);
                              }
                              else if(compare(cafe_review_public_split,user_taste_1)){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe2.push(cafe_json);
                              }
                              else if(compare(cafe_review_public_split,user_taste_2)){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe2.push(cafe_json);
                              }
                              else if(compare(cafe_review_public_split,user_taste_3)){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe2.push(cafe_json);
                              }
                              else if(compare(cafe_review_public_split,user_taste_4)){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe2.push(cafe_json);
                              }
                              else if(compare(cafe_review_public_split,user_taste_5)){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe2.push(cafe_json);
                              }
                              else if(compare(cafe_review_public_split,user_taste_6)){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe2.push(cafe_json);
                              }
                              else if(compare(cafe_review_public_split,user_taste_7)){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe2.push(cafe_json);
                              }
                              else if(compare(cafe_review_public_split,user_taste_8)){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe2.push(cafe_json);
                              }
                              else if(compare(cafe_review_public_split,user_taste_9)){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe2.push(cafe_json);
                              }
                              else if(compare(cafe_review_public_split,user_taste_10)){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe2.push(cafe_json);
                              }
                              else{
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe3.push(cafe_json);
                              }
                            }
                          }
                          cafe1.sort(cafe_sort);                   //distance를 이용하여 오름차순으로 정렬
                          cafe2.sort(cafe_sort);
                          cafe3.sort(cafe_sort);
                          var html = recommendMap.HTML(cafe1, cafe2,cafe3, user[0].latitude, user[0].longitude,title);
                          res.send(html);
                        }
                      });
                    }
                  });
                }
              });
            }
            if(title === "recommend3"){
              db.query(`SELECT * FROM user WHERE id="${req.user.id}"`,function(error,user){
                if(error){
                  console.log(error);
                }
                else{
                  var taste = user[0].taste;
                  var taste_split = taste.split("/");
                  var lat_user = user[0].latitude;
                  var lon_user = user[0].longitude;
                  db.query(`SELECT * FROM cafe where city="${user[0].city}"`,function(error,cafe){
                    if(error){
                      console.log(error);
                    }
                    else{
                      db.query(`SELECT COUNT(*) as total FROM cafe where city="${user[0].city}"`,function(error, count){
                        if(error){
                          console.log(error);
                        }
                        else{
                          var user_taste_1 = [user[0].body-1, user[0].sweet,user[0].acidity,user[0].bitterness,user[0].balance];
                          var user_taste_2 = [user[0].body+1, user[0].sweet,user[0].acidity,user[0].bitterness,user[0].balance];
                          var user_taste_3 = [user[0].body, user[0].sweet-1,user[0].acidity,user[0].bitterness,user[0].balance];
                          var user_taste_4 = [user[0].body, user[0].sweet+1,user[0].acidity,user[0].bitterness,user[0].balance];
                          var user_taste_5 = [user[0].body, user[0].sweet,user[0].acidity-1,user[0].bitterness,user[0].balance];
                          var user_taste_6 = [user[0].body, user[0].sweet,user[0].acidity+1,user[0].bitterness,user[0].balance];
                          var user_taste_7 = [user[0].body, user[0].sweet,user[0].acidity,user[0].bitterness-1,user[0].balance];
                          var user_taste_8 = [user[0].body, user[0].sweet,user[0].acidity,user[0].bitterness+1,user[0].balance];
                          var user_taste_9 = [user[0].body, user[0].sweet,user[0].acidity,user[0].bitterness,user[0].balance-1];
                          var user_taste_10 = [user[0].body, user[0].sweet,user[0].acidity,user[0].bitterness,user[0].balance+1];
                          for(var i =0;i<count[0].total;i++){
                            var lat_cafe = cafe[i].cafe_latitude;
                            var lon_cafe = cafe[i].cafe_longitude;
                            var cafe_review_pro = cafe[i].cafe_review_pro;
                            var cafe_review_pro_split = cafe[i].cafe_review_pro.split("/");
                            var distance = getDistance(lat_user,lon_user,lat_cafe,lon_cafe);
                            if(distance <= user[0].distance){
                              if(taste === cafe_review_pro){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe1.push(cafe_json);
                              }
                              else if(compare(cafe_review_pro_split,user_taste_1)){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe2.push(cafe_json);
                              }
                              else if(compare(cafe_review_pro_split,user_taste_2)){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe2.push(cafe_json);
                              }
                              else if(compare(cafe_review_pro_split,user_taste_3)){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe2.push(cafe_json);
                              }
                              else if(compare(cafe_review_pro_split,user_taste_4)){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe2.push(cafe_json);
                              }
                              else if(compare(cafe_review_pro_split,user_taste_5)){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe2.push(cafe_json);
                              }
                              else if(compare(cafe_review_pro_split,user_taste_6)){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe2.push(cafe_json);
                              }
                              else if(compare(cafe_review_pro_split,user_taste_7)){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe2.push(cafe_json);
                              }
                              else if(compare(cafe_review_pro_split,user_taste_8)){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe2.push(cafe_json);
                              }
                              else if(compare(cafe_review_pro_split,user_taste_9)){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe2.push(cafe_json);
                              }
                              else if(compare(cafe_review_pro_split,user_taste_10)){
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe2.push(cafe_json);
                              }
                              else{
                                var cafe_json = {
                                  cafe_id: cafe[i].cafe_id,
                                  cafe_name: cafe[i].cafe_name,
                                  cafe_location: cafe[i].cafe_location,
                                  cafe_latitude: cafe[i].cafe_latitude,
                                  cafe_longitude: cafe[i].cafe_longitude,
                                  cafe_distance:distance,
                                  cafe_bean:cafe[i].cafe_bean,
                                  scope:cafe[i].scope
                                };
                                cafe3.push(cafe_json);
                              }
                            }
                          }
                          cafe1.sort(cafe_sort);                   //distance를 이용하여 오름차순으로 정렬
                          cafe2.sort(cafe_sort);
                          cafe3.sort(cafe_sort);
                          var html = recommendMap.HTML(cafe1, cafe2,cafe3, user[0].latitude, user[0].longitude,title); //사용자 lat, lon넣기
                          res.send(html);
                        }
                      });
                    }
                  });
                }
              });
            }
        }
    });
});

module.exports = router;
