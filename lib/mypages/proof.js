module.exports = {
    HTML:function(){
      return `
      <!doctype html>
      <html>
      <head>
      </head>
      <body>
        <form method="post" enctype="multipart/form-data", action="upload_process">
          <td><input type="file" name = "name"/></td>
          <td><input type="submit" value="보내기"/></td>
        </form>
      </body>
      </html>
      `;
    }
}
