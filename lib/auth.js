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
        var authStatusUI = '<a href="/auth/login">로그인</a> | <a href = "/auth/register">회원가입</a>'
        if(this.isOwner(request, response)){
            console.log(request.user.id + "가 로그인");
            authStatusUI = `${request.user.id} | <a href="/auth/logout_process">로그아웃</a>`;
        }
        return authStatusUI;
    }
}