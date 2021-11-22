module.exports = {
    HTML:function(title, flist){
      return `
      <!doctype html>
      <html>
      <head>
        <title>Coffing - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1>recommend</h1>
        ${flist}
      </body>
      </html>
      `;
    },list:function(filelist, list){
      var flist = "";
      var i = 0;
      while(i < filelist.length){
        filelist[i] = filelist[i].replace(".js","");
        flist += `<form action="/recommendPage/${filelist[i]}" method = "post">`;
        flist += `<input type = "submit" value = ${list[i]}></input></form>`;
        i = i + 1;
      }
      return flist;
    }
  }
