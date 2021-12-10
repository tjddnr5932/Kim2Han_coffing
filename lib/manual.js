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
                  <form name="mform" action="/" method="get">
                  </form>
                  <td><a href="#" onclick="jacascript:document.mform.submit();">
                          <img class="l1" src="../image/makeacoffing.JPG" alt="../image/makeacoffing.JPG">
                      </a></td>
                  <td class="logout1">${authStatusUI[0]}</td>
                  <td class="logout">${authStatusUI[1]}</td>
            </table>
        </header>
        <main>
          <div class="section">
            <input type="radio" name="slide" id="slide01" checked>
            <input type="radio" name="slide" id="slide02">
            <input type="radio" name="slide" id="slide03">
            <input type="radio" name="slide" id="slide04">
            <input type="radio" name="slide" id="slide05">
            <input type="radio" name="slide" id="slide06">
            <div class="slidewrap">
              <ul class="slidelist">
                <li class="slideitem">
                  <div class="textbox" >
                    <div class="content imgLeft">
                        <div class="slideImage"><img src="../image/manual/main.png" alt="../image/manual/main.png"></div>
                    </div>
                  </div>
                </li>
                <li class="slideitem">
                  <div class="textbox">
                      <div class="content imgRight">
                          <div class="slideImage"><img src="../image/manual/mypage.png" alt="../image/manual/mypage.png"></div>
                      </div>
                  </div>
              </li>
              <li class="slideitem">
                  <div class="textbox">
                      <div class="content imgLeft">
                          <div class="slideImage"><img src="../image/manual/recommend.png" alt="../image/manual/recommend.png"></div>
                      </div>
                  </div>
              </li class="slideitem">
              <li class="slideitem">
                  <div class="textbox">
                      <div class="content imgRight">
                          <div class="slideImage"><img src="../image/manual/recommendmap.png" alt="../image/manual/recommendmap.png"></div>
                      </div>
                  </div>
              </li class="slideitem">
              <li class="slideitem">
                  <div class="textbox">
                      <div class="content imgLeft">
                          <div class="slideImage"><img src="../image/manual/recommendlist.png" alt="../image/manual/recommendlist.png"></div>
                      </div>
                  </div>
              </li class="slideitem">
              <li class="slideitem">
                  <div class="textbox">
                      <div class="content imgRight">
                            <div class="slideImage"style="background-color:black;">
                            <a href="/">
                            <img src="../image/manual/slide6.png" alt="../image/manual/slide6.png"></div>
                            </a>
                      </div>
                  </div>
              </li class="slideitem">
              </ul>
              <ul class="slide-pagelist">
              <li><label for="slide01"></label></li>
              <li><label for="slide02"></label></li>
              <li><label for="slide03"></label></li>
              <li><label for="slide04"></label></li>
              <li><label for="slide05"></label></li>
              <li><label for="slide06"></label></li>
          </ul>
          </div>
          </div>
        </main>
        <footer></footer>
      </body>
      </html>
      `;
    }
  }
