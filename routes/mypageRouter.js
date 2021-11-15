const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const nodeGeocoder = require('node-geocoder');
const MyPage = require('../lib/MyPage');
const tasteSetting = require('../lib/mypages/tasteSetting.js');
const locationSetting = require('../lib/mypages/locationSetting.js');
const proofSetting = require('../lib/mypages/proof.js');
const visitedList = require('../lib/mypages/visitedList.js');
const writeReview = require('../lib/writeReview.js');
const viewCafe = require('../lib/viewCafe.js');
const mysql = require('mysql');
const multer = require('multer');

var _storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'uploads/')
  },
  filename:function(req,file,cb){
    cb(null, file.originalname);
  }
})

const upload = multer({storage:_storage});

const confiInfor = require('../dev/cofiInfor');
const db = mysql.createConnection(
    confiInfor.DBinfor
);

const geocoder = nodeGeocoder({provider : 'openstreetmap'});


router.get('/', function(request, response, next){
    fs.readdir('./lib/mypages', function(error, filelist){
        if(error){
            next(error);
        }
        else{
            if(request.user===undefined) {
                response.redirect('/');
            }
            else{
                var title = "MyPage";
                var list = ["위치 설정", "자격증 인증", "맛 설정", "방문한 카페"];
                db.query(`SELECT * FROM user WHERE id = "${request.user.id}"`, function(error, result){
                  if(error){
                    console.log(error);
                  }
                  else{
                    const name = result[0].name;
                    const age = result[0].age;
                    const gender = result[0].gender;
                    const phone = result[0].phone;
                    const birth = result[0].birth;
                    const location = result[0].location;
                    const taste = result[0].taste;
                    const tasteArr = taste.split("/");
                    const latitude = result[0].latitude;
                    const longitude = result[0].longitude;
                    const lat = parseFloat(latitude);
                    const lon = parseFloat(longitude);
                    

                    if(list.length === filelist.length){
                      var flist = MyPage.list(filelist, list);
                      var html = MyPage.HTML(title, request.user.id, name, age, gender, phone, birth, location,
                        tasteArr[0], tasteArr[1], tasteArr[2], tasteArr[3], tasteArr[4], lat, lon, flist);
                      response.send(html);
                    }
                    else{
                        console.log("마이페이지 리스트의 개수가 같지 않습니다.");
                        response.send("서버에 오류가 발생했습니다.");
                    }
                  }
                });
            }
        }
    });
});

router.post('/upload_process',upload.single("name"),function(req,res){
  db.query(`SELECT COUNT(*) as total FROM proof_data`,function(error, count){
    if(error){
      console.log(error);
    }
    else{
      db.query(`SELECT id FROM proof_data WHERE id="${req.user.id}"`,function(error, sql){
        if(error){
          console.log(error);
        }
        else if(sql[0] === undefined ){          //proof_data 데이터베이스안에 유저의 id가 없을 때
          db.query('insert into proof_data(num,id,img) values (?,?,?)',[count[0].total+1,req.user.id,req.file.path],function(req,res){
            console.log(req.user.id +' : '+"사진 저장");
          });
        }
        else{                                  //proof_data 데이터베이스안에 유저의 id가 있을때 중복제거
          console.log(req.file.path);
          db.query(`update proof_data set img=? where id = "${req.user.id}"`,[req.file.path],function(req,res){
            console.log("중복 제거");
          });
        }
      });
    }
  });
  res.writeHead(302, {Location : '/mypage'});
  res.end();
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
    var loc;
    var _lat = post.lat;
    var _lng = post.lng;

    geocoder.reverse({lat:parseFloat(_lat), lon:parseFloat(_lng)})
    .then((res)=> {
        loc = res[0].formattedAddress;
        db.query(`UPDATE user SET location = "${loc}", latitude = "${_lat}", longitude = "${_lng}" WHERE id = "${request.user.id}" `);
        console.log(`UPDATE user SET location = "${loc}", latitude = "${_lat}", longitude = "${_lng}" WHERE id = "${request.user.id}" `);
    })
    .catch((err)=> {
        console.log(err);
    });

    response.writeHead(302, {Location : '/mypage'});
    response.end();
});

