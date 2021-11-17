module.exports = {
    HTML:function(cafe_id, body){
      return `
      <!doctype html>
      <html>
      <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="../../css/tasteSetting.css">
      <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css' />
      <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  
      <title>Coffing - 카페 정보</title>
      </head>
      <body>
      <script type="text/javascript">
      function review_pro(){    
        var url =  '../mypage/comment_pro/' + ${cafe_id};
        fetch(url, {method: 'POST'}).then(function(response){
          response.text().then(function(text){
            document.querySelector('review').innerHTML = text;
          });  
        });
      }
      function review_public(){    
        var url =  '../mypage/comment_public/' + ${cafe_id};
        fetch(url, {method: 'POST'}).then(function(response){
          response.text().then(function(text){
            document.querySelector('review').innerHTML = text;
          });  
        });
      }
      </script>
      ${body}
      <table style="margin-left: auto; margin-right: auto;">
        <tr>
          <td><input class="inputB" type="button" value="일반인 댓글" onClick="review_public()"
          style="background-color: #ffcb00; border: 1px solid #ffcb00;"></td>

          <td><input class="inputB" type="button" value="전문가 댓글" onClick="review_pro()"
          style="background-color: #ffcb00; border: 1px solid #ffcb00;"></td>

          <form action="/mypage" method="get">
          <td><input class="inputB" type="submit" value="마이페이지"></td>
          </form>
        </tr>
      </table>
      <review>
      </review>
      </body>
      </html>
      `;
    }, DIST:function(lat1, lon1, lat2, lon2){
        if ((lat1 == lat2) && (lon1 == lon2)){
            distance = 0;
          }
        var radLat1 = Math.PI * lat1 / 180;
        var radLat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radTheta = Math.PI * theta / 180;
        var dist = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
        if (dist > 1) dist = 1;
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515 * 1.609344 * 1000;
        if (dist < 100) dist = Math.round(dist / 10) * 10;
        else dist = Math.round(dist / 100) * 100;
        
        return dist;
    }
}