module.exports={
    HTML:function(cafe1, cafe2, cafe3, body, sweet, acidity, bitterness, balance, location, title, s_cafe1, s_cafe2, s_cafe3){
        html=`
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="../../css/recommendationList.css">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
            <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

            <title>Coffing - listG</title>
        </head>

        <body>
            <header>
                <table>
                    <td><a href=""> &nbspMy Location : ${location}</a></td>
                    <form name="mform" action="/" method="get">
                    </form>
                    <td><a href="#" onclick="jacascript:document.mform.submit();">
                    <img class="l1"src="../../image/makeacoffing.JPG" alt="../image/makeacoffing.JPG">
                    </a></td>
                    <td class="logout1"><a href="/myPage">MyPage </a> </td>
                    <td class="logout"><a href="/auth/logout_process">Log out</a></td>
                </table>
            </header>
            <main>
                <form action="/recommendPage/${title}" method="POST">
                    <input type="hidden" name="cafe1" id="cafe1" value="">
                    <input type="hidden" name="cafe2" id="cafe2" value="">
                    <input type="hidden" name="cafe3" id="cafe3" value="">
                    <input class="mapButton" type="submit" value="Map View">
                </form>
                <form action="/recommendPage/list/distance" method="POST">
                    <input type="hidden" name="cafe1" id="cafe11" value="">
                    <input type="hidden" name="cafe2" id="cafe22" value="">
                    <input type="hidden" name="cafe3" id="cafe33" value="">
                    <input type="hidden" name="title" value="${title}">
                    <input class="mapButton" type="submit" value="거리 우선 추천">
                </form>
                <form action="/recommendPage/list/grade" method="POST">
                    <input type="hidden" name="cafe1" id="cafe111" value="">
                    <input type="hidden" name="cafe2" id="cafe222" value="">
                    <input type="hidden" name="cafe3" id="cafe333" value="">
                    <input type="hidden" name="title" value="${title}">
                    <input class="mapButton" type="submit" value="순위 우선 추천">
                </form>
                <script>
                var cafe1 = ${JSON.stringify(cafe1)};
                var cafe2 = ${JSON.stringify(cafe2)};
                var cafe3 = ${JSON.stringify(cafe3)};
    
                $("#cafe1").val(JSON.stringify(cafe1));
                $("#cafe2").val(JSON.stringify(cafe2));
                $("#cafe3").val(JSON.stringify(cafe3));

                $("#cafe11").val(JSON.stringify(cafe1));
                $("#cafe22").val(JSON.stringify(cafe2));
                $("#cafe33").val(JSON.stringify(cafe3));

                $("#cafe111").val(JSON.stringify(cafe1));
                $("#cafe222").val(JSON.stringify(cafe2));
                $("#cafe333").val(JSON.stringify(cafe3));
            </script>
                <div style="width:100%; overflow-x: auto; padding: 0px;  white-space : nowrap;">
                <Priority>
            `;
            var i = 0;
            while(i<s_cafe1.length){
                if(i%5===0){html+=`<br>`;}
                const tastearr = s_cafe1[i].cafe_bean.split("/");
                var scope=s_cafe1[i].scope*20;
                html+=`
                <div class="listdiv">
                      <div class="list_name"> <a href="" style="text-decoration:none"> ${s_cafe1[i].cafe_name}</a>
                          <div class="list_Rank">1순위</div>
                      </div>
                      <div class="list_address">주소 : <br>
                          ${s_cafe1[i].cafe_location} </div>
                      <div class="list_distance">거리 : ${s_cafe1[i].cafe_distance}m</div>
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
                      <div class="list_radarchart"><canvas id="radar-chart${s_cafe1[i].cafe_id}" width="250" height="250"></div>
                      <div style="display: inline-block;  margin-top: 10px; margin-left: 10px;">
                        <form id="${s_cafe1[i].cafe_id}" name="cform" action="/mypage/view_cafe/recommend" method="POST">
                        <input type="hidden" name="cafe_id" value="${s_cafe1[i].cafe_id}">
                        </form>
                        <a href="#" onclick="javascript:$('#${s_cafe1[i].cafe_id}').submit();" style="font-size: 18px;">자세히 보기</a>
                      </div>
                      <form action="/mypage/visit_cafe" method="POST">
                        <input type="hidden" name="cafe_id" value="${s_cafe1[i].cafe_id}">
                        <input class="button2" type="submit" value="Visit & Finish">
                      </form>
                      </div>
                      <script>
                      new Chart(document.getElementById("radar-chart${s_cafe1[i].cafe_id}"), {
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
            while(i<s_cafe2.length){
                if(i%5===0){html+=`<br>`;}
                const tastearr = s_cafe2[i].cafe_bean.split("/");
                var scope=s_cafe2[i].scope*20;
                html+=`
                <div class="listdiv">
                      <div class="list_name"> <a href="" style="text-decoration:none"> ${s_cafe2[i].cafe_name}</a>
                          <div class="list_Rank">2순위</div>
                      </div>
                      <div class="list_address">주소 : <br>
                          ${s_cafe2[i].cafe_location} </div>
                      <div class="list_distance">거리 : ${s_cafe2[i].cafe_distance}m</div>
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
                      <div class="list_radarchart"><canvas id="radar-chart${s_cafe2[i].cafe_id}" width="250" height="250"></div>
                      <div style="display: inline-block;  margin-top: 10px; margin-left: 10px;">
                        <form id="${s_cafe2[i].cafe_id}" name="cform" action="/mypage/view_cafe/recommend" method="POST">
                        <input type="hidden" name="cafe_id" value="${s_cafe2[i].cafe_id}">
                        </form>
                        <a href="#" onclick="javascript:$('#${s_cafe2[i].cafe_id}').submit();" style="font-size: 18px;">자세히 보기</a>
                      </div>
                      <form action="/mypage/visit_cafe" method="POST">
                        <input type="hidden" name="cafe_id" value="${s_cafe2[i].cafe_id}">
                        <input class="button2" type="submit" value="Visit & Finish">
                      </form>
                </div>
                <script>
                new Chart(document.getElementById("radar-chart${s_cafe2[i].cafe_id}"), {
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

            if(s_cafe1.length===0 && s_cafe2.length===0){
                i = 0;
                while(i<s_cafe3.length){
                    if(i%5===0){html+=`<br>`;}
                    const tastearr = s_cafe3[i].cafe_bean.split("/");
                    var scope=s_cafe3[i].scope*20;
                    html+=`
                    <div class="listdiv">
                          <div class="list_name"> <a href="" style="text-decoration:none"> ${s_cafe3[i].cafe_name}</a>
                              <div class="list_Rank">3순위</div>
                          </div>
                          <div class="list_address">주소 : <br>
                              ${s_cafe3[i].cafe_location} </div>
                          <div class="list_distance">거리 : ${s_cafe3[i].cafe_distance}m</div>
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
                          <div class="list_radarchart"><canvas id="radar-chart${s_cafe3[i].cafe_id}" width="250" height="250"></div>
                          <div style="display: inline-block;  margin-top: 10px; margin-left: 10px;">
                            <form id="${s_cafe3[i].cafe_id}" name="cform" action="/mypage/view_cafe/recommend" method="POST">
                            <input type="hidden" name="cafe_id" value="${s_cafe3[i].cafe_id}">
                            </form>
                            <a href="#" onclick="javascript:$('#${s_cafe3[i].cafe_id}').submit();" style="font-size: 18px;">자세히 보기</a>
                          </div>
                          <form action="/mypage/visit_cafe" method="POST">
                            <input type="hidden" name="cafe_id" value="${s_cafe3[i].cafe_id}">
                            <input class="button2" type="sumbit" value="Visit & Finish">
                          </form>
                    </div>
                    <script>
                    new Chart(document.getElementById("radar-chart${s_cafe3[i].cafe_id}"), {
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

        </body>

        </html>
        `;
        return html;
    }
}