const mysql = require('mysql');

const confiInfor = require('./dev/cofiInfor');
const db = mysql.createConnection(
    confiInfor.DBinfor
);

db.connect();  
  
function calc(reviews){
  if(reviews==="review_pro")console.log('----------카페리뷰테이블 업데이트 실행----------');
  db.query('SELECT * from '+ reviews, function (error, review, fields) { //review 데이터를 받아옴
    console.log('SELECT * from '+ reviews);
    var i = 0;
    let cafe_id = [];
    let cafe_name = [];
    let body = [];
    let sweet = [];
    let acidity = [];
    let btterness = [];
    let balance = [];
    let scope = [];

    while(i<review.length){ //리뷰데이터에서 인덱스 별로 카페명과 맛을 배열로 정리
      cafe_id.push(review[i].cafe_id);
      cafe_name.push(review[i].cafe_name);
      body.push(review[i].body);
      sweet.push(review[i].sweet);
      acidity.push(review[i].acidity);
      btterness.push(review[i].btterness);
      balance.push(review[i].balance);
      scope.push(review[i].scope);
      console.log(i + 1 + " 번째 리뷰 \n카페명: " + cafe_name[i] + "\n맛: " + body[i]+'/'+sweet[i]+'/'+acidity[i]+'/'+btterness[i]+'/'+balance[i]  + "\n별점: " + scope[i]);
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
      var sc = 0;
      while (idx != -1) {
        result.push(idx);
        bo += body[idx];
        sw += sweet[idx];
        ac += acidity[idx];
        bt += btterness[idx];
        ba += balance[idx];
        sc += scope[idx];
        idx = cafe_id.indexOf(cafe_list[i], idx + 1);
      }
      var count = result.length;

      if (count<50){ //실제 구현시 50개 이상의 리뷰데이터 일시 실행
        bo = bo/count;
        sw = sw/count;
        ac = ac/count;
        bt = bt/count;
        ba = ba/count;
        sc = sc/count;
        
        const taste = bo + '/' + sw + '/' + ac + '/' + bt + '/' + ba;

        db.query(`UPDATE cafe SET cafe_${reviews} = "${taste}", scope = ${sc} WHERE cafe_id = "${cafe_list[i]}"`);
        console.log(`UPDATE cafe SET cafe_${reviews} = "${taste}", scope = ${sc} WHERE cafe_id = "${cafe_list[i]}"`);

        console.log(cafe_list[i] + "의 평점: " + bo + '/' + sw + '/' + ac + '/' + bt + '/' + ba + "     별점: " + sc);
      }

      i++;
    }
    if(reviews==='review_public'){
      console.log('----------카페리뷰테이블 업데이트 완료----------\n\n');
    }
  });
}

calc('review_pro'); //전문가 리뷰 데이터 계산

calc('review_public'); //일반인 리뷰 데이터 계산

const interval = setInterval(() => {
  calc('review_pro'); //전문가 리뷰 데이터 계산
  calc('review_public'); //일반인 리뷰 데이터 계산
}, 600000); //10분에 한번씩 카페테이블의 전문가 일반인 리뷰 업데이트