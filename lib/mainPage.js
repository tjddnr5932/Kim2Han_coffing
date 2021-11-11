module.exports = {
    HTML:function(title, authStatusUI = '<a href="/auth/login">로그인</a> | <a href = "/auth/register">회원가입</a>'){
      return `
      <!doctype html>
      <html>
      <head>
        <title>Coffing - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1>메인 페이지</h1>
        ${authStatusUI}
      </body>
      </html>
      `;
    }
  }
