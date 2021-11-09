const cofiInfor = require("../../dev/cofiInfor");

module.exports = {
    HTML:function(title){
      return `
      <!doctype html>
      <html>
      <head>
        <title>Coffing - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
      <div id="map" style="width:100%;height:350px;"></div>
      <p><em>지도를 클릭해주세요!</em></p> 
      <div id="clickLatlng"></div>
      
      <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${cofiInfor.kakao_key}&libraries=services"></script>
      <script>
      var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
          mapOption = { 
              center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
              level: 3 // 지도의 확대 레벨
          };
      
      var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
      
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
          
          var message = '클릭한 위치의 위도는 ' + _latlng.getLat() + ' 이고, ';
          message += '경도는 ' + _latlng.getLng() + ' 입니다';
          
          var resultDiv = document.getElementById('clickLatlng'); 
          resultDiv.innerHTML = message;
      });
      function latlng(){
        document.getElementById('hidden').innerHTML='<input type = "hidden" name = "loc", value="' + loc +'"><input type = "hidden" name = "lat", value="' + _latlng.getLat() +'"><input type = "hidden" name = "lng", value="' + _latlng.getLng() +'">';
        return 0;
      }

      </script>

      <form action = "mlocation_process",  method="post">
        <button type = "submit" onclick="latlng()">지도로 설정 완료</button>
        <div id = hidden></div>
      </form>

      <form action = "location_process",  method="post">
        <input type = "text" name = "loc" value = "주소 입력"></input></br>
        <input type = "submit" value = "주소로 설정 완료"></button>
      </form>


      </body>
      </html>
      `;
    }
}