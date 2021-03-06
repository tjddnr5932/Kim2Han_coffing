const cofiInfor = require("../dev/cofiInfor");

module.exports = {
    HTML:function(title, id, name, age, gender, phone, birth, location, body, sweet, acidity, bitterness, balance, lat, lon, pro){
      return `
      <!DOCTYPE html>
      <html lang="en">

      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="../css/myPage.css">
          <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css' />

          <title>Coffing - ${title}</title>
          <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
          <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${cofiInfor.kakao_key}&libraries=services"></script>
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
              <table align="center" style="width: 100%;">
                  <th></th>
                  <th></th>

                <tbody>
                    <td align="center" style="width: 33.3%; border-right: 0px;">
                        <div id="leftbox" align="left" style="margin-left: 30%;">
                              <h1>?????? ??????</h1> <br>
                              I D <input class="inputA" id="my_ID" type="text" readonly value= "${id}" style="margin-left: 24.5px;"><br>
                              Name <input class="inputA" id="my_Name" type="text" readonly value="${name}" style="margin-left: 3px;"><br>
                              Age <input class="inputB" id="my_Age" type="text" readonly value="${age}" style="margin:0px 19px;"> Gender
                              <input class="inputB" id="my_Gender" type="text" readonly value="${gender}" style="margin-left: 23px;"><br>
                              Phone <input class="inputA" id="my_Phone" type="text" readonly value="${phone}" style="margin-left: 0px;"><br>
                              Birth <input class="inputA" id="my_Birth" type="text" readonly value="${birth}" style="margin-left: 12px;"><br>
                              Loc <input class="inputA" id="my_Location" type="text" readonly value="${location}" style="margin-left: 19px;"><br>
                              <script>
                                function pro(){
                                    if(${pro}===null){
                                        var url =  '../mypage/proof';
                                        fetch(url, {method: 'POST'}).then(function(response){
                                            response.text().then(function(text){
                                                document.querySelector('pro').innerHTML = text;
                                            });
                                        });
                                    }
                                    else{
                                        document.querySelector('pro').innerHTML = '<h3>?????? ???????????? ?????? ??????????????????.</h3>';
                                    }
                                }
                              </script>

                              <input class="inputB" type="button" id="pro" name="pro" value="????????? ??????" onClick="pro();"
                              style="background-color: #ffcb00; border: #ffcb00; font-weight: bold;">
                              <pro>
                              </pro>
                        </div>

                    </td>
                    <td align="center" style="width: 33.3%; border-right: 0px;">

                          <h1>My Flavor</h1> <br>

                          <input class="inputB2" type="text" placeholder="Body" readonly>
                          <input class="inputB2" type="text" placeholder="Sweet" readonly>
                          <input class="inputB2" type="text" placeholder="Acidity" readonly>
                          <input class="inputB2" type="text" placeholder="Bitterness" readonly>
                          <input class="inputB2" type="text" placeholder="Balance" readonly><br>

                          <input class="inputB" id="myFlavor_Body" type="text" readonly value="${body}">
                          <input class="inputB" id="myFlavor_Sweet" type="text" readonly value="${sweet}">
                          <input class="inputB" id="myFlavor_Acidity" type="text" readonly value="${acidity}">
                          <input class="inputB" id="myFlavor_Bitterness" type="text" readonly value="${bitterness}">
                          <input class="inputB" id="myFlavor_Balance" type="text" readonly value="${balance}"><br>

                          <form action="mypage/tasteSetting" method="post">
                          <input class="inputB" type="submit" value="??? ??????" style="margin-left: 0px; background-color: #ffcb00; border: #ffcb00; font-weight: bold;">
                          </form>
                          <br>


                          <h1>My Location</h1>
                          <div id="map" style="width:100%;height:350px;"></div>
                          <form action="/mypage/locationSetting" method="post">

                          <input type="submit" class="inputB" value="?????? ??????" style=" background-color: #ffcb00; border: #ffcb00; font-weight: bold;"">
                          </form>
                          <script>
                            var mapContainer = document.getElementById('map'), // ????????? ????????? div
                                mapOption = {
                                    center: new kakao.maps.LatLng(${lat}, ${lon}), // ????????? ????????????
                                    level: 3 // ????????? ?????? ??????
                                };

                            var map = new kakao.maps.Map(mapContainer, mapOption); // ????????? ???????????????
                            // ????????? ????????? ????????? ????????? ???????????????
                            var marker = new kakao.maps.Marker({
                                // ?????? ??????????????? ????????? ???????????????
                                position: map.getCenter()
                            });
                            // ????????? ????????? ???????????????
                            marker.setMap(map);
                          </script>
                    </td>


                      <td align="center" style="width:33.3%;">
                        <h1>My Review</h1>
                        <form action="/mypage/visitedList" method="POST">
                        <input class="inputB" type="submit" id="idCheck" name="idCheck" value="????????????"
                          style="background-color: #ffcb00; border: #ffcb00; font-weight: bold;">
                        </form>
                      </td>
                </tbody>
              </table>

          </main>
          <footer></footer>
      </body>

      </html>
      `;
    },list:function(filelist, list){
      var flist = "";
      var i = 0;
      while(i < filelist.length){
        filelist[i] = filelist[i].replace(".js","");
        flist += `<form action="/mypage/${filelist[i]}" method = "post">`;
        flist += `<input type = "submit" value = ${list[i]}></input></form>`;
        i = i + 1;
      }
      return flist;
    }
  }
