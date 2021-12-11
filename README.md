# Coffing : 커피의 맛을 통한 카페 추천 시스템
Coffing을 통해 사용자는 원두, 대중적, 전문적 평가를 바탕으로 자신이 원하는 커피의 맛을 가진 카페를 직접 방문하지 않고 고를 수 있게 하고자 한다. 

Coffing은 커피의 5가지 맛(바디/단맛/신맛/쓴맛/밸런스)으로 카페를 매칭합니다. 또한 커피의 맛으로 매칭된 카페를 거리순, 평점순으로 추천받을 수 있습니다.

- 카페 매칭
  - 원두 기반 
  - 대중성을 위한 일반인 평가 기반
  - 전문성을 위한 전문가 평가 기반

- 추천 
  - 매칭 순위 + 거리순
  - 매칭 순위 + 평점순
  - 거리 순

- 매칭 순위(1,2,3순위)
  - 1순위 : 사용자 추천범위 내 카페의 순위는 사용자가 정한 맛과 정확히 일치할 시
  - 2순위 : 설정된 맛 요소 중 하나만 +-1차이 시
  - 3순위 : 나머지/ 1순위, 2순위가 없을 경우 범위 내에 있는 카페 즉 3순위를 모두 표시



## 1. 설치 방법
1. Node.js 설치

>https://nodejs.org/ko/download/

2. 데이터베이스 schema 파일 import

> [dump.zip](https://github.com/tjddnr5932/Kim2Han_coffing/files/7696652/dump.zip)


3. dev 파일 작성

 ![image](https://user-images.githubusercontent.com/74997188/145668534-48f2b419-9058-4061-8ddf-7f5849c2338f.png)

(1) Mysql host ip

(2) Mysql user 아이디

(3) Mysql user 비번

(4) express session의 secret키

(5) kakao api 키

> https://apis.map.kakao.com/web/guide/

(6) 해쉬 방식과 암호화 방식

4. uploads 폴더 생성

> Kim2Han_coffing 폴더에 uploads 폴더 생성



## 2. 의존성
- node.js : v16.13.0
- OS : window10 사용 권장
- 웹브라우저 : 크롬 사용 권장

- 패키지
```
    "compression": "^1.7.4",
    "crypto": "^1.0.1",
    "express": "^4.17.1",
    "express-generator": "^4.16.1",
    "express-session": "^1.17.2",
    "fs": "^0.0.1-security",
    "multer": "^1.4.3",
    "mysql": "^2.18.1",
    "node-geocoder": "^3.27.0",
    "passport": "^0.5.0",
    "passport-local": "^1.0.0",
    "sanitize-html": "^2.5.3",
    "session-file-store": "^1.5.0"
```
## 3. 실행 방법
           1. git clone https://github.com/tjddnr5932/Kim2Han_coffing.git
           2. 작성한 dev폴더를 Kim2Han_coffing 폴더에 넣는다.
           3. 서버를 실행


## 4. 연락처(이메일)

김성욱 : tjddnr5932@naver.com

김봉주 : bong5472@naver.com

한정래 : yajay@chungbuk.ac.kr
