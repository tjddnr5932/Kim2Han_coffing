module.exports={
    HTML:function(cafe_name, cafe_location, id, scope, body, sweet, acidity, bitterness, balance, comment, ubody, usweet, uacidity, ubitterness, ubalance){
        return`
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="../css/myReview.css">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
            <title>Coffing-나의 리뷰</title>
        </head>

        <body>
            <header></header>
            <center>
                <main>
                    <div class="카페 이름"><h1>${cafe_name}</h1></div>
                    <div class="카페 주소">${cafe_location}</div>
                    <div class="">${id}님의 리뷰</div>
                    <div style="border: 1px solid black;"><canvas id="radar-chart" style="width:540px; height:540px; display: block;" width="540px" height="540px"></canvas></div>           
                    <div><<--별점-->></div>
                    <div class="star-ratings">
                        <div class="star-ratings" style="float: right;">
                            <div class="star-ratings-fill space-x-2 text-lg" style="width: ${scope*20}%;">
                                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                            </div>
                            <div class="star-ratings-base space-x-2 text-lg">
                                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                            </div>
                        </div>  
                    </div><br><br>
                    <div clasee="comment">
                    <div><<--코멘트-->></div>
                    <div class="개인의리뷰">${comment}</div>
                    </div>
                </main>
            </center>
            <footer></footer>
            <script>
            new Chart(document.getElementById("radar-chart"), {
                type: 'radar',
                data: {
                    labels: ["Acidity", "Body", "Balance", "Bitterness", "Sweet"],
                    datasets: [{
                        label: "현재 설정된 맛",
                        fill: true,
                        backgroundColor: "rgba(179,181,198,0.2)",
                        borderColor: "rgba(179,181,198,1)",
                        pointBorderColor: "#fff",
                        pointBackgroundColor: "rgba(179,181,198,1)",
                        data: [${uacidity}, ${ubody}, ${ubalance}, ${ubitterness}, ${usweet}]
                    },{
                        label: "내가 쓴 리뷰",
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
                            beginAtZero: true,
                            max:5
                        },
                        pointLabels: {
                            fontSize: 20
                        },
                    },

                }
            });
        </script>
        </body>

        </html>
        `;
    }
}