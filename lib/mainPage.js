module.exports = {
    HTML:function(authStatusUI = ['<a href="/auth/login">Login </a>', '<a href="/auth/register">Sign Up</a>']){
      return `
      <!DOCTYPE html>
      <html lang="en">

      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="../css/mainPage.css" />
          <title>Coffing</title>
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
                  <td class="logout1">${authStatusUI[0]}</td>
                  <td class="logout">${authStatusUI[1]}</td>
              </table>
          </header>
          <main>
            <form name="nform" action="/manual" method="get">
            </form>
              <a href="#" onclick="jacascript:document.nform.submit();"style="postion:fixed;padding-left:1500px;display:inline">
                  <img src="../image/howtouse.png" alt="../image/howtouse.png"width="400"height"300">
              </a>
              <div align="center"><a href="#" onclick="jacascript:document.dform.submit();" style="text-decoration: none; font-size: 120px; color: white;">Make a Coffing</a>
              </div>
          </main>
          <footer></footer>
      </body>

      </html>
      `;
    }
  }
