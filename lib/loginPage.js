module.exports = {
    HTML:function(title, lognum){
      return `
      <!doctype html>
      <html>
      <head>
        <title>Coffing - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1>로그인 페이지</h1>
        <script type="text/javascript">if(${lognum}>1)alert(${lognum-1}+ "회째 틀리셨습니다.");</script>
        <form action = "login_process" method="post">
          <p><input type="text" name="id" placeholder="id" autocomplete = "off" required></p>
          <p><input type="password" name="pw" placeholder="password" required></p>
          <p><input type="submit" value="로그인"></p>
        </form>
      </body>
      </html>
      `;
    }
  }