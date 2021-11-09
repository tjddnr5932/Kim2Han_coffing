const express = require('express');
const router = express.Router();
const loginPage = require('../lib/loginPage');
const registerPage = require('../lib/registerPage');
const crypto = require('crypto');
const Itis = require('../gitignore');

const mysql = require('mysql');

const db = mysql.createConnection(
    Itis.DBinfor
);


module.exports = function(passport){

    router.get('/login', function(request, response, next){
        request.session.lognum = request.session.lognum + 1;
        var title = "로그인 페이지";
        var html = loginPage.HTML(title, request.session.lognum);
        response.send(html);
    });
    
    router.get('/success', function(request, response, next){
        response.redirect('/');
    });
    
    router.post('/login_process',
        passport.authenticate('local', {
            successRedirect: '/auth/success',
            failureRedirect: '/auth/login'
    }));
    
    router.get('/register', function(request, response, next){
        var title = "회원가입 페이지";
        var html = registerPage.HTML(title);
        response.send(html);
    });

    router.post('/register_process', function(request, response){
            var post = request.body;
            var id = post.id;
            var pw = post.pw;
            var pw2 = post.pw2;
            var name = post.name;
            var phoneNum = post.phoneNum;
            var gender = post.gender;
            var age = post.age;
            var birth = post.birth;
            db.query('SELECT id from user', function (error, result, fields){
                if(error){
                    console.log(error);
                }
                else{
                    var i = 0;
                    while(i<result.length){
                        if(id===result[i].id){
                            return response.send("<script>alert('중복되는 아이디가 있습니다.');location.href='/auth/register';</script>");
                        }
                        i++;
                    }
                }
            });
            if(pw!==pw2){
                return response.send("<script>alert('비밀번호가 일치하지 않습니다.');location.href='/auth/register';</script>");
            }
            else{
                
                pw = crypto.createHash('sha512').update(pw).digest('base64');

                var values ='"' + id + '"' + ',' + '"' + pw + '"' + ',' + '"' + name + '"' + ',' + '"' + phoneNum + '"' + ',' + '"' + gender + '"' + ',' + age + ',' + '"' + birth + '"';
                db.query('INSERT INTO user(id, password, name, phoneNum, gender, age, birth) values(' + values + ')', function(error){
                    console.log('INSERT INTO user(id, password, name, phoneNum, gender, age, birth) values(' + values + ')');
                    if(error){
                        response.send(error);
                    }
                    else{
                        response.send("<script>alert('회원가입 완료');location.href='/';</script>");
                    }
                })
            }
    });
    

    router.get('/logout_process', function(request, response, next){
        console.log(request.user.id + "이/가 로그아웃")
        request.logout();
        request.session.save(function(){
            response.send("<script>alert('로그아웃 완료');location.href='/';</script>");
        })
    });
    return router;
}