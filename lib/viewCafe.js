module.exports = {
    HTML:function(cafe_id, body){
      return `
      <!doctype html>
      <html>
      <head>
        <title>Coffing - viewCafe</title>
        <meta charset="utf-8">
      </head>
      <body>
      ${body}
        <form action="view_cafe" method="post">
        <input type="hidden" name="cafe_id", value="${cafe_id}">
        <input type="submit" value="카페 정보">
        </form>
        <form action="comment_public" method="post">
        <input type="hidden" name="cafe_id", value="${cafe_id}">
        <input type="submit" value="일반인 댓글 보기">
        </form>
        <form action="comment_pro" method="post">
        <input type="hidden" name="cafe_id", value="${cafe_id}">
        <input type="submit" value="전문가 댓글 보기">
        </form>
        <form action="/mypage" method="get">
        <input type="submit" value="마이페이지">
        </form>
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