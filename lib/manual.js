module.exports = {
    HTML:function(authStatusUI = ['<a href="/auth/login">Login </a>', '<a href="/auth/register">Sign Up</a>']){
      return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="../css/manual.css" />
          <title>설명서 페이지</title>
      </head>
      <body>
        <header>
            <table>
                <form name="lform" action="/mypage/locationSetting" method="POST">
                </form>
                <td><a href="#" onclick="javascript:document.lform.submit();"> &nbspSelect Location </a></td>
                <form name="tform" action="/mypage/tasteSetting" method="POST">
                  </form>
                  <td><a href="#" onclick="javascript:document.tform.submit();">Select Flavor</a></td>
                  <form name="dform" action="/recommendPage" method="POST">
                  </form>
                  <td><a href="#" onclick="jacascript:document.dform.submit();">Recommend Me!</a></td>
            </table>
        </header>
      </body>
      </html>
      `;
    }
  }
