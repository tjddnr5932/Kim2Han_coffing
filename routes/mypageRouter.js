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
const recommendList = require('../lib/recommendList.js');
const recommendMap = require('../lib/recommendMap.js');
const myReview = require('../lib/myReview.js');
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
                    let phone = result[0].phoneNum;
                    const birth = result[0].birth;
                    const location = result[0].location;
                    const pro = result[0].pro;
                    const taste = result[0].taste;
                    const latitude = result[0].latitude;
                    const longitude = result[0].longitude;
                    const beanStr = result[0].bean;
                    let bean;
                    let tasteArr;
                    let lat;
                    let lon;
                    let loc;

                    if(beanStr===null){
                      bean="아직 원두가 설정되지 않았습니다."
                    }
                    else{
                      bean = JSON.parse(beanStr).beankr;
                    }
                             
                    if(taste===null){
                      tasteArr=[0,0,0,0,0];
                    }
                    else{
                      tasteArr = taste.split("/");
                    }

                    if(latitude===null||longitude===null){
                      lat = 36.629282
                      lon = 127.456551
                    }
                    else{
                      lat = parseFloat(latitude);
                      lon = parseFloat(longitude);
                    }

                    if(location===null){
                      loc="아직 위치가 설정되지 않았습니다."
                    }
                    else{
                      const temp = location.split(",");
                      temp.pop();
                      temp.pop();
                      loc=temp.reverse().join(" ");
                    }
                    
                    let yyyymmdd = new Date(birth.getFullYear(), birth.getMonth(), birth.getDate(), 9).toISOString().substring(0,10);

                    phone = phone.slice(0,3) + '-' + phone.slice(3,7) + '-' + phone.slice(7);

                    if(list.length === filelist.length){
                      var flist = MyPage.list(filelist, list);
                      var html = MyPage.HTML(title, request.user.id, name, age, gender, phone, yyyymmdd, loc,
                        tasteArr[0], tasteArr[1], tasteArr[2], tasteArr[3], tasteArr[4], lat, lon, pro, bean, flist);
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
    var id = request.user.id;
    const taste = post.body+"/"+post.sweet+"/"+post.acidity+"/"+post.bitterness+"/"+post.balance;
    const bean_item = confiInfor.found_bean(taste, post.body, post.sweet, post.acidity, post.bitterness, post.balance);
    if(bean_item===undefined){
      response.send("<script>alert('선택하신 맛에 일치하는 원두가 없습니다.');location.href='/mypage';</script>");
    }
    else{
      const beanStr = JSON.stringify(bean_item);
      console.log(`UPDATE user SET bean='${beanStr}', taste="${taste}", body = ${post.body} , sweet = ${post.sweet}, acidity = ${post.acidity}, bitterness = ${post.bitterness}, balance = ${post.balance} WHERE id = "${id}"`);
      db.query(`UPDATE user SET bean='${beanStr}', taste="${taste}", body = ${post.body} , sweet = ${post.sweet}, acidity = ${post.acidity}, bitterness = ${post.bitterness}, balance = ${post.balance} WHERE id = "${id}"`);
      response.send(`<script>alert('${bean_item.beankr}(이/가) 선택되었습니다.');location.href='/mypage';</script>`);
      response.end();
    }
});


router.post('/mlocation_process', function(request, response){
    var post = request.body;
    var loc;
    var _lat = post.lat;
    var _lng = post.lng;
    var distance = post.distance;

    geocoder.reverse({lat:parseFloat(_lat), lon:parseFloat(_lng)})
    .then((res)=> {
        loc = res[0].formattedAddress;
        const temp = loc.split(",");
        const tmp = temp.reverse();
        const citytemp = tmp[3];
        const city = citytemp.replace(/ /g, '');
        db.query(`UPDATE user SET distance="${distance}", city="${city}", location = "${loc}", latitude = "${_lat}", longitude = "${_lng}" WHERE id = "${request.user.id}" `);
    })
    .catch((err)=> {
        console.log(err);
    });

    response.writeHead(302, {Location : '/mypage'});
    response.end();
});

