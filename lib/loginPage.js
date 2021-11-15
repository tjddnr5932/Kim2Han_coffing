module.exports = {
    HTML:function(title){
      return `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width , initial-scale=1, minimum-scale=1">
        <link rel="stylesheet" href="../css/Login.css">
        <title>CoffingProject - ${title}</title>
      </head>
      <!-- test1 -->
      <body>
        <header></header>
        <main>
          <div class="font_1">Enjoy your Coffing!</div>
          <div class="font_2">당신의 커피를 찾아줄게요</div>
          <form method="post" id="loginForm" action="login_process">
            <table>
              <td>
                <label for="loginId"> I D&nbsp; </label>
                <input type="id" id="loginId" name="loginId" placeholder="ID">
                <div></div>
                <label for="loginPw">PW</label>
                <input type="password" id="loginPw" name="password" placeholder="Password">
              </td>
              <td>
                <input type="submit" id="login" value = "Login">

                <button id="signIn" type="button" onclick="location.href= '/auth/register' ">Sign Up</button>
              </td>
            </table>
          </form>
        </main>
        <footer>
          <div>산학 프로젝트 - Coffing!</div>
          <div>김두한조 - 김성욱 김봉주 한정래</div>
        </footer>
      </body>
      
      </html>
      `;
    }
  }