router.post('/location_process', function(request, response){
    var post = request.body;
    var loc = post.loc;
    var _lat;
    var _lng;

    geocoder.geocode(loc)
    .then((res)=> {
        _lat = res[0].latitude;
        _lng = res[0].longitude;
        db.query(`UPDATE user SET location = "${loc}", latitude = "${_lat}", longitude = "${_lng}" WHERE id = "${request.user.id}" `);
        console.log(`UPDATE user SET location = "${loc}", latitude = "${_lat}", longitude = "${_lng}" WHERE id = "${request.user.id}" `);
    })
    .catch((err)=> {
    console.log(err);
    });

    response.writeHead(302, {Location : '/mypage'});
    response.end();
});

router.post('/visit_cafe', function(request, response){  // 아직 미구현된 카페 방문하기 기능
  var post = request.body;
  let today = new Date();
  today += 540;
  console.log('cafe_id: ', post.cafe_id);
  test = [{
    cafe_id:"0",
    date: today,
    review:true
  }];

  test.push({
    cafe_id:"1",
    date: today,
    review:false
  });

  console.log(test);
  var testStr = JSON.stringify(test);

  db.query(`UPDATE user SET visited = '${testStr}' WHERE id = "${request.user.id}"`);
  console.log(`UPDATE user SET visited = '${testStr}' WHERE id = "${request.user.id}"`);
});


router.post('/comment_public', function(request, response){ //일반인 댓글 보기
  const post = request.body;
  const cafe_id = post.cafe_id;
  db.query(`SELECT comment FROM review_public WHERE cafe_id = "${cafe_id}"`, function(error, result){
    var body = "<h1>일반인 댓글 보기<h1>";
    var i = 0;
    while(i<result.length){
      body+=`<p>${result[i].comment}</p></br>`;
      i++;
    }
    var html = viewCafe.HTML(cafe_id, body);
    response.send(html);
  });
});


router.post('/comment_pro', function(request, response){ //전문가 댓글 보기
  const post = request.body;
  const cafe_id = post.cafe_id;
  db.query(`SELECT comment FROM review_pro WHERE cafe_id = "${cafe_id}"`, function(error, result){
    var body = "<h1>전문가 댓글 보기<h1>";
    var i = 0;
    var count = 0;
    while(i<result.length){
      if(result[i].comment!==""||result[i].comment==null);
      else body+=`<p>${result[i].comment}</p></br>`;
      i++;
    }
    var html = viewCafe.HTML(cafe_id, body);
    response.send(html);
  });
});


router.post('/view_cafe', function(request,response){ //카페 정보 보기
  const post = request.body;
  const cafe_id = post.cafe_id;

  db.query(`SELECT * FROM cafe WHERE cafe_id = "${cafe_id}"`, function(error, result){
    if(error){
      console.log(error);
    }
    else{
      db.query(`SELECT latitude, longitude FROM user WHERE id = "${request.user.id}"`, function(err, res){
        if(err){
          console.log(err);
        }
        else{
          const cafe_name = result[0].cafe_name;
          const cafe_location = result[0].cafe_location;
          const cafe_bean = result[0].cafe_bean;
          var cafe_review_public = result[0].cafe_review_public;
          if(cafe_review_public===null) cafe_review_public ="준비중!"
          var cafe_review_pro = result[0].cafe_review_pro;
          if(cafe_review_pro===null) cafe_review_pro ="준비중!"
          const scope = result[0].scope;
          const photoStr = result[0].photo;
          let photo;
          

          var distance = viewCafe.DIST(res[0].latitude, res[0].longitude, result[0].cafe_latitude, result[0].cafe_longitude);
          var body = `      
          <td align="center" style="width: 33.3%; border-right: 1px solid black;">
          <div align="left" style="margin-left: 38%;">
            <h1 style="margin-top: 80px;">${cafe_name}</h1>
            원두 <input class="inputA" id="my_ID" type="text" readonly value= "${cafe_bean}" style="margin-left: 24.5px;"><br>
            위치 <input class="inputA" id="my_Birth" type="text" readonly value="${cafe_location}" style="margin-left: 24.5px;"><br>
            거리 <input class="inputA" id="my_Location" type="text" readonly value="${distance}" style="margin-left: 24.5px;"><br>
            일반인 <input class="inputB" id="my_Name" type="text" readonly value="${cafe_review_public}" style="margin-left: 7px; margin-right: 20px;">
            전문가 <input class="inputB" id="my_Age" type="text" readonly value="${cafe_review_pro}" style="margin:0px 7px;"><br>
            별점 <input class="inputB" id="my_Phone" type="text" readonly value="${scope}" style="margin-left: 24.5px;"><br>
            <p><img src = "../image/test1.png" /></p>
          </div>
          </td>
          `
          if(photoStr==undefined);
          else{ 
            photo = JSON.parse(photoStr);
            var i = 0;
            while(i<photo.length){
              body += `<input src = ${photo[0].src.replace('public', '..')} />` //src는 photo json배열이 가지는 img의 경로로 정적 image 폴더로 image는 생략한다.
              i++;
            }
          }
          var html = viewCafe.HTML(cafe_id, body);
          response.send(html);
        }
      });
    }
  });
});


