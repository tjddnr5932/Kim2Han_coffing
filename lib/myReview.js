module.exports={
    HTML:function(cafe_name, cafe_location, id, scope, body, sweet, acidity, bitterness, balance, comment){
        return`
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="../css/myReview.css">

            <title>Coffing-리뷰쓰기</title>
        </head>

        <body>
            <header></header>
            <center>
                <main>
                    <div class="카페 이름">${cafe_name}</div>
                    <div class="카페 주소">${cafe_location}</div>
                    <div class="">${id}님의 리뷰</div>
                    <div style="border: 1px solid black;">여기엔 radar chart<canvas id="radar-chart" width="250" height="250"></canvas></div>           
                    <div class="리뷰">
                        <div class="개인의맛평가도">Body : ${body}, Sweet : ${sweet}, Acidity : ${acidity}, Bitterness : ${bitterness}, Balance : ${balance}</div>
                        <div class="카페 별점">별점 : ${scope}</div>     
                        <div><<--코멘트-->></div>
                        <div class="개인의리뷰">${comment}</div>
                    </div>
                </main>
            </center>
            <footer></footer>
        
        </body>

        </html>
        `;
    }
}