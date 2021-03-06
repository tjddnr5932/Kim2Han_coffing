module.exports = {
    HTML:function(title){
      return `
      <!DOCTYPE html>
      <html lang="en">

      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../css/tasteSetting.css">
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

          <table class="select" id="select">
            <td class="font" align="center" colspan="2" style="font-size: 35px; padding-top: 50px;">원하는 커피의 취향을 골라주세요</td>
            <tr>
              <td class="leftside">
                <table class="explainSite" align="center">
                  <tr>
                    <td>Body</td>
                  </tr>
                  <tr>
                    <td>커피를 마셨을 때 입안에서 느껴지는 밀도감과 무게감의 촉감을 바디감이라고 표현합니다.</td>
                  </tr>
                  <tr>
                    <td><br></td>
                  </tr>

                  <tr>
                    <td>Sweet</td>
                  </tr>
                  <tr>
                    <td>자당이나 과당이 녹아 있는 액체에서 느낄 수 있는 단맛이 나는 커피입니다.<br>과일, 초콜릿, 캐러멜처럼 단맛이 나는 맛입니다.</td>
                  </tr>
                  <tr>
                    <td><br></td>
                  </tr>

                  <tr>
                    <td>Acidity</td>
                  </tr>
                  <tr>
                    <td>신맛 또는 산미 이라고도 부르며, 신맛이라기 보다는 새콤한 맛으로도 표현 되기도 합니다.
                      <br>사과에서 느껴지는 상쾌한 신맛에 비교되기도 합니다.</td>
                  </tr>
                  <tr>
                    <td><br></td>
                  </tr>

                  <tr>
                    <td>Bitterness</td>
                  </tr>
                  <tr>
                    <td>카페인, 퀴닌, 특정 알칼로이드가 녹아 있는 물에서 나는 쓴 맛입니다.</td>
                  </tr>
                  <tr>
                    <td><br></td>
                  </tr>

                  <tr>
                    <td>Balance <br> 커피 맛들의 조화로움을 밸런스라고 합니다.
                      <br>맛의 균형 잡힌 커피를 표현할 때 '밸런스가 좋다' 라고 말합니다.</td>
                  </tr>

                  <tr>
                    <td><br> <a href="#emptyBox2" style=" text-decoration:none; color:lightcoral ">
                        선택이 어렵나요?
                        <br>예시 보기
                      </a></td>
                  </tr>


                </table>
              </td>
              <td class="rightside">
                <form action="taste_process" method="post">
                  <table class="table" align="center">
                    <thead>
                      <tr>
                        <td class="line">매우 약함</td>
                        <td class="line">약함</td>
                        <td class="line">보통</td>
                        <td class="line">강함</td>
                        <td class="line">매우 강함</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="font_ex">
                        <td colspan="5">Body - 바디감 </td>
                      </tr>

                      <tr>
                        <td class="choiceBox"><input class="choice" type="radio" name="body" value="1" required /></td>
                        <td class="choiceBox"><input class="choice" type="radio" name="body" value="2" /></td>
                        <td class="choiceBox"><input class="choice" type="radio" name="body" value="3" /></td>
                        <td class="choiceBox"><input class="choice" type="radio" name="body" value="4" /></td>
                        <td class="choiceBox"><input class="choice" type="radio" name="body" value="5" /></td>
                      </tr>
                      <tr class="font_ex">
                        <td colspan="5"><br></td>
                      </tr>

                      <tr class="font_ex">
                        <td colspan="5">Sweet - 단맛 </td>
                      </tr>

                      <tr>
                        <td class="choiceBox"><input class="choice" type="radio" name="sweet" value="1" required /></td>
                        <td class="choiceBox"><input class="choice" type="radio" name="sweet" value="2" /></td>
                        <td class="choiceBox"><input class="choice" type="radio" name="sweet" value="3" /></td>
                        <td class="choiceBox"><input class="choice" type="radio" name="sweet" value="4" /></td>
                        <td class="choiceBox"><input class="choice" type="radio" name="sweet" value="5" /></td>
                      </tr>
                      <tr class="font_ex">
                        <td colspan="5"><br></td>
                      </tr>

                      <tr class="font_ex">
                        <td colspan="5">Acidity - 산도 </td>
                      </tr>

                      <tr>
                        <td class="choiceBox"><input class="choice" type="radio" name="acidity" value="1" required /></td>
                        <td class="choiceBox"><input class="choice" type="radio" name="acidity" value="2" /></td>
                        <td class="choiceBox"><input class="choice" type="radio" name="acidity" value="3" /></td>
                        <td class="choiceBox"><input class="choice" type="radio" name="acidity" value="4" /></td>
                        <td class="choiceBox"><input class="choice" type="radio" name="acidity" value="5" /></td>
                      </tr>
                      <tr class="font_ex">
                        <td colspan="5"><br></td>
                      </tr>
                      <tr class="font_ex">
                        <td colspan="5">Bitterness - 쓴맛 </td>
                      </tr>

                      <tr>
                        <td class="choiceBox"><input class="choice" type="radio" name="bitterness" value="1" required /></td>
                        <td class="choiceBox"><input class="choice" type="radio" name="bitterness" value="2" /></td>
                        <td class="choiceBox"><input class="choice" type="radio" name="bitterness" value="3" /></td>
                        <td class="choiceBox"><input class="choice" type="radio" name="bitterness" value="4" /></td>
                        <td class="choiceBox"><input class="choice" type="radio" name="bitterness" value="5" /></td>
                      </tr>
                      <tr class="font_ex">
                        <td colspan="5"><br></td>
                      </tr>
                      <tr class="font_ex">
                        <td colspan="5">Balance - 밸런스 </td>
                      </tr>

                      <tr>
                        <td class="choiceBox"><input class="choice" type="radio" name="balance" value="1" required /></td>
                        <td class="choiceBox"><input class="choice" type="radio" name="balance" value="2" /></td>
                        <td class="choiceBox"><input class="choice" type="radio" name="balance" value="3" /></td>
                        <td class="choiceBox"><input class="choice" type="radio" name="balance" value="4" /></td>
                        <td class="choiceBox"><input class="choice" type="radio" name="balance" value="5" /></td>
                      </tr>
                      <tr class="font_ex">
                        <td colspan="5"><br></td>
                      </tr>

                      <tr>
                        <td colspan="5"><input type="submit" value="Choice!"
                            style="width: 700px; width: 250px; background-color: #ffcb00; border: none; font-size: 20px;">
                        </td>
                      </tr>
                      <tr>
                        <td><br></td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </td>
            </tr>
          </table>
        </main>
        <div id="emptyBox1"></div>
        <div id="emptyBox2"></div>

        <footer id="brand" style="margin-top: 50px;">
          <a href="#select" style="display: inline;float: top; text-decoration:none; font-size: 20px; color: lightcoral;">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;올라가기</a>
          <div class="brand">
            <table align="center">
              <thead></thead>
              <tbody>
                <tr>
                  <td class="b">
                    <div class="brandFlavor" style="background-image: url(../image/brand/chart_ediya.png);"></div>
                    <div class="brandLogo" style="background-image: url(../image/brand/Logo_ediya.jpg);"></div>
                    <div class="brandExplain">이디야의 커피는 산도가 적은 것이 특징입니다.</div>
                  </td>
                  <td class="b">
                    <div class="brandFlavor" style="background-image: url(../image/brand/chart_starbucks.png);"></div>
                    <div class="brandLogo" style="background-image: url(../image/brand/Logo_starbucks.jpg);
                    background-size: 90%; background-repeat: no-repeat; background-position: center;"></div>
                    <div class="brandExplain">스타벅스의 커피는 쓴맛이 단조롭게 유지되는 진한 커피가 특징입니다.</div>
                  </td>
                  <td class="b">
                    <div class="brandFlavor" style="background-image: url(../image/brand/chart_paulbassett.png);"></div>
                    <div class="brandLogo" style="background-image: url(../image/brand/Logo_paulbassett.jpg);
                    "></div>
                    <div class="brandExplain">폴 바셋의 커피는 더 강한 압력을 이용하며 산미가 강한게 특징이에요.</div>
                  </td>
                </tr>
                <tr>
                  <td class="b">
                    <div class="brandFlavor" style="background-image: url(../image/brand/chart_angelinus.png);"></div>
                    <div class="brandLogo" style="background-image: url(../image/brand/Logo_angelinus.png);
                     background-size: 80%; background-repeat: no-repeat; background-position: center;"></div>
                    <div class="brandExplain">엔젤리너스의 커피는 균형감이 좋은 맛을 통해 특별한 느낌을 준다고 합니다.</div>
                  </td>
                  <td class="b">
                    <div class="brandFlavor" style="background-image: url(../image/brand/chart_hollys.png);"></div>
                    <div class="brandLogo" style="background-image: url(../image/brand/Logo_hollys.jpg);
                    background-size: 80%; background-repeat: no-repeat; background-position: center;"></div>
                    <div class="brandExplain">할리스 커피는 균형 잡힌 맛과 부드러움으로 호평받습니다. </div>
                  </td>
                  <td class="b">
                    <div class="brandFlavor" style="background-image: url(../image/brand/chart_twosome.png);"></div>
                    <div class="brandLogo" style="background-image: url(../image/brand/Logo_twosome.jpg);"></div>
                    <div class="brandExplain">투썸플레이스의 커피는 산미가 적당하며 다크 초콜릿의 풍미를 띄고 있어요.</div>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
        </footer>
      </body>

      </html>
      `;
    }
  }