router.post('/write_review_process', function(request, response){ // 리뷰 작성하기
  db.query(`SELECT pro FROM user WHERE id = "${request.user.id}"`, function(error, result){
    if(error){
      console.log(error);
    }
    else{
      var post = request.body;
      var cafe_id = post.cafe_id;
      var user_id = request.user.id;
      var body = post.body;
      var sweet = post.sweet;
      var acidity = post.acidity;
      var btterness = post.btterness;
      var balance = post.balance;
      var scope = post.scope;
      var comment = post.comment;
    
      
      if(result[0].pro){
        db.query(`SELECT COUNT(*) as total FROM review_pro`,function(err, count){ //전문가 리뷰 테이블 튜플 세기
          if(err){
            console.log(err);
          }
          else{
            db.query(`SELECT review_num FROM review_pro WHERE cafe_id="${cafe_id}" AND user_id ="${user_id}"`, function(er, res){ // 사용자가 해당 카페의 리뷰를 남겼으면 다시 남기지 못한다.
              if(res[0]===undefined){ //사용자가 리뷰를 아직 안남겼으면 남긴 데이터를 전문가 리뷰 테이블에 저장
                console.log(`INSERT INTO review_pro(review_num, cafe_id, user_id, body, sweet, acidity, btterness, balance, scope, comment) value(?,?,?,?,?,?,?,?,?,?)`, [count[0].total, cafe_id, user_id, body, sweet, acidity, btterness, balance, scope, comment]);
                db.query(`INSERT INTO review_pro(review_num, cafe_id, user_id, body, sweet, acidity, btterness, balance, scope, comment) value(?,?,?,?,?,?,?,?,?,?)`, [count[0].tatal, cafe_id, user_id, body, sweet, acidity, btterness, balance, scope, comment]);
                db.query(`SELECT visited FROM user WHERE id = "${user_id}"`, function(er, visit){
                  if(er){
                    console.log(er);
                  }
                  else{
                    console.log(visit[0].visited);
                    var visited = JSON.parse(visit[0].visited);
                    var i = 0;
                    while(i<visited.length){
                      if(visited[i].cafe_id===cafe_id){
                        visited[i].review = true;
                        var temp = JSON.stringify(visited);
                        db.query(`UPDATE user SET visited = '${temp}' WHERE id ="${request.user.id}"`)
                        return response.redirect('/mypage');
                      }
                      i++;
                    }
                  }
                });
              }
              else{
                response.redirect('/mypage');
              }
            });
          }
        });
      }
      else{
        db.query(`SELECT COUNT(*) as total FROM review_public`,function(err, count){ //일반인 리뷰 테이블 튜플 세기
          if(err){
            console.log(err);
          }
          else{
            db.query(`SELECT review_num FROM review_public WHERE cafe_id="${cafe_id}" AND user_id ="${user_id}"`, function(er, res){ // 사용자가 해당 카페의 리뷰를 남겼으면 다시 남기지 못한다.
              if(res[0]===undefined){ //사용자가 리뷰를 아직 안남겼으면 남긴 데이터를 일반인 리뷰 테이블에 저장
                console.log(`INSERT INTO review_public(review_num, cafe_id, user_id, body, sweet, acidity, btterness, balance, scope, comment) value(?,?,?,?,?,?,?,?,?,?)`, [count[0].total, cafe_id, user_id, body, sweet, acidity, btterness, balance, scope, comment]);
                db.query(`INSERT INTO review_public(review_num, cafe_id, user_id, body, sweet, acidity, btterness, balance, scope, comment) value(?,?,?,?,?,?,?,?,?,?)`, [count[0].total, cafe_id, user_id, body, sweet, acidity, btterness, balance, scope, comment]);
                db.query(`SELECT visited FROM user WHERE id = "${user_id}"`, function(er, visit){
                  if(er){
                    console.log(er);
                  }
                  else{
                    console.log(visit[0].visited);
                    var visited = JSON.parse(visit[0].visited);
                    var i = 0;
                    while(i<visited.length){
                      if(visited[i].cafe_id===cafe_id){
                        visited[i].review = true;
                        var temp = JSON.stringify(visited);
                        db.query(`UPDATE user SET visited = '${temp}' WHERE id ="${request.user.id}"`)
                        return response.redirect('/mypage');
                      }
                      i++;
                    }
                  }
                });
                
              }
              else{
                response.redirect('/mypage');
              }
            });
          }
        });  
      }
    }
  });
});


