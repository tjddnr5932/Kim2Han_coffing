module.exports = {
    HTML:function(title){
      return `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../css/signUp.css">
        <title>CoffingProject - ${title}</title>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
      </head>
      
      <body>
      <script type="text/javascript">
          function idcheck(){    
            var id = $('#idText').val();
            var url =  '../auth/idCheck/' + id;
            fetch(url, {method: 'POST'}).then(function(response){
              response.text().then(function(text){
                document.querySelector('idCkeck').innerHTML = text;
              });  
            });
          }
          function pwcheck(){
            var pw = $('#pw').val();
            var pw2 = $('#pw2').val();
            var url =  '../auth/pwCheck/' + pw + '/' + pw2;
            fetch(url, {method: 'POST'}).then(function(response){
              response.text().then(function(text){
                document.querySelector('pwCkeck').innerHTML = text;
              });  
            });
          }
        </script>
        <header></header>
        <main>
        
          <section>
            <form name="login" action="register_process" method="post">
              <table align="center">
                <tbody>
                  <td align="center">
                    <h1 style="margin-top: 0; padding-top: 0; border-top: 0; font-size: 80px;">Welcome!</h1>
                    아이디 확인<br>
                    <input class="inputA" type="text" id="idText" name="id" placeholder="아이디 입력" required>
                    <input class="inputB" type="button" id="idCheck" name="idCheck" value="아이디 확인" onClick="idcheck();"
                      style="background-color: #ffcb00; border: #ffcb00; font-weight: bold;">
                    <br>
                    <idCkeck>
                    </idCkeck>
                    <br><br>
                    비밀번호<br>
                    <input class="inputA" type="password" id="pw" name="pw" placeholder="비밀번호 입력" required>
                    <input class="inputB" type="button" value="." style="border: none; background: transparent;">
                    <br>
                    비밀번호 재확인<br>
                    <input class="inputA" type="password" id="pw2"name="pw2" placeholder="비밀번호 입력" required>
                    <input class="inputB" type="button" id="pwCheck" name="pwCheck" value="비밀번호 확인" onClick="pwcheck();"
                      style="background-color: #ffcb00; border: #ffcb00; font-weight: bold;">
                    <br>
                    <pwCkeck>
                    </pwCkeck>
                    <br>
                  </td>
                  <td align="center">
                    <br>
                    이름<br> <input type="text" class="inputA" name="name" value="" required> <br>
                    생년월일<br>
                    <select class="inputB" name="birth_year" required>
                      <option value="">-- 선택 --</option>
                      <option value="1950">1950</option>
                      <option value="1951">1951</option>
                      <option value="1952">1952</option>
                      <option value="1953">1953</option>
                      <option value="1954">1954</option>
                      <option value="1955">1955</option>
                      <option value="1956">1956</option>
                      <option value="1957">1957</option>
                      <option value="2058">1958</option>
                      <option value="1959">1959</option>
                      <option value="1960">1960</option>
                      <option value="1961">1961</option>
                      <option value="1962">1962</option>
                      <option value="1963">1963</option>
                      <option value="1964">1964</option>
                      <option value="1965">1965</option>
                      <option value="1966">1966</option>
                      <option value="1967">1967</option>
                      <option value="1968">1968</option>
                      <option value="1969">1969</option>
                      <option value="1970">1970</option>
                      <option value="1971">1971</option>
                      <option value="1972">1972</option>
                      <option value="1973">1973</option>
                      <option value="1974">1974</option>
                      <option value="1975">1975</option>
                      <option value="1976">1976</option>
                      <option value="1977">1977</option>
                      <option value="1978">1978</option>
                      <option value="1979">1979</option>
                      <option value="1980">1980</option>
                      <option value="1981">1981</option>
                      <option value="1982">1982</option>
                      <option value="1983">1983</option>
                      <option value="1984">1984</option>
                      <option value="1985">1985</option>
                      <option value="1986">1986</option>
                      <option value="1987">1987</option>
                      <option value="1988">1988</option>
                      <option value="1989">1989</option>
                      <option value="1990">1990</option>
                      <option value="1991">1991</option>
                      <option value="1992">1992</option>
                      <option value="1993">1993</option>
                      <option value="1994">1994</option>
                      <option value="1995">1995</option>
                      <option value="1996">1996</option>
                      <option value="1997">1997</option>
                      <option value="1998">1998</option>
                      <option value="1999">1999</option>
                      <option value="2000">2000</option>
                      <option value="2001">2001</option>
                      <option value="2002">2002</option>
                      <option value="2003">2003</option>
                      <option value="2004">2004</option>
                      <option value="2005">2005</option>
                      <option value="2006">2006</option>
                      <option value="2007">2007</option>
                      <option value="2008">2008</option>
                      <option value="2009">2009</option>
                      <option value="2010">2010</option>
                    </select>
                    <select class="inputB" name="birth_month">
                      <option value="">-- 선택 --</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>
                    <select class="inputB" name="birth_day">
                      <option value="">-- 선택 --</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                      <option value="24">24</option>
                      <option value="25">25</option>
                      <option value="26">26</option>
                      <option value="27">27</option>
                      <option value="28">28</option>
                      <option value="29">29</option>
                      <option value="30">30</option>
                      <option value="31">31</option>
                    </select>
                    <br>
                    ---------------------------------------------------<br>
                    성별<br>
                    <label for="man">남자</label>
                    <input type="radio" name="gender" value="남자" id="man">
                    <label for="woman">여자</label>
                    <input type="radio" name="gender" value="여자" id="woman"> <br>
                    ---------------------------------------------------<br>
                    <label for="age">나이</label>
                    <input class="inputB" type="number" min="1" , max="100" name="age" placholder="나이" required>
                    <br>
                    이메일<br><input class="inputA" type="email" name="user_email" placeholder="email@gmail.com" required><br>
                    휴대전화<br>
                    <input type="tel" class="inputA" name="phoneNum" placeholder="010-1234-5678" required>
      
                    <br><br>
      
                    <input class="inputA" type="submit" name="" value="회 원 가 입"
                      style="background-color: #ffcb00; border: #ffcb00; font-weight: bolder; font-size: 18px;">
                  </td>
                </tbody>
              </table>
            </form>
      
      
          </section>
      
        </main>
        <footer>
          <div>산학 프로젝트 - Coffing!</div>
          <div>김두한조 - 김성욱 김봉주 한정래</div>
        </footer>
      </body>
      
      </html>
      `;
    }
  }