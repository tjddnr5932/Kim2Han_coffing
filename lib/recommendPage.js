module.exports = {
    HTML:function(authStatusUI = ['<a href="/auth/login">Login </a>', '<a href="/auth/register">Sign Up</a>']){
      return `
      <!doctype html>
      <html>
      <head>
        <title>Coffing - recommend</title>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../css/recommendPage.css" />
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
          <div class="bean">
            <form name="bean" action="/recommendPage/recommend1" method = "post">
            </form>
            <a href="#" onclick="javascript:document.bean.submit();" style="text-decoration: none; font-size: 140px; color: white;">Bean Recommend</a>
          </div>

          <div class="public">
            <form name="public" action="/recommendPage/recommend2" method = "post">
            </form>
            <a href="#" onclick="javascript:document.public.submit();" style="text-decoration: none; font-size: 140px; color: white;">public Recommend</a>
          </div>

          <div class="pro">
            <form name="pro" action="/recommendPage/recommend3" method = "post">
            </form>
            <a href="#" onclick="javascript:document.pro.submit();" style="text-decoration: none; font-size: 140px; color: white;">pro Recommend</a>
          </div>
        </main>
      </body>
      </html>
      `;
    },list:function(filelist, list){
      var flist = "";
      var i = 0;
      while(i < filelist.length){
        filelist[i] = filelist[i].replace(".js","");
        flist += `<form action="/recommendPage/${filelist[i]}" method = "post">`;
        flist += `<input type = "submit" value = ${list[i]}></input></form>`;
        i = i + 1;
      }
      return flist;
    }
  }
