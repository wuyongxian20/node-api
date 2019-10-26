const mysql = require('mysql')

const connectdb=()=>{
  let connection = mysql.createConnection({
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    password : '',
    database : 'rehab'
  }) 
  return connection;
}

module.exports=connectdb;