router.post('/location_process', function(request, response){
    var post = request.body;
    var _loc = post.loc;
    var _lat;
    var _lng;
    var distance = post.distance;

    geocoder.geocode(_loc)
    .then((result)=> {
        _lat = result[0].latitude;
        _lng = result[0].longitude;
        geocoder.reverse({lat:_lat, lon:_lng})
        .then((res)=> {
            const loc = res[0].formattedAddress;
            const temp = loc.split(",");
            const tmp = temp.reverse();
            const citytemp = tmp[3];
            const city = citytemp.replace(/ /g, '');
            db.query(`UPDATE user SET distance="${distance}", city="${city}", location = "${loc}", latitude = "${_lat}", longitude = "${_lng}" WHERE id = "${request.user.id}" `);
        })
        .catch((err)=> {
            console.log(err);
        });
    })
    
    .catch((err)=> {
    console.log(err);
    });

    response.writeHead(302, {Location : '/mypage'});
    response.end();
});

router.post('/visit_cafe', function(request, response){  // 방문한 카페 등록하기
  var post = request.body;
  let today = new Date();
  let yyyymmdd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9).toISOString().substring(0,10);
  db.query(`SELECT visited FROM user WHERE id = "${request.user.id}"`, function(error, result){
    if(error){
      console.log(error);
    }
    else{
      if(result[0].visited===null){
        const temp =[{
          cafe_id: post.cafe_id,
          review: false,
          date: yyyymmdd
        }];
        const visited = JSON.stringify(temp);
        db.query(`UPDATE user SET visited = '${visited}' WHERE id = "${request.user.id}"`);
        response.redirect('/');
      }
      else{
        let temp = JSON.parse(result[0].visited);
        var i = 0;
        var check = true;
        while(i<temp.length){
          if(temp[i].cafe_id===post.cafe_id) {
            check=false;
          }
          i++;
        }
        if(check){
          temp.push({
            cafe_id: post.cafe_id,
            review: false,
            date: yyyymmdd
          });
          const visited = JSON.stringify(temp);
          db.query(`UPDATE user SET visited = '${visited}' WHERE id = "${request.user.id}"`);
        }
        response.redirect('/');
      }
    }
  });
});

