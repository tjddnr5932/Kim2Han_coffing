module.exports = {
    HTML:function(title){
      return `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../css/tasteSetting.css">
        <title>CoffingProject - ${title}</title>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
      </head>

      <body>
          <h1 align="center" style="margin-top: 170px;">자신이 원하는 맛을 선택해주세요!</h1>
          <form action="taste_process" method = "post">
              <table align="center">
              <tr>
                <td><p>바디 1</p></td>
                <td><input class="inputB" type="radio" name="body" value="1"></td>
                <td><input class="inputB" type="radio" name="body" value="2"></td>
                <td><input class="inputB" type="radio" name="body" value="3"></td>
                <td><input class="inputB" type="radio" name="body" value="4"></td>
                <td><input class="inputB" type="radio" name="body" value="5"></td>
                <td><p>5</p></td>
              </tr>
              <tr>
                <td><p>단맛 1</p></td>
                <td><input class="inputB" type="radio" name="sweet" value="1"></td>
                <td><input class="inputB" type="radio" name="sweet" value="2"></td>
                <td><input class="inputB" type="radio" name="sweet" value="3"></td>
                <td><input class="inputB" type="radio" name="sweet" value="4"></td>
                <td><input class="inputB" type="radio" name="sweet" value="5"></td>
                <td><p>5</p></td>
              </tr>
              <tr>
                <td><p>신맛 1</p></td>
                <td><input class="inputB" type="radio" name="acidity" value="1"></td>
                <td><input class="inputB" type="radio" name="acidity" value="2"></td>
                <td><input class="inputB" type="radio" name="acidity" value="3"></td>
                <td><input class="inputB" type="radio" name="acidity" value="4"></td>
                <td><input class="inputB" type="radio" name="acidity" value="5"></td>
                <td><p>5</p></td>
              </tr>
              <tr>
                <td><p>쓴맛 1</p></td>
                <td><input class="inputB" type="radio" name="bitterness" value="1"></td>
                <td><input class="inputB" type="radio" name="bitterness" value="2"></td>
                <td><input class="inputB" type="radio" name="bitterness" value="3"></td>
                <td><input class="inputB" type="radio" name="bitterness" value="4"></td>
                <td><input class="inputB" type="radio" name="bitterness" value="5"></td>
                <td><p>5</p></td>
              </tr>
              <tr>
                <td><p>밸런스 1</p></td>
                <td><input class="inputB" type="radio" name="balance" value="1"></td>
                <td><input class="inputB" type="radio" name="balance" value="2"></td>
                <td><input class="inputB" type="radio" name="balance" value="3"></td>
                <td><input class="inputB" type="radio" name="balance" value="4"></td>
                <td><input class="inputB" type="radio" name="balance" value="5"></td> 
                <td><p>5</p></td>
              </tr>
              <tr>
              <td><input class="inputB" type="submit" value="선택 완료"
              style="background-color: #ffcb00; border: #ffcb00; font-weight: bold;"></td>
              </tr>
              </table>
          </form>
      </body>
      </html>
      `;
    }
  }