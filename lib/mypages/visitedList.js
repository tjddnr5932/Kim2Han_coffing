module.exports = {
    HTML:function(title){
      return `
      <!doctype html>
      <html>
      <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="../css/tasteSetting.css">
      <title>CoffingProject - ${title}</title>
      </head>
      <body>
        <h1 align="center">test visited list</h1>
      </body>
      </html>
      `;
      
    }
  }