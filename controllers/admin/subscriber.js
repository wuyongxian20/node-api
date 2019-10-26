let util=require('../../utils/util')
const db=require('../../mysql/mysql.js')
var logger = require('log4js').getLogger("index");


module.exports = {

    'GET /subscriber/findByOpenid': async (ctx, next) => {
        ctx.response.type = 'application/json';
        ctx.append('Access-Control-Allow-Origin','*')
      //  ctx.response.header("Access-Control-Allow-Origin", "*");
        let openid=ctx.request.query.openid
        let sql=`select * from subscriber where openid='${openid}'` 
        await db.selectAll(sql).then(res=>{
            ctx.body = util.res(res)
        }).catch(err=>{
            ctx.body = util.err(err)
        })
    }
};