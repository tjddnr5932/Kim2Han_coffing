module.exports={
    html:function(cafe1, cafe2, cafe3, body, sweet, acidity, bitterness, balance, location){
        html=`
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="../css/recommendationList.css">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
            <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

            <title>Coffing - list</title>
        </head>

        <body>
            <header>
                <table>
                    <td><a href=""> &nbspMy Location : ${location}</a><</td>
                    <form name="mform" action="/" method="get">
                    </form>
                    <td><a href="#" onclick="jacascript:document.mform.submit();">
                    <img class="l1"src="../image/makeacoffing.JPG" alt="../image/makeacoffing.JPG">
                    </a></td>
                    <td class="logout1"><a href="/myPage">MyPage </a> </td>
                    <td class="logout"><a href="/auth/logout_process">Log out</a></td>
                </table>
            </header>
            <main>
                <input class="mapButton" type="button" value="Map View" onclick="history.go(-1);">
                <!-- 추천 리스트 박스 / 이 내부에 넣으면 오른쪽으로 쌓이면서 정렬됨--> 
                
                <div style="width:100%; overflow-x: auto; padding: 0px;  white-space : nowrap;">
                <Priority>
            `;
            var i = 0;
            while(i<cafe1.length){
                if(i%5===0){html+=`<br>`;}
                const tastearr = cafe1[i].cafe_bean.split("/");
                var scope=cafe1[i].scope*20;
                html+=`
                <div class="listdiv">
                      <div class="list_name"> <a href="" style="text-decoration:none"> ${cafe1[i].cafe_name}</a>
                          <div class="list_Rank">1순위</div>
                      </div>
                      <div class="list_address">주소 : <br>
                          ${cafe1[i].cafe_location} </div>
                      <div class="list_distance">거리 : ${cafe1[i].cafe_distance}m</div>
                      <div class="list_starRank">별점
                          <div class="star-ratings" style="float: right;">
                              <!-- width에 별점을 퍼센트로 넣어주세요 -->
                              <div class="star-ratings-fill space-x-2 text-lg" , style="width: ${scope}%;">
              
                                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                              </div>
                              <div class="star-ratings-base space-x-2 text-lg">
                                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                              </div>
                          </div>
                      </div>
                      <div class="list_radarchart"><canvas id="radar-chart${cafe1[i].cafe_id}" width="250" height="250"></div>
                      <div style="display: inline-block;  margin-top: 10px; margin-left: 10px;">
                        <form id="${cafe1[i].cafe_id}" name="cform" action="/mypage/view_cafe/recommend" method="POST">
                        <input type="hidden" name="cafe_id" value="${cafe1[i].cafe_id}">
                        </form>
                        <a href="#" onclick="javascript:$('#${cafe1[i].cafe_id}').submit();" style="font-size: 18px;">자세히 보기</a>
                      </div>
                      <form action="/mypage/visit_cafe" method="POST">
                        <input type="hidden" name="cafe_id" value="${cafe1[i].cafe_id}">
                        <input class="button2" type="submit" value="Visit & Finish">
                      </form>
                      </div>
                      <script>
                      new Chart(document.getElementById("radar-chart${cafe1[i].cafe_id}"), {
                          type: 'radar',
                          data: {
                              labels: ["Acidity", "Body", "Balance", "Bitterness", "Sweet"],
                              datasets: [{
                                  label: "Cafe Flavor",
                                  fill: true,
                                  backgroundColor: "rgba(179,181,198,0.2)",
                                  borderColor: "rgba(179,181,198,1)",
                                  pointBorderColor: "#fff",
                                  pointBackgroundColor: "rgba(179,181,198,1)",
                                  data: [${tastearr[2]}, ${tastearr[0]}, ${tastearr[4]}, ${tastearr[3]}, ${tastearr[1]}]
                              }, {
                                  label: "My Flavor",
                                  fill: true,
                                  backgroundColor: "rgba(255,99,132,0.2)",
                                  borderColor: "rgba(255,99,132,1)",
                                  pointBorderColor: "#fff",
                                  pointBackgroundColor: "rgba(255,99,132,1)",
                                  data: [${acidity}, ${body}, ${balance}, ${bitterness}, ${sweet}]
                              }]
                          },
                          options: {
                              responsive: true,
                              legend: {
                                  position: 'bottom',
                                  labels: {
                                      fontSize: 15,
                                  }
                              },
                              scale: {
                                  ticks: {
                                      beginAtZero: true
                                  },
                                  pointLabels: {
                                      fontSize: 20
                                  },
                              },
      
                          }
                      });
                  </script>
                `;
                i++;
            }
            html+=`<br>`;
            i = 0;
            while(i<cafe2.length){
                if(i%5===0){html+=`<br>`;}
                const tastearr = cafe2[i].cafe_bean.split("/");
                var scope=cafe2[i].scope*20;
                html+=`
                <div class="listdiv">
                      <div class="list_name"> <a href="" style="text-decoration:none"> ${cafe2[i].cafe_name}</a>
                          <div class="list_Rank">2순위</div>
                      </div>
                      <div class="list_address">주소 : <br>
                          ${cafe2[i].cafe_location} </div>
                      <div class="list_distance">거리 : ${cafe2[i].cafe_distance}m</div>
                      <div class="list_starRank">별점
                          <div class="star-ratings" style="float: right;">
                              <!-- width에 별점을 퍼센트로 넣어주세요 -->
                              <div class="star-ratings-fill space-x-2 text-lg" , style="width: ${scope}%;">
              
                                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                              </div>
                              <div class="star-ratings-base space-x-2 text-lg">
                                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                              </div>
                          </div>
                      </div>
                      <div class="list_radarchart"><canvas id="radar-chart${cafe2[i].cafe_id}" width="250" height="250"></div>
                      <div style="display: inline-block;  margin-top: 10px; margin-left: 10px;">
                        <form id="${cafe2[i].cafe_id}" name="cform" action="/mypage/view_cafe/recommend" method="POST">
                        <input type="hidden" name="cafe_id" value="${cafe2[i].cafe_id}">
                        </form>
                        <a href="#" onclick="javascript:$('#${cafe2[i].cafe_id}').submit();" style="font-size: 18px;">자세히 보기</a>
                      </div>
                      <form action="/mypage/visit_cafe" method="POST">
                        <input type="hidden" name="cafe_id" value="${cafe2[i].cafe_id}">
                        <input class="button2" type="submit" value="Visit & Finish">
                      </form>
                </div>
                <script>
                new Chart(document.getElementById("radar-chart${cafe2[i].cafe_id}"), {
                    type: 'radar',
                    data: {
                        labels: ["Acidity", "Body", "Balance", "Bitterness", "Sweet"],
                        datasets: [{
                            label: "Cafe Flavor",
                            fill: true,
                            backgroundColor: "rgba(179,181,198,0.2)",
                            borderColor: "rgba(179,181,198,1)",
                            pointBorderColor: "#fff",
                            pointBackgroundColor: "rgba(179,181,198,1)",
                            data: [${tastearr[2]}, ${tastearr[0]}, ${tastearr[4]}, ${tastearr[3]}, ${tastearr[1]}]
                        }, {
                            label: "My Flavor",
                            fill: true,
                            backgroundColor: "rgba(255,99,132,0.2)",
                            borderColor: "rgba(255,99,132,1)",
                            pointBorderColor: "#fff",
                            pointBackgroundColor: "rgba(255,99,132,1)",
                            data: [${acidity}, ${body}, ${balance}, ${bitterness}, ${sweet}]
                        }]
                    },
                    options: {
                        responsive: true,
                        legend: {
                            position: 'bottom',
                            labels: {
                                fontSize: 15,
                            }
                        },
                        scale: {
                            ticks: {
                                beginAtZero: true
                            },
                            pointLabels: {
                                fontSize: 20
                            },
                        },

                    }
                });
            </script>
                `;
                i++;
            }

            if(cafe1.length===0 && cafe2.length===0){
                i = 0;
                while(i<cafe3.length){
                    if(i%5===0){html+=`<br>`;}
                    const tastearr = cafe1[i].cafe_bean.split("/");
                    var scope=cafe3[i].scope*20;
                    html+=`
                    <div class="listdiv">
                          <div class="list_name"> <a href="" style="text-decoration:none"> ${cafe3[i].cafe_name}</a>
                              <div class="list_Rank">3순위</div>
                          </div>
                          <div class="list_address">주소 : <br>
                              ${cafe3[i].cafe_location} </div>
                          <div class="list_distance">거리 : ${cafe3[i].cafe_distance}m</div>
                          <div class="list_starRank">별점
                              <div class="star-ratings" style="float: right;">
                                  <!-- width에 별점을 퍼센트로 넣어주세요 -->
                                  <div class="star-ratings-fill space-x-2 text-lg" , style="width: ${scope}%;">
                  
                                      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                                  </div>
                                  <div class="star-ratings-base space-x-2 text-lg">
                                      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                                  </div>
                              </div>
                          </div>
                          <div class="list_radarchart"><canvas id="radar-chart${cafe3[i].cafe_id}" width="250" height="250"></div>
                          <div style="display: inline-block;  margin-top: 10px; margin-left: 10px;">
                            <form id="${cafe3[i].cafe_id}" name="cform" action="/mypage/view_cafe/recommend" method="POST">
                            <input type="hidden" name="cafe_id" value="${cafe3[i].cafe_id}">
                            </form>
                            <a href="#" onclick="javascript:$('#${cafe3[i].cafe_id}').submit();" style="font-size: 18px;">자세히 보기</a>
                          </div>
                          <form action="/mypage/visit_cafe" method="POST">
                            <input type="hidden" name="cafe_id" value="${cafe3[i].cafe_id}">
                            <input class="button2" type="sumbit" value="Visit & Finish">
                          </form>
                    </div>
                    <script>
                    new Chart(document.getElementById("radar-chart${cafe3[i].cafe_id}"), {
                        type: 'radar',
                        data: {
                            labels: ["Acidity", "Body", "Balance", "Bitterness", "Sweet"],
                            datasets: [{
                                label: "Cafe Flavor",
                                fill: true,
                                backgroundColor: "rgba(179,181,198,0.2)",
                                borderColor: "rgba(179,181,198,1)",
                                pointBorderColor: "#fff",
                                pointBackgroundColor: "rgba(179,181,198,1)",
                                data: [${tastearr[2]}, ${tastearr[0]}, ${tastearr[4]}, ${tastearr[3]}, ${tastearr[1]}]
                            }, {
                                label: "My Flavor",
                                fill: true,
                                backgroundColor: "rgba(255,99,132,0.2)",
                                borderColor: "rgba(255,99,132,1)",
                                pointBorderColor: "#fff",
                                pointBackgroundColor: "rgba(255,99,132,1)",
                                data: [${acidity}, ${body}, ${balance}, ${bitterness}, ${sweet}]
                            }]
                        },
                        options: {
                            responsive: true,
                            legend: {
                                position: 'bottom',
                                labels: {
                                    fontSize: 15,
                                }
                            },
                            scale: {
                                ticks: {
                                    beginAtZero: true
                                },
                                pointLabels: {
                                    fontSize: 20
                                },
                            },
    
                        }
                    });
                </script>
                    `;
                    i++;
                }
            }

            html+=`
            </Priority>
            </div>
            </main>
            <footer></footer>

            <!-- 래이더차트 부분 -->

        </body>

        </html>
        `;
        return html;
    }
}