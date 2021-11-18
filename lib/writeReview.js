module.exports = {
    HTML:function(cafe_id){
      return `
      <!doctype html>
      <html>
      <head>
        <title>Coffing - writeReview</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1>test write_review</h1>
        <form action="write_review_process" method = "post">
            <table>
            <tr>
              <td><p>바디 1</p></td>
              <td><input type="radio" name="body" value="1"></td>
              <td><input type="radio" name="body" value="2"></td>
              <td><input type="radio" name="body" value="3"></td>
              <td><input type="radio" name="body" value="4"></td>
              <td><input type="radio" name="body" value="5"></td>
              <td><p>5</p></td>
            </tr>
            <tr>
              <td><p>단맛 1</p></td>
              <td><input type="radio" name="sweet" value="1"></td>
              <td><input type="radio" name="sweet" value="2"></td>
              <td><input type="radio" name="sweet" value="3"></td>
              <td><input type="radio" name="sweet" value="4"></td>
              <td><input type="radio" name="sweet" value="5"></td>
              <td><p>5</p></td>
            </tr>
            <tr>
              <td><p>신맛 1</p></td>
              <td><input type="radio" name="acidity" value="1"></td>
              <td><input type="radio" name="acidity" value="2"></td>
              <td><input type="radio" name="acidity" value="3"></td>
              <td><input type="radio" name="acidity" value="4"></td>
              <td><input type="radio" name="acidity" value="5"></td>
              <td><p>5</p></td>
            </tr>
            <tr>
              <td><p>쓴맛 1</p></td>
              <td><input type="radio" name="bitterness" value="1"></td>
              <td><input type="radio" name="bitterness" value="2"></td>
              <td><input type="radio" name="bitterness" value="3"></td>
              <td><input type="radio" name="bitterness" value="4"></td>
              <td><input type="radio" name="bitterness" value="5"></td>
              <td><p>5</p></td>
            </tr>
            <tr>
              <td><p>밸런스 1</p></td>
              <td><input type="radio" name="balance" value="1"></td>
              <td><input type="radio" name="balance" value="2"></td>
              <td><input type="radio" name="balance" value="3"></td>
              <td><input type="radio" name="balance" value="4"></td>
              <td><input type="radio" name="balance" value="5"></td> 
              <td><p>5</p></td>
            </tr>
            <tr>
            <td><p>별점 1</p></td>
            <td><input type="radio" name="scope" value="1"></td>
            <td><input type="radio" name="scope" value="2"></td>
            <td><input type="radio" name="scope" value="3"></td>
            <td><input type="radio" name="scope" value="4"></td>
            <td><input type="radio" name="scope" value="5"></td> 
            <td><p>5</p></td>
            </tr>
            <tr>
            <td><input type="text" name="comment" value="" autocomplete = "off"></td>
            </tr>
            </table>
            <input type="hidden" name="cafe_id", value="${cafe_id}">
            <input type="submit" value="선택 완료">
        </form>
      </body>
      </html>
      `;
    }
  }