router.get('/test', function(request, response){
  var cafe1 = [
      {
          cafe_id: "0",
          cafe_name: '성욱카페', 
          cafe_location: "충북대 후문",
          cafe_latitude: 33.450701,
          cafe_longitude: 126.570667,
          cafe_bean:"3/2/3/2/3",
          scope:3.5
      },
      {
          cafe_id: "1",
          cafe_name: '봉주카페', 
          cafe_location: "충북대 정문",
          cafe_latitude: 33.451701,
          cafe_longitude: 126.571667,
          cafe_bean:"4/4/4/4/4",
          scope:4
      },
      {
          cafe_id: "1",
          cafe_name: '정래카페', 
          cafe_location: "충북대 서문",
          cafe_latitude: 33.452701,
          cafe_longitude: 126.572667,
          cafe_bean:"원두 좋아",
          scope:5
      },
      {
          cafe_id: "0",
          cafe_name: '청주카페', 
          cafe_location: "청주 어딘가",
          cafe_latitude: 33.453701,
          cafe_longitude: 126.573667,
          cafe_bean:"좋은 원두",
          scope:4
      },
      {
        cafe_id: "0",
        cafe_name: '성욱카페', 
        cafe_location: "충북대 후문",
        cafe_latitude: 33.450701,
        cafe_longitude: 126.570667,
        cafe_bean:"3/2/3/2/3",
        scope:3.5
    },
    {
        cafe_id: "1",
        cafe_name: '봉주카페', 
        cafe_location: "충북대 정문",
        cafe_latitude: 33.451701,
        cafe_longitude: 126.571667,
        cafe_bean:"원두 좋아",
        scope:4
    },
    {
        cafe_id: "1",
        cafe_name: '정래카페', 
        cafe_location: "충북대 서문",
        cafe_latitude: 33.452701,
        cafe_longitude: 126.572667,
        cafe_bean:"원두 좋아",
        scope:5
    },
    {
        cafe_id: "0",
        cafe_name: '청주카페', 
        cafe_location: "청주 어딘가",
        cafe_latitude: 33.453701,
        cafe_longitude: 126.573667,
        cafe_bean:"좋은 원두",
        scope:4
    }
  ];
  var cafe2 = [
    {
        cafe_id: "0",
        cafe_name: '2성욱카페', 
        cafe_location: "충북대 후문",
        cafe_latitude: 33.450601,
        cafe_longitude: 126.570567,
        cafe_bean:"2등 원두",
        scope:null
    },
    {
        cafe_id: "1",
        cafe_name: '2봉주카페', 
        cafe_location: "충북대 정문",
        cafe_latitude: 33.451501,
        cafe_longitude: 126.571467,
        cafe_bean:"2등 원두",
        scope:4
    },
    {
        cafe_id: "1",
        cafe_name: '2정래카페', 
        cafe_location: "충북대 서문",
        cafe_latitude: 33.452401,
        cafe_longitude: 126.572367,
        cafe_bean:"2등 원두",
        scope:5
    },
    {
        cafe_id: "0",
        cafe_name: '2청주카페', 
        cafe_location: "청주 어딘가",
        cafe_latitude: 33.453301,
        cafe_longitude: 126.573267,
        cafe_bean:"2등 원두",
        scope:4
    },
    {
      cafe_id: "0",
      cafe_name: '2성욱카페', 
      cafe_location: "충북대 후문",
      cafe_latitude: 33.450601,
      cafe_longitude: 126.570567,
      cafe_bean:"2등 원두",
      scope:null
  },
  {
      cafe_id: "1",
      cafe_name: '2봉주카페', 
      cafe_location: "충북대 정문",
      cafe_latitude: 33.451501,
      cafe_longitude: 126.571467,
      cafe_bean:"2등 원두",
      scope:4
  },
  {
      cafe_id: "1",
      cafe_name: '2정래카페', 
      cafe_location: "충북대 서문",
      cafe_latitude: 33.452401,
      cafe_longitude: 126.572367,
      cafe_bean:"2등 원두",
      scope:5
  },
  {
      cafe_id: "0",
      cafe_name: '2청주카페', 
      cafe_location: "청주 어딘가",
      cafe_latitude: 33.453301,
      cafe_longitude: 126.573267,
      cafe_bean:"2등 원두",
      scope:4
  }
];
var cafe3=[
  {
    cafe_id: "0",
    cafe_name: '성욱카페', 
    cafe_location: "충북대 후문",
    cafe_latitude: 33.450701,
    cafe_longitude: 126.570667,
    cafe_bean:"원두 좋아",
    scope:null
},
{
    cafe_id: "1",
    cafe_name: '봉주카페', 
    cafe_location: "충북대 정문",
    cafe_latitude: 33.451701,
    cafe_longitude: 126.571667,
    cafe_bean:"원두 좋아",
    scope:4
},
{
    cafe_id: "1",
    cafe_name: '정래카페', 
    cafe_location: "충북대 서문",
    cafe_latitude: 33.452701,
    cafe_longitude: 126.572667,
    cafe_bean:"원두 좋아",
    scope:5
},
{
    cafe_id: "0",
    cafe_name: '청주카페', 
    cafe_location: "청주 어딘가",
    cafe_latitude: 33.453701,
    cafe_longitude: 126.573667,
    cafe_bean:"좋은 원두",
    scope:4
},
{
  cafe_id: "0",
  cafe_name: '성욱카페', 
  cafe_location: "충북대 후문",
  cafe_latitude: 33.450701,
  cafe_longitude: 126.570667,
  cafe_bean:"원두 좋아",
  scope:null
},
{
  cafe_id: "1",
  cafe_name: '봉주카페', 
  cafe_location: "충북대 정문",
  cafe_latitude: 33.451701,
  cafe_longitude: 126.571667,
  cafe_bean:"원두 좋아",
  scope:4
},
{
  cafe_id: "1",
  cafe_name: '정래카페', 
  cafe_location: "충북대 서문",
  cafe_latitude: 33.452701,
  cafe_longitude: 126.572667,
  cafe_bean:"원두 좋아",
  scope:5
},
{
  cafe_id: "0",
  cafe_name: '청주카페', 
  cafe_location: "청주 어딘가",
  cafe_latitude: 33.453701,
  cafe_longitude: 126.573667,
  cafe_bean:"좋은 원두",
  scope:4
}
]
  var html = recommendMap.HTML(cafe1, cafe2, cafe3, 33.463701, 126.574667); //사용자 lat, lon넣기
  response.send(html);
});

