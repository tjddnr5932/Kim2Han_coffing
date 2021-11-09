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
        <h1>회원가입 페이지</h1>
        <form action = "register_process" method="post">
          <p><input type="text" name="id" placeholder="id" autocomplete = "off" required></p>
          <p><input type="password" name="pw" placeholder="password" required></p>
          <p><input type="password" name="pw2" placeholder="password 확인" required></p>
          <p><input type="text" name="name" placeholder="이름" required></p>
          <p><input type="tel" name="phoneNum" placeholder="전화번호" required></p>
          <p><input type="radio" required id="남성" name="gender" value="남성">
          <label for="남성">남성</label>
          <input type="radio" id="여성" name="gender" value="여성">
          <label for="여성">여성</label></p>
          <p><input type="number" min="1", max="100" name="age" placeholder="나이" required></p>
          <p><input type="date" name="birth" placeholder="생년월일"></p>
          <p><input type="submit" value="회원 가입"></p>
        </form>
      </body>
      </html>
      `;
    }
  }