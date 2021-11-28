const mysql = require('mysql');

const confiInfor = require('./dev/cofiInfor');
const db = mysql.createConnection(
    confiInfor.DBinfor
);

db.connect();  
  
function calc(){
  console.log('----------카페리뷰테이블 업데이트 실행----------');
  db.query('SELECT * from review_pro', function (error, review, fields) { //review 데이터를 받아옴
    var i = 0;
    let cafe_id = [];
    let body = [];
    let sweet = [];
    let acidity = [];
    let bitterness = [];
    let balance = [];

    while(i<review.length){ //리뷰데이터에서 인덱스 별로 카페명과 맛을 배열로 정리
      cafe_id.push(review[i].cafe_id);
      body.push(review[i].body);
      sweet.push(review[i].sweet);
      acidity.push(review[i].acidity);
      bitterness.push(review[i].bitterness);
      balance.push(review[i].balance);
      console.log(i + 1 + " 번째 리뷰 \n카페id: " + cafe_id[i] + "\n맛: " + body[i]+'/'+sweet[i]+'/'+acidity[i]+'/'+bitterness[i]+'/'+balance[i]);
      i++;
    }

    const cafe_set = new Set(cafe_id);
    const cafe_list = Array.from(cafe_set);

    i=0;
    while(i<cafe_list.length){ //카페명이 같은 점수들을 더함
      var idx = cafe_id.indexOf(cafe_list[i]);
      var count = 0;
      var bo = 0;
      var sw = 0;
      var ac = 0;
      var bt = 0;
      var ba = 0;
      while (idx != -1) {
        count++;
        bo += body[idx];
        sw += sweet[idx];
        ac += acidity[idx];
        bt += bitterness[idx];
        ba += balance[idx];
        idx = cafe_id.indexOf(cafe_list[i], idx + 1);
      }

      if (count<50){ //실제 구현시 50개 이상의 리뷰데이터 일시 실행
        bo = bo/count;
        sw = sw/count;
        ac = ac/count;
        bt = bt/count;
        ba = ba/count;

        const taste = bo + '/' + sw + '/' + ac + '/' + bt + '/' + ba;

        
        db.query(`UPDATE cafe SET cafe_review_pro = "${taste}" WHERE cafe_id = "${cafe_list[i]}"`)
        console.log(`UPDATE cafe SET cafe_review_pro = "${taste}" WHERE cafe_id = "${cafe_list[i]}"`);
        console.log(cafe_list[i] + "의 평점: " + bo + '/' + sw + '/' + ac + '/' + bt + '/' + ba);
      }
      i++;
    }
  });
  
  db.query('SELECT * from review_public', function (error, review, fields) { //review 데이터를 받아옴
    console.log('SELECT * from review_public');
    var i = 0;
    let cafe_id = [];
    let body = [];
    let sweet = [];
    let acidity = [];
    let bitterness = [];
    let balance = [];

    while(i<review.length){ //리뷰데이터에서 인덱스 별로 카페명과 맛을 배열로 정리
      cafe_id.push(review[i].cafe_id);
      body.push(review[i].body);
      sweet.push(review[i].sweet);
      acidity.push(review[i].acidity);
      bitterness.push(review[i].bitterness);
      balance.push(review[i].balance);
      console.log(i + 1 + " 번째 리뷰 \n카페id: " + cafe_id[i] + "\n맛: " + body[i]+'/'+sweet[i]+'/'+acidity[i]+'/'+bitterness[i]+'/'+balance[i]);
      i++;
    }

    const cafe_set = new Set(cafe_id);
    const cafe_list = Array.from(cafe_set);

    i=0;
    while(i<cafe_list.length){ //카페명이 같은 점수들을 더함
      var idx = cafe_id.indexOf(cafe_list[i]);
      var result = [];
      var bo = 0;
      var sw = 0;
      var ac = 0;
      var bt = 0;
      var ba = 0;
      while (idx != -1) {
        result.push(idx);
        bo += body[idx];
        sw += sweet[idx];
        ac += acidity[idx];
        bt += bitterness[idx];
        ba += balance[idx];
        idx = cafe_id.indexOf(cafe_list[i], idx + 1);
      }
      var count = result.length;


      if (count<50){ //실제 구현시 50개 이상의 리뷰데이터 일시 실행
        bo = bo/count;
        sw = sw/count;
        ac = ac/count;
        bt = bt/count;
        ba = ba/count;
        
        const taste = bo + '/' + sw + '/' + ac + '/' + bt + '/' + ba;

        db.query(`UPDATE cafe SET cafe_review_public = "${taste}" WHERE cafe_id = "${cafe_list[i]}"`)
        console.log(`UPDATE cafe SET cafe_review_public = "${taste}" WHERE cafe_id = "${cafe_list[i]}"`);
        console.log(cafe_list[i] + "의 평점: " + bo + '/' + sw + '/' + ac + '/' + bt + '/' + ba);
      }
      i++;
    }
  });

  db.query('SELECT * from review_pro', function (error, review, fields) {
    db.query('SELECT * from review_public', function (err, re, fields){
      var i = 0;
      let cafe_id = [];
      let scope = [];

      while(i<review.length){
        cafe_id.push(review[i].cafe_id);
        scope.push(review[i].scope);
        i++;
      }

      i = 0;
      while(i<re.length){
        cafe_id.push(re[i].cafe_id);
        scope.push(re[i].scope);
        i++;
      }

      const cafe_set = new Set(cafe_id);
      const cafe_list = Array.from(cafe_set);

      i=0;
      while(i<cafe_list.length){
        var idx = cafe_id.indexOf(cafe_list[i]);
        var count = 0;
        var sc = 0;
        while (idx != -1) {
          count++;
          sc += scope[idx];
          idx = cafe_id.indexOf(cafe_list[i], idx + 1);
        }

        if (count<50){ //실제 구현시 50개 이상의 리뷰데이터 일시 실행
          sc = sc/count;
          
          db.query(`UPDATE cafe SET scope = "${sc}" WHERE cafe_id = "${cafe_list[i]}"`);
          console.log(`UPDATE cafe SET scope = "${sc}" WHERE cafe_id = "${cafe_list[i]}"`);
        }
        i++;
      }
    });
  });
}

calc();

const interval = setInterval(() => {
  calc(); //리뷰 데이터 연산
}, 600000); //10분에 한번씩 카페테이블의 전문가 일반인 리뷰 업데이트