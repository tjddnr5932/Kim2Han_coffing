module.exports = {
    isOwner:function(request, response){
        if(request.user){
            return true;
        }
        else{
            return false;
        }
    },
    StatusUI:function(request, response){
        var authStatusUI = ['<a href="/auth/login">Login </a>', '<a href="/auth/register">Sign Up</a>'];
        if(this.isOwner(request, response)){
            console.log(request.user.id + "가 로그인");
            authStatusUI = [`<a href="/mypage">MyPage</a>`, `<a href="/auth/logout_process">Logout</a>`];
        }
        return authStatusUI;
    }
}