router.post('/list', function(request, response){
  const post = request.body;
  const cafe1 = JSON.parse(post.cafe1);
  const cafe2 = JSON.parse(post.cafe2);
  const cafe3 = JSON.parse(post.cafe3);
  db.query(`SELECT body, sweet, acidity, bitterness, balance, location FROM user WHERE id = "${request.user.id}"`, function(err, res){
    const temp = res[0].location.split(",");
    temp.pop();
    temp.pop();
    const loc=temp.reverse().join(" ");
    let html = recommendList.html(cafe1, cafe2, cafe3, res[0].body, res[0].sweet, res[0].acidity, res[0].bitterness, res[0].balance, loc);
    response.send(html);
  });
});

router.post('/comment_public/:cafe_id', function(request, response){ //일반인 댓글 보기
  const cafe_id = path.parse(request.params.cafe_id).base;
  db.query(`SELECT comment FROM review_public WHERE cafe_id = "${cafe_id}"`, function(error, result){

    var body = "<h1>일반인 댓글 보기</h1>";
    var i = 0;
    while(i<result.length){
      if(result[i].comment!=null&&result[i].comment!='')body+=`<p>${i}번째: ${result[i].comment}</p>`;
      i++;
    }
    response.send(body);
  });
});


router.post('/comment_pro/:cafe_id', function(request, response){ //전문가 댓글 보기
  const cafe_id = path.parse(request.params.cafe_id).base;
  db.query(`SELECT comment FROM review_pro WHERE cafe_id = "${cafe_id}"`, function(error, result){
    var body = "<h1>전문가 댓글 보기</h1>";
    var i = 0;
    console.log(result.length);
    while(i<result.length){
      if(result[i].comment!=null&&result[i].comment!='')body+=`<p>${i}번째: ${result[i].comment}</p>`;
      i++;
    }
    response.send(body);
  });
});


