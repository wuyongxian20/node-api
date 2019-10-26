const conn = require('./config/index');
const connection = conn();

// 查询所有数据
let selectAll = async(sql,callback)=>{
  return sqlQuery(sql)
}
let selectBy = async(table,where,callback)=>{
    var _WHERE='';
    // var keys='';
    // var values='';
    for(var k2 in where){
        _WHERE+=k2+"='"+where[k2]+"' AND ";
      //_WHERE+= k2+"='"+where[k2]+"'";
    }
    _WHERE=_WHERE.slice(0,-5)
    // UPDATE user SET Password='321' WHERE UserId=12
    //update table set username='admin2',age='55'   where id="5";
    var sql="SELECT * FROM "+table+' WHERE '+_WHERE;
   // console.log(sql);
    return sqlQuery(sql)
}
// 插入一条数据
let insertData =async (table,datas,callback)=>{
  var fields='';
  var values='';
  for( var k in datas){
      fields+=k+',';
      values=values+"'"+datas[k]+"',"
  }
  fields=fields.slice(0,-1);
  values=values.slice(0,-1);
 // console.log(fields,values);
  var sql="INSERT INTO "+table+'('+fields+') VALUES('+values+')';
  return sqlQuery(sql)
}

/**
 * 更新一条数据
 * @param {*} table 数据表名
 * @param {*} sets 更新字段
 * @param {*} where 限制条件
 */
let updateData=async function(table,sets,where){
    var _SETS='';
    var _WHERE='';
    var keys='';
    var values='';
    for(var k in sets){
        _SETS+=k+"='"+sets[k]+"',";
    }
    _SETS=_SETS.slice(0,-1);
    for(var k2 in where){
        _WHERE+=k2+"='"+where[k2]+"' AND ";
      //_WHERE+= k2+"='"+where[k2]+"'";
    }
    _WHERE=_WHERE.slice(0,-5)
    // UPDATE user SET Password='321' WHERE UserId=12
    //update table set username='admin2',age='55'   where id="5";
    var sql="UPDATE "+table+' SET '+_SETS+' WHERE '+_WHERE;
   // console.log(sql);
    return sqlQuery(sql)
}

// 删除一条数据
let deleteData=function(table,where,callback){
    var _WHERE='';
    for(var k2 in where){
       _WHERE+=k2+"='"+where[k2]+"' AND ";
      //_WHERE+= k2+"="+where[k2];
    }
    _WHERE=_WHERE.slice(0,-5)
    // DELETE  FROM user WHERE UserId=12  注意UserId的数据类型要和数据库一致
    var sql="DELETE  FROM "+table+' WHERE '+_WHERE;
   // connection.query(sql,callback);
    return sqlQuery(sql)
}

let sqlQuery=function(sql){
  return new Promise((resolve,reject)=>{
    connection.query(sql,(err,result)=>{
      if(err){
          console.log('错误信息-',err.sqlMessage);
          let errNews = err.sqlMessage;
          reject(errNews)
      } else{
        resolve(result)
      }
    })
  })
}
module.exports = {
  selectAll,
  selectBy,
  insertData,
  deleteData,
  updateData,
}
