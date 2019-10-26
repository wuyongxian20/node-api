
let util=require('../utils/util')
const db=require('../mysql/mysql.js')
var logger = require('log4js').getLogger("index");


module.exports = {

    'GET /mysql_test/find': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let sql='select * from pets'
        await db.selectAll(sql).then(res=>{
            ctx.body = util.res(res)
               
        }).catch(err=>{
            ctx.body = util.err(err)
        })
       
    },
    'GET /mysql_test/add': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let table='pets'
        let datas={
            id:util.guid(),
            name:'name01',
            gender:1,
            birth:'2000-10-10'
        }
        await db.insertData(table,datas).then(res=>{
            ctx.body=util.res(res)
        }).catch(err=>{
            ctx.body=util.err(err)
        })
        
    },
    'GET /mysql_test/update': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let table='pets'
        let sets={
            name:'name200'
        }
        let where={
            id:'02d3e2e4-5189-4041-b559-c6c6868aad9f',
            name:'name100'
        }
        await db.updateData(table,sets,where).then(res=>{
            ctx.body=util.res(res)
        }).catch(err=>{
            ctx.body=util.err(err)
        })
        
    },
    'GET /mysql_test/delete': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let table='pets'
        let where={
            name:'name100'
        }
        await db.deleteData(table,where).then(res=>{
            ctx.body=util.res(res)
        }).catch(err=>{
            ctx.body=util.err(err)
        })
        
    }
};