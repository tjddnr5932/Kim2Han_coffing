const cofiInfor = require("../../dev/cofiInfor");

module.exports = {
    HTML:function(title,user_lat,user_lon){
      return `
      <!doctype html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../../css/setting.css">
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
          <form action = "mlocation_process",  method="post">
          <h1 align="center" style="margin-top: 3%; margin-left: 12%">추천을 원하시는 위치를 선택해주세요!<select class="inputB" name="distance" style="margin-left: 12%";>
            <option value="2000">- 추천 거리 -</option>
            <option value="1000">1km</option>
            <option value="2000">2km</option>
            <option value="3000">3km</option>
            <option value="4000">4km</option>
            <option value="5000">5km</option>
            <option value="6000">6km</option>
            <option value="7000">7km</option>
            <option value="8000">8km</option>
            <option value="9000">9km</option>
            <option value="10000">10km</option>
          </select></h1>
          <div id="map" style="width:52%;height:450px; margin:0 auto;"></div>
          <div id="clickLatlng"></div>

          <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${cofiInfor.kakao_key}&libraries=services"></script>
          <script>
          var mapContainer = document.getElementById('map'), // 지도를 표시할 div
              mapOption = {
                  center: new kakao.maps.LatLng(36.629282, 127.456551), // 지도의 중심좌표
                  level: 4 // 지도의 확대 레벨
              };

          var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다


          // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
          if (navigator.geolocation) {
            if(${user_lat} != null && ${user_lon} != null){
              navigator.geolocation.getCurrentPosition(function(position) {

                var lat = ${user_lat};// 위도
                var lon = ${user_lon};// 경도

              var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                  message = '<div style="padding:5px;color:black;">설정 위치</div>'; // 인포윈도우에 표시될 내용입니다

                  // 마커와 인포윈도우를 표시합니다
              displayMarker(locPosition, message);
            });
          }

          // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            else{
              navigator.geolocation.getCurrentPosition(function(position) {

              var lat = position.coords.latitude, // 위도
                  lon = position.coords.longitude; // 경도

              var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                  message = '<div style="padding:5px;color:black;">현재 위치</div>'; // 인포윈도우에 표시될 내용입니다

                  // 마커와 인포윈도우를 표시합니다
              displayMarker(locPosition, message);

              });
            }

          } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

                var locPosition = new kakao.maps.LatLng(36.629282, 127.456551),
                    message = 'geolocation을 사용할수 없어요..'

                    displayMarker(locPosition, message);
            }
            var imageSize = new kakao.maps.Size(34, 36);  // 사용자 마커 사이즈

            // 지도에 마커와 인포윈도우를 표시하는 함수입니다
            function displayMarker(locPosition, message) {

              // 마커를 생성합니다
              var marker = new kakao.maps.Marker({
                map: map,
                position: locPosition,
                image: new kakao.maps.MarkerImage("../image/userMarker.png", imageSize)
              });

              var iwContent = message, // 인포윈도우에 표시할 내용
                  iwRemoveable = true;

              // 인포윈도우를 생성합니다
              var infowindow = new kakao.maps.InfoWindow({
                  content : iwContent,
                  removable : iwRemoveable
              });

              // 인포윈도우를 마커위에 표시합니다
              infowindow.open(map, marker);

              // 지도 중심좌표를 접속위치로 변경합니다
              map.setCenter(locPosition);
            }

            function makeOverListener(map, marker, infowindow) {
              return function() {
                infowindow.open(map, marker);
              };
            }

            // 인포윈도우를 닫는 클로저를 만드는 함수입니다
            function makeOutListener(infowindow) {
              return function() {
                infowindow.close();
              };
            }

          // 지도를 클릭한 위치에 표출할 마커입니다
          var marker = new kakao.maps.Marker({
            // 지도 중심좌표에 마커를 생성합니다
            position: map.getCenter()
          });
          // 지도에 마커를 표시합니다
          marker.setMap(map);


          // 지도에 클릭 이벤트를 등록합니다
          // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
          var geocoder = new kakao.maps.services.Geocoder();
          var _latlng;
          kakao.maps.event.addListener(map, 'click', function(mouseEvent) {

              // 클릭한 위도, 경도 정보를 가져옵니다
              _latlng = mouseEvent.latLng;

              // 마커 위치를 클릭한 위치로 옮깁니다
              marker.setPosition(_latlng);

              var infowindow = new kakao.maps.InfoWindow({
                content: '클릭 위치' // 인포윈도우에 표시할 내용
              });

              // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
              // 이벤트 리스너로는 클로저를 만들어 등록합니다
              // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
              kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
              kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
          });
          function latlng(){
            document.getElementById('hidden').innerHTML='<input type = "hidden" name = "lat", value="' + _latlng.getLat() +'"><input type = "hidden" name = "lng", value="' + _latlng.getLng() +'">';
            return 0;
          }

          </script>
            <table align="center">
              <tr>
                <td><input class="inputC" type = "submit" onclick="latlng()" value = "지도로 설정 완료" /></td>
                <div id = hidden></div>
              </tr>
            </table>
          </form>

          <form action = "location_process",  method="post">
            <table align="center">
              <tr>
                <td><input class="inputA" type = "text" name = "loc" placeholder="주소 입력" autocomplete="off"></input></td>
                <td><input class="inputC" type = "submit" value = "주소로 설정 완료" ></input></td>
              </tr>
            </table>
          </form>

        </main>
      </body>
      </html>
      `;
    }
}
