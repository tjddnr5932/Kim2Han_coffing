module.exports = {
    HTML:function(re){
      return `
      <!doctype html>
      <html>
      <head>
      </head>
      <body>
        <h3>${re}</h3>
        <form method="post" enctype="multipart/form-data", action="mypage/upload_process">
          <td><input type="file" name = "name"/></td>
          <td><input type="submit" value="보내기"/></td>
        </form>
      </body>
      </html>
      `;
    }
}