router.post('/write_review', function(request, response, next){
  fs.readFile(`./lib/writeReview.js`, 'utf-8', function(error){
    if(error){
        next(error);
    }
    else{
      var post = request.body;
      var cafe_id = post.cafe_id;
      var html = writeReview.HTML(cafe_id);
      response.send(html);
    }
  });
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
            else if(title === "locationSetting"){
                var html = locationSetting.HTML(sanitizeTitle);
                response.send(html);
            }
            else if(title === "proof"){
              var html = proofSetting.HTML(sanitizeTitle);
              response.send(html);
            }
            else if(title === "visitedList"){
              db.query(`SELECT visited FROM user WHERE id = "${request.user.id}"`, function(error, result){ //user테이블에 사용자 id가 일치하는 튜플의 visited 데이터를 result에 받아온다.
                if (error){
                  console.log(error);
                }
                else{
                  var visited_list = JSON.parse(result[0].visited); // visited 데이터를 string에서 JSON형태로 변환

                  var i = 0;
                  var j = 0;
                  while(i<visited_list.length){    //방문한 카페의 갯수만큼 반복한다.
                    db.query(`SELECT cafe_name, cafe_id FROM cafe WHERE cafe_id = "${visited_list[i].cafe_id}"`, function(err, res){ //index번째 방문기록의 cafe_id와 일치하는 튜풀들의 cafe_name을 res에 받아온다.
                      if(visited_list[j].review){ //review를 썻을 때, 모든 사용자들의 리뷰보기 가능
                        response.write(`
                        <div align="center">
                        <table>
                        <tr>
                        <td><h3>${res[0].cafe_name}</h3></td>
                        <form action="view_cafe" method="post">
                        <input type="hidden" name="cafe_id" value = "${res[0].cafe_id}">
                        <td><input class="inputB" type="submit" value="카페 정보"><td>
                        </form>
                        </tr>
                        </table>
                        </div>
                        `);
                        j++;
                      }
                      else{ //review를 안 썻을 때, 리뷰 쓰기 가능
                        response.write(`
                        <div align="center">
                        <table>
                        <tr>
                        <td><h3>${res[0].cafe_name}</h3></td>
                        <form action="view_cafe" method="post">
                        <input type="hidden" name="cafe_id" value = "${res[0].cafe_id}">
                        <td><input class="inputB" type="submit" value="카페 정보"><td>
                        </form>             
                        <form action="write_review" method="post">
                        <input type="hidden" name="cafe_id" value = "${res[0].cafe_id}">
                        <td><input class="inputB" type="submit" value="리뷰 쓰기"><td>
                        </form>
                        </tr>
                        </table>
                        </div>
                        `);
                        j++;
                      }
                    });
                    i++;
                  }
                  response.end();
                }
              });
              var html = visitedList.HTML(sanitizeTitle);
              console.log(html);
              response.write(html);
            }
        }
    });
});


module.exports = router;
