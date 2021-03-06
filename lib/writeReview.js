module.exports = {
    HTML:function(cafe_id, cafe_name){
      return `
      <!DOCTYPE html>
      <html lang="en">

      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="../css/writeReview.css">
          <title>Coffing - writeReview</title>
      </head>

      <body>
          <body>
              <form  action="write_review_process" method="post">
              <table align="center" style="border: 2px solid black; padding-right: 30px; margin-top:3%">
                  <tr>
                      <td colspan="5" align="center" style="padding:15px 0px; font-size: 25px; font-weight: bold;"> Cafe : ${cafe_name} Review</td>

                  </tr>
                      <tr>
                          <td class="title">Ranking</td>
                          <td colspan="5">
                              <div class="star-rating space-x-4 mx-auto">
                                  <input type="radio" id="5-stars" name="scope" value="5" v-model="ratings" />
                                  <label for="5-stars" class="star pr-4"> ★&nbsp&nbsp </label>
                                  <input type="radio" id="4-stars" name="scope" value="4" v-model="ratings" />
                                  <label for="4-stars" class="star"> ★&nbsp&nbsp </label>
                                  <input type="radio" id="3-stars" name="scope" value="3" v-model="ratings" />
                                  <label for="3-stars" class="star"> ★&nbsp&nbsp </label>
                                  <input type="radio" id="2-stars" name="scope" value="2" v-model="ratings" />
                                  <label for="2-stars" class="star"> ★&nbsp&nbsp </label>
                                  <input type="radio" id="1-star" name="scope" value="1" v-model="ratings" />
                                  <label for="1-star" class="star"> &nbsp&nbsp★&nbsp&nbsp </label>
                              </div>
                          </td>
                      </tr>
                      <tr><td colspan="6"><br></td></tr>
                      <tr>
                      <tr>
                          <td class="title">
                              Body
                          </td>
                          <td colspan="5">
                              <div class="star-rating space-x-4 mx-auto">
                                  <input type="radio" id="5-stars-body" name="body" value="5" v-model="ratings" />
                                  <label for="5-stars-body" class="star pr-4"> ★&nbsp&nbsp </label>
                                  <input type="radio" id="4-stars-body" name="body" value="4" v-model="ratings" />
                                  <label for="4-stars-body" class="star"> ★&nbsp&nbsp </label>
                                  <input type="radio" id="3-stars-body" name="body" value="3" v-model="ratings" />
                                  <label for="3-stars-body" class="star"> ★&nbsp&nbsp </label>
                                  <input type="radio" id="2-stars-body" name="body" value="2" v-model="ratings" />
                                  <label for="2-stars-body" class="star"> ★&nbsp&nbsp </label>
                                  <input type="radio" id="1-star-body" name="body" value="1" v-model="ratings" />
                                  <label for="1-star-body" class="star"> &nbsp&nbsp★&nbsp&nbsp </label>
                              </div>
                          </td>
                      </tr>
                      <tr>
                          <td class="title">
                              Sweet
                          </td>
                          <td colspan="5">
                              <div class="star-rating space-x-4 mx-auto">
                                  <input type="radio" id="5-stars-sweet" name="sweet" value="5" v-model="ratings" />
                                  <label for="5-stars-sweet" class="star pr-4"> ★&nbsp&nbsp </label>
                                  <input type="radio" id="4-stars-sweet" name="sweet" value="4" v-model="ratings" />
                                  <label for="4-stars-sweet" class="star"> ★&nbsp&nbsp </label>
                                  <input type="radio" id="3-stars-sweet" name="sweet" value="3" v-model="ratings" />
                                  <label for="3-stars-sweet" class="star"> ★&nbsp&nbsp </label>
                                  <input type="radio" id="2-stars-sweet" name="sweet" value="2" v-model="ratings" />
                                  <label for="2-stars-sweet" class="star"> ★&nbsp&nbsp </label>
                                  <input type="radio" id="1-star-sweet" name="sweet" value="1" v-model="ratings" />
                                  <label for="1-star-sweet" class="star"> &nbsp&nbsp★&nbsp&nbsp </label>
                              </div>
                          </td>
                      </tr>
                      <tr>
                          <td class="title">
                              Acidity
                          </td>
                          <td colspan="5">
                              <div class="star-rating space-x-4 mx-auto">
                                  <input type="radio" id="5-stars-acidity" name="acidity" value="5" v-model="ratings" />
                                  <label for="5-stars-acidity" class="star pr-4"> ★&nbsp&nbsp </label>
                                  <input type="radio" id="4-stars-acidity" name="acidity" value="4" v-model="ratings" />
                                  <label for="4-stars-acidity" class="star"> ★&nbsp&nbsp </label>
                                  <input type="radio" id="3-stars-acidity" name="acidity" value="3" v-model="ratings" />
                                  <label for="3-stars-acidity" class="star"> ★&nbsp&nbsp </label>
                                  <input type="radio" id="2-stars-acidity" name="acidity" value="2" v-model="ratings" />
                                  <label for="2-stars-acidity" class="star"> ★&nbsp&nbsp </label>
                                  <input type="radio" id="1-star-acidity" name="acidity" value="1" v-model="ratings" />
                                  <label for="1-star-acidity" class="star"> &nbsp&nbsp★&nbsp&nbsp </label>
                              </div>
                          </td>
                      </tr>
                      <tr>
                          <td class="title">
                             Bitterness
                          </td>
                          <td colspan="5">
                              <div class="star-rating space-x-4 mx-auto">
                                  <input type="radio" id="5-stars-bitterness" name="bitterness" value="5" v-model="ratings" />
                                  <label for="5-stars-bitterness" class="star pr-4"> ★&nbsp&nbsp </label>
                                  <input type="radio" id="4-stars-bitterness" name="bitterness" value="4" v-model="ratings" />
                                  <label for="4-stars-bitterness" class="star"> ★&nbsp&nbsp </label>
                                  <input type="radio" id="3-stars-bitterness" name="bitterness" value="3" v-model="ratings" />
                                  <label for="3-stars-bitterness" class="star"> ★&nbsp&nbsp </label>
                                  <input type="radio" id="2-stars-bitterness" name="bitterness" value="2" v-model="ratings" />
                                  <label for="2-stars-bitterness" class="star"> ★&nbsp&nbsp </label>
                                  <input type="radio" id="1-star-bitterness" name="bitterness" value="1" v-model="ratings" />
                                  <label for="1-star-bitterness" class="star"> &nbsp&nbsp★&nbsp&nbsp </label>
                              </div>
                          </td>
                      </tr>
                      <tr>
                          <td class="title">
                              Balance
                          </td>
                          <td colspan="5">
                              <div class="star-rating space-x-4 mx-auto">
                                  <input type="radio" id="5-stars-balance" name="balance" value="5" v-model="ratings" />
                                  <label for="5-stars-balance" class="star pr-4"> ★&nbsp&nbsp </label>
                                  <input type="radio" id="4-stars-balance" name="balance" value="4" v-model="ratings" />
                                  <label for="4-stars-balance" class="star"> ★&nbsp&nbsp </label>
                                  <input type="radio" id="3-stars-balance" name="balance" value="3" v-model="ratings" />
                                  <label for="3-stars-balance" class="star"> ★&nbsp&nbsp </label>
                                  <input type="radio" id="2-stars-balance" name="balance" value="2" v-model="ratings" />
                                  <label for="2-stars-balance" class="star"> ★&nbsp&nbsp </label>
                                  <input type="radio" id="1-star-balance" name="balance" value="1" v-model="ratings" />
                                  <label for="1-star-balance" class="star"> &nbsp&nbsp★&nbsp&nbsp </label>
                              </div>
                          </td>
                      </tr>

                      <tr>
                          <td  class="title">Review<br>comment</td>
                          <td colspan="5"><textarea name="comment" id="comment" cols="30" rows="10"></textarea></td>
                      </tr>

                      <tr>
                          <td colspan="6">
                              <input type="submit" class="inputB" value="리뷰 작성!"></td>
                  </tr>
                  </table>
                  <input type="hidden" name="cafe_id" , value="${cafe_id}">

              </form>
          </body>

      </html>
      `;
    }
  }
