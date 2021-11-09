var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'zjvld1234!',
  database : 'coffing_database'
});
 
connection.connect();
 
connection.query('SELECT * from user', function (error, results, fields) {
  if (error) {
    console.log('에러 발생');
  }
  console.log(results);
});
 
connection.end();