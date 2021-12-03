module.exports = {
    HTML:function(title){
      return `
      <!doctype html>
      <html>
      <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="../css/setting.css">
      <title>CoffingProject - ${title}</title>
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
              <form name="mform" action="/" method="get">
              </form>
              <td><a href="#" onclick="jacascript:document.mform.submit();">
              <img class="l1"src="../image/makeacoffing.JPG" alt="../image/makeacoffing.JPG">
              </a></td>
              <td class="logout1"><a href="/mypage">MyPage</a></td>
              <td class="logout"><a href="/auth/logout_process">Logout</a></td>
          </table>
        </header>
        
        <main>
        <h1 align="center">방문한 카페 목록</h1>
      </body>
      </html>
      `; 
    }
  }