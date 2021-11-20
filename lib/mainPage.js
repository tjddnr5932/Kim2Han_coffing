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
                  <td><a href="#" onclick="jacascript:document.lform.submit();"> &nbspSelect Location </a></td>
                  <form name="tform" action="/mypage/tasteSetting" method="POST">
                  </form>
                  <td><a href="#" onclick="jacascript:document.tform.submit();">Select Flavor</a></td>
                  <td><a href="">Recommende Me!</a></td>
                  <td><img class="l1"src="../image/makeacoffing.JPG" alt="./makeacoffing.JPG"></td>
                  <td class="logout1">${authStatusUI[0]}</td>
                  <td class="logout">${authStatusUI[1]}</td>
              </table>
          </header>
          <main>
              <div align="center"><a href="" style="text-decoration: none; font-size: 120px; color: white;">Make a Coffing</a>
              </div>
          </main>
          <footer></footer>
      </body>
      
      </html>
      `;
    }
  }