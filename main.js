const express = require('express');
var session = require('express-session')
const compression = require('compression');
const FileStore = require('session-file-store')(session);
const confiInfor = require('./dev/cofiInfor');

const app = express();

app.use(express.urlencoded({extended : false}));
app.use(compression());
app.use(session({
    secret: confiInfor.secret,
    resave: false,
    saveUninitialized: true,
    store:new FileStore()
}));

const passport = require('./lib/passport')(app);
const mypageRouter = require('./routes/mypageRouter');
const auth = require('./routes/auth')(passport);
const index = require('./routes/index');


app.use('/', index); //메인페이지

app.use('/auth', auth); //로그인 및 회원가입

app.use('/mypage', mypageRouter); //마이페이지

app.use(function(request, response, next){
    response.status(404).send("페이지를 찾지 못했습니다.");
});

app.use(function(error, request, response, next){
    console.error(error.stack);
    response.status(500).send("에러가 발생했습니다.");
});

app.listen(3000)