router.post('/view_cafe/:pageId', function(request,response){ //카페 정보 보기
  var filterId = path.parse(request.params.pageId).base;
  const post = request.body;
  const cafe_id = post.cafe_id;
  console.log(cafe_id);

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
          

          const distance = viewCafe.DIST(res[0].latitude, res[0].longitude, result[0].cafe_latitude, result[0].cafe_longitude);
          var body = `      
            <h1 style="margin-top: 80px;">${cafe_name}</h1>
            원두 <input class="inputA" id="my_ID" type="text" readonly value= "${cafe_bean}" style="margin-left: 24.5px;"><br>
            위치 <input class="inputA" id="my_Birth" type="text" readonly value="${cafe_location}" style="margin-left: 24.5px;"><br>
            거리 <input class="inputA" id="my_Location" type="text" readonly value="${distance}m" style="margin-left: 24.5px;"><br>
            <p>일반인 전문가 평가는 바디/당도/산미/쓴맛/밸런스 순입니다.</p>
            일반인 <input class="inputB" id="my_Name" type="text" readonly value="${cafe_review_public}" style="margin-left: 7px; margin-right: 20px;">
            전문가 <input class="inputB" id="my_Age" type="text" readonly value="${cafe_review_pro}" style="margin:0px 7px;"><br> `
          if(filterId==='recommend'){
            body+=`
            별점 <input class="inputB" id="my_Phone" type="text" readonly value="${scope}" style="margin-left: 24px; margin-right: 19.5px;">
            추천맵 <input class="inputB" id="my_Age" type="button" onClick="history.go(-1);" value="돌아가기" style="margin:0px 7px;"><br>
            `;
          }
          else{
            body+=`
            별점 <input class="inputB" id="my_Phone" type="text" readonly value="${scope}" style="margin-left: 24.5px;">
            방문기록 <input class="inputB" id="my_Age" type="button" onClick="history.go(-1);" value="돌아가기" style="margin:0px 7px;"><br>
            `;
          }
          //test용 사진
          let img = `<img src = '../../image/test2.jpg' style='width:auto; height:300px'/>
          <img src = '../../image/test2.jpg' style='width:auto; height:300px'/>`;
          if(photoStr==undefined);
          else{ 
            photo = JSON.parse(photoStr);
            var i = 0;
            while(i<photo.length){
              img += `<img src = ${photo[0].src.replace('public', '')} />` //src는 photo json배열이 가지는 img의 경로로 정적 image 폴더로 image는 생략한다.
              i++;
            }
          }
          var html = viewCafe.HTML(cafe_id, body, img);
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
      var bitterness = post.bitterness;
      var balance = post.balance;
      var scope = post.scope;
      var comment = post.comment;
      console.log(cafe_id);
    
      
      if(result[0].pro){
        db.query(`SELECT COUNT(*) as total FROM review_pro`,function(err, count){ //전문가 리뷰 테이블 튜플 세기
          if(err){
            console.log(err);
          }
          else{
            db.query(`SELECT review_num FROM review_pro WHERE cafe_id="${cafe_id}" AND user_id ="${user_id}"`, function(er, res){ // 사용자가 해당 카페의 리뷰를 남겼으면 다시 남기지 못한다.
              if(res[0]===undefined){ //사용자가 리뷰를 아직 안남겼으면 남긴 데이터를 전문가 리뷰 테이블에 저장
                db.query(`INSERT INTO review_pro(review_num, cafe_id, user_id, body, sweet, acidity, bitterness, balance, scope, comment) value(?,?,?,?,?,?,?,?,?,?)`, [count[0].tatal, cafe_id, user_id, body, sweet, acidity, bitterness, balance, scope, comment]);
                db.query(`SELECT visited FROM user WHERE id = "${user_id}"`, function(er, visit){
                  if(er){
                    console.log(er);
                  }
                  else{
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
                console.log(`INSERT INTO review_public(review_num, cafe_id, user_id, body, sweet, acidity, bitterness, balance, scope, comment) value(?,?,?,?,?,?,?,?,?,?)`, [count[0].total, cafe_id, user_id, body, sweet, acidity, bitterness, balance, scope, comment]);
                db.query(`INSERT INTO review_public(review_num, cafe_id, user_id, body, sweet, acidity, bitterness, balance, scope, comment) value(?,?,?,?,?,?,?,?,?,?)`, [count[0].total, cafe_id, user_id, body, sweet, acidity, bitterness, balance, scope, comment]);
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
      const post = request.body;
      const cafe_id = post.cafe_id;
      const cafe_name = post.cafe_name;
      var html = writeReview.HTML(cafe_id, cafe_name);
      response.send(html);
    }
  });
});

router.post('/my_review', function(request, response, next){
  const post = request.body;
  const cafe_id = post.cafe_id;
  const cafe_name = post.cafe_name;

  db.query(`SELECT cafe_location, cafe_latitude, cafe_longitude FROM cafe WHERE cafe_id = "${cafe_id}"`, function(error, result){
    if(error){
      console.log(error);
    }
    else{
      console.log(result[0].cafe_latitude, result[0].cafe_longitude);
      db.query(`SELECT latitude, longitude, pro FROM user WHERE id = "${request.user.id}"`, function(err, res){
        if(err){
          console.log(err);
        }
        else{
          let review;
          if(res[0].pro === true){review = 'review_pro';}
          else{review = 'review_public';}
          const distance = viewCafe.DIST(res[0].latitude, res[0].longitude, result[0].cafe_latitude, result[0].cafe_longitude);

          db.query(`SELECT * FROM ${review} WHERE cafe_id = "${cafe_id}" AND user_id = "${request.user.id}"`, function(er, row){
            if(er){
              console.log(er);
            }
            else{
              var comment = res[0].comment;
              if(comment===undefined){
                comment="코멘트를 작성하지 않으셨습니다."
              }
              console.log(comment);
              var html = myReview.HTML(cafe_name, result[0].cafe_location, row[0].user_id, row[0].scope, row[0].body, row[0].sweet, row[0].acidity, row[0].bitterness, row[0].balance, comment);
              response.send(html);
            }
          });
        }
      });
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
          if(request.user===undefined) {
            response.send("<script>alert('로그인 후 이용할 수 있습니다.');location.href='/';</script>");
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
              db.query(`SELECT id FROM proof_data WHERE id = "${request.user.id}"`, function(err, result){
                if(err){
                  console.log(err);
                }
                else{
                  if(result[0]===undefined){
                    var html = proofSetting.HTML("사진 업로드");
                    response.send(html);
                  }
                  else{
                    var html = proofSetting.HTML("사진 재업로드: 심사 중인 사진이 있습니다.");
                    console.log(html);
                    response.send(html);
                  }
                }
              });
            }
            else if(title === "visitedList"){
              db.query(`SELECT visited FROM user WHERE id = "${request.user.id}"`, function(error, result){ //user테이블에 사용자 id가 일치하는 튜플의 visited 데이터를 result에 받아온다.
                if (error){
                  console.log(error);
                }
                else{
                  if(result[0].visited===null){
                    response.write(`
                    <!doctype html>
                    <html>
                    <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="../css/tasteSetting.css">
                    <title>Coffing - ${title}</title>
                    </head>
                    <body>
                    <h1 align="center" style="margin-top:200px">방문한 카페 목록</h1>
                    <h3 align="center">방문 기록이 없습니다.</h3>
                    </body>
                    </html>
                    `);
                    response.end();
                  }
                  else{
                    var html = visitedList.HTML(sanitizeTitle);
                    response.write(html);
                    var visited_list = JSON.parse(result[0].visited); // visited 데이터를 string에서 JSON형태로 변환

                    var i = 0;
                    var j = 0;
                    while(i<visited_list.length){    //방문한 카페의 갯수만큼 반복한다.
                      db.query(`SELECT cafe_name, cafe_id FROM cafe WHERE cafe_id = "${visited_list[i].cafe_id}"`, function(err, res){ //index번째 방문기록의 cafe_id와 일치하는 튜풀들의 cafe_name을 res에 받아온다.
                        if(visited_list[j].review){ //review를 썻을 때, 모든 사용자들의 리뷰보기 가능
                          console.log(res[0].cafe_id);
                          response.write(`
                          <div align="center">
                          <table>
                          <tr>
                          <td><h3>${res[0].cafe_name}</h3></td>
                          <form action="view_cafe/normal" method="post">
                          <input type="hidden" name="cafe_id" value = "${res[0].cafe_id}">
                          <td><input class="inputB" type="submit" value="카페 정보"><td>
                          </form>
                          <form action="my_review" method="post">
                          <input type="hidden" name="cafe_id" value = "${res[0].cafe_id}">
                          <input type="hidden" name="cafe_name" value = "${res[0].cafe_name}">
                          <td><input class="inputB" type="submit" value="나의 리뷰"><td>
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
                          <form action="view_cafe/normal" method="post">
                          <input type="hidden" name="cafe_id" value = "${res[0].cafe_id}">
                          <td><input class="inputB" type="submit" value="카페 정보"><td>
                          </form>             
                          <form action="write_review" method="post">
                          <input type="hidden" name="cafe_id" value = "${res[0].cafe_id}">
                          <input type="hidden" name="cafe_name" value = "${res[0].cafe_name}">
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
                }
              });
            }
          }
        }
    });
});


module.exports = router;
