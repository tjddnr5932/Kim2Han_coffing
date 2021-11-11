module.exports = {
    HTML:function(){
      return `
      <!doctype html>
      <html>
      <head>
        <h1>proof Setting</h1>
      </head>
      <body>
        <form method="post" enctype="multipart/form-data", action="upload_process">
          <input type="file" name = "name"/></br></br>
          <input type="submit" value="보내기"/>
        </form>
      </body>
      </html>
      `;
    }
}
