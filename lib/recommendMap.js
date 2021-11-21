const viewCafe = require('../lib/viewCafe.js');

module.exports = {
    HTML:function(cafe1, cafe2, cafe3, lat, lng){
        var html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Coffing-추천 카페</title>
            <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            <style>
            * {
            margin: 0px;
            padding: 0px;
            }
            html,body{width:100%; height:100%;}
            .map_wrap{width:100%; height:100%;}
            .map{width:100%; height:100%;}
            .radius_border{border:1px solid #919191;border-radius:5px;}
            .custom_typecontrol {position:absolute;top:10px;right:10px;overflow:hidden;height:30px;margin:0;padding:0;z-index:1;font-size:12px;font-family:'Malgun Gothic', '맑은 고딕', sans-serif;}
            .custom_typecontrol .list_btn {display:block;width:65px;height:30px;float:left;text-align:center;line-height:30px;cursor:pointer;}
            .custom_typecontrol .list_btn {color:#fff;background:#425470;background:linear-gradient(#425470, #5b6d8a);}
            .outer {
                width: 200px;
                text-align:center;
                float:left;
            }
            .inner {
                display:inline-block;
                text-align:center;
                float:left;
            }
            .button_item{
                display:inline-block;
                vertical-align: top;
                float:left;
            }
            .inputA{
                background-color: gray;
                border: 1px solid gray;
                color: white;
                border-radius: 3px;
            }
            .inputB{
                background-color: black;
                border: 1px solid black;
                color: white;
                border-radius: 3px;
            }
            .wrap{position: absolute;left: 0;bottom: -36px;width: 168px;height: 132px;margin-left: -15px;text-align: left;overflow: hidden;font-size: 12px;font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;line-height: 1.5;}
            .wrap*{padding:0;margin0;}
            .info{
                width: 165px;
                height: 120px;
                background: #ffcb00;
                color: black;
                border-radius: 5px;
                float:left;
            }
            .title{
                font-weight: bold;
                background: black;
                color: white;
                border-radius: 5px;
                text-align: center;
            }
            .utitle{
                position: absolute;
                background: black;
                color: white;
                border-radius: 5px;
                margin-left: -50px;
            }
            .address{
                height: 30px;
                font-size: 11px;
                line-height:110%
            }
            .taste{
                font-weight: bold;
                height: 30px;
                line-height:110%
            }
            </style>
        </head>

        <body>
        <div class="map_wrap">
            <div id="map" class="map"></div>
            <div class="custom_typecontrol radius_border">
                <form action="/mypage/list" method="post">
                    <input type="hidden" name="cafe1" id="cafe1" value="">
                    <input type="hidden" name="cafe2" id="cafe2" value="">
                    <input type="hidden" name="cafe3" id="cafe3" value="">
                    <input type="submit" id="btnRoadmap" class="list_btn" value="리스트">
                </form>
            </div>
        </div>

        <script>
            var cafe1 = ${JSON.stringify(cafe1)};
            var cafe2 = ${JSON.stringify(cafe2)};
            var cafe3 = ${JSON.stringify(cafe3)};

            $("#cafe1").val(JSON.stringify(cafe1));
            $("#cafe2").val(JSON.stringify(cafe2));
            $("#cafe3").val(JSON.stringify(cafe3));
        </script>

        <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=70c0e0ef92badd5eadea6bb28b73b568"></script>
        <script>
        var mapContainer = document.getElementById('map');
        var mapOption = {
                center: new kakao.maps.LatLng(${lat}, ${lng}),
                level: 5
            };

        var map = new kakao.maps.Map(mapContainer, mapOption);

        var imageSize = new kakao.maps.Size(34, 36);  // 사용자 마커 사이즈

        var markerPosition  = new kakao.maps.LatLng(${lat}, ${lng});

        var marker = new kakao.maps.Marker({ // 사용자 마커 생성
             map: map,
             position: markerPosition,
             image :  new kakao.maps.MarkerImage("../image/userMarker.png", imageSize)
         });

        var overlay = new kakao.maps.CustomOverlay({
            content: '<div class="utitle" onclick="closeOverlay()">추천 받는 위치</div>',
            map: map,
            position: markerPosition
        });

        // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
        kakao.maps.event.addListener(marker, 'click', function() {
            overlay.setMap(map);
        });

        // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
        function closeOverlay() {
            overlay.setMap(null);
        }

        var positions1 = [];
        var positions2 = [];

       `
        var i = 0;
        while(i<cafe1.length){
            html+=`
            positions1.push({
               title:"${cafe1[i].cafe_name}",
               content:  '\
                <div class="wrap">\
                    <div class="info">\
                        <div class="title"> ${cafe1[i].cafe_name}</div>\
                        <div class="taste">(원두)${cafe1[i].cafe_bean}</br>`

                    if(cafe1[i].scope===null){ cafe1[i].scope="아직 별점이 없습니다." }

                    html+=  `(별점)${cafe1[i].scope}</div>\
                        <div style="font-weight: bold;">직선거리: ${cafe1[i].cafe_distance}m</div>\
                        <div class="address">(주소)${cafe1[i].cafe_location}</div>\
                        <div class = "outer">\
                            <div clasee = "inner">\
                                <div class="button_item">\
                                    <form  action="/mypage/view_cafe/recommend" method="post">\
                                        <input type="hidden" name="cafe_id" value="${cafe1[i].cafe_id}">\
                                        <input class="inputA" type="submit" value="카페정보">\
                                    </form>\
                                </div>\
                                <div class="button_item">\
                                    <form  action="/mypage/visit_cafe" method="post">\
                                        <input type="hidden" name="cafe_id" value="${cafe1[i].cafe_id}">\
                                        <input class="inputB" type="submit" value="방문&종료">\
                                    </form>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                ',

               latlng: new kakao.maps.LatLng(${cafe1[i].cafe_latitude}, ${cafe1[i].cafe_longitude})
            });
            `
            i++;
       }

       var i = 0;
       while(i<cafe2.length){
           html+=`
           positions2.push({
              title:"${cafe2[i].cafe_name}",
              content:  '\
               <div class="wrap">\
                   <div class="info">\
                       <div class="title"> ${cafe2[i].cafe_name}</div>\
                       <div class="taste">(원두)${cafe2[i].cafe_bean}</br>`

                   if(cafe2[i].scope===null){ cafe2[i].scope="아직 별점이 없습니다." }

                   html+=  `(별점)${cafe2[i].scope}</div>\
                       <div style="font-weight: bold;">직선거리: ${cafe2[i].cafe_distance}m</div>\
                       <div class="address">(주소)${cafe2[i].cafe_location}</div>\
                       <div class = "outer">\
                           <div clasee = "inner">\
                               <div class="button_item">\
                                   <form  action="/mypage/view_cafe/recommend" method="post">\
                                       <input type="hidden" name="cafe_id" value="${cafe2[i].cafe_id}">\
                                       <input class="inputA" type="submit" value="카페정보">\
                                   </form>\
                               </div>\
                               <div class="button_item">\
                                   <form  action="/mypage/visit_cafe" method="post">\
                                       <input type="hidden" name="cafe_id" value="${cafe2[i].cafe_id}">\
                                       <input class="inputB" type="submit" value="방문&종료">\
                                   </form>\
                               </div>\
                           </div>\
                       </div>\
                   </div>\
               </div>\
               ',

              latlng: new kakao.maps.LatLng(${cafe2[i].cafe_latitude}, ${cafe2[i].cafe_longitude})
           });
           `
           i++;
      }
      if(cafe1.length === 0 && cafe2.length === 0){
        var i = 0;
        while(i<cafe3.length){
            html+=`
            positions3.push({
               title:"${cafe3[i].cafe_name}",
               content:  '\
                <div class="wrap">\
                    <div class="info">\
                        <div class="title"> ${cafe3[i].cafe_name}</div>\
                        <div class="taste">(원두)${cafe3[i].cafe_bean}</br>`

                    if(cafe3[i].scope===null){ cafe3[i].scope="아직 별점이 없습니다." }

                    html+=  `(별점)${cafe3[i].scope}</div>\
                        <div style="font-weight: bold;">직선거리: ${cafe3[i].cafe_distance}m</div>\
                        <div class="address">(주소)${cafe3[i].cafe_location}</div>\
                        <div class = "outer">\
                            <div clasee = "inner">\
                                <div class="button_item">\
                                    <form  action="/mypage/view_cafe/recommend" method="post">\
                                        <input type="hidden" name="cafe_id" value="${cafe3[i].cafe_id}">\
                                        <input class="inputA" type="submit" value="카페정보">\
                                    </form>\
                                </div>\
                                <div class="button_item">\
                                    <form  action="/mypage/visit_cafe" method="post">\
                                        <input type="hidden" name="cafe_id" value="${cafe3[i].cafe_id}">\
                                        <input class="inputB" type="submit" value="방문&종료">\
                                    </form>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                ',

               latlng: new kakao.maps.LatLng(${cafe3[i].cafe_latitude}, ${cafe3[i].cafe_longitude})
            });
            `
            i++;
       }
     }
       html += `
        imageSize = new kakao.maps.Size(24, 35);
        var imageSrc = "../image/markerStar.png";

        for (var i = 0; i < positions1.length; i ++) {
            addMarker(positions1[i]);
        }

        function addMarker(positions1){
            var marker = new kakao.maps.Marker({ // 카페 마커 생성
                map: map,
                title: positions1.title,
                position: positions1.latlng,
                image : new kakao.maps.MarkerImage(imageSrc, imageSize),
            });

            var infowindow = new kakao.maps.InfoWindow({
                content : positions1.content,
                removable : true
            });

            kakao.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
            });
        }


        imageSrc = "../image/second_marker.png";

        for (var i = 0; i < positions2.length; i ++) {
            addMarker(positions2[i]);
        }

        function addMarker(positions2){
            var marker = new kakao.maps.Marker({ // 카페 마커 생성
                map: map,
                title: positions2.title,
                position: positions2.latlng,
                image : new kakao.maps.MarkerImage(imageSrc, imageSize),
            });

            var infowindow = new kakao.maps.InfoWindow({
                content : positions2.content,
                removable : true
            });

            kakao.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
            });
        }
        </script>
        </body>
        </html>
        `;
        return html;
    }
}
