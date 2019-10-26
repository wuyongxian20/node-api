let util=require('../../utils/util')
const db=require('../../mysql/mysql.js')
var logger = require('log4js').getLogger("index");


module.exports = {

    'GET /disease/findAll': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let sql='select * from disease_classify'
        await db.selectAll(sql).then(res=>{
            ctx.body = util.res(res)
               
        }).catch(err=>{
            ctx.body = util.err(err)
        })
       
    },
    'GET /disease/findById': async (ctx, next) => {
       
        ctx.response.type = 'application/json';
        console.log('--request',ctx.request)
        let id=ctx.request.query.id
       
       // let sql='select * from pets where id="'+id+'"'
       let sql=`select * from disease_classify where id='${id}'`
      
        await db.selectAll(sql).then(res=>{
            ctx.body = util.res(res)
               
        }).catch(err=>{
            ctx.body = util.err(err)
        })
       
    },
    'POST /disease/add': async (ctx, next) => {
        console.log('add sql')
        ctx.response.type = 'application/json';
        
        let table='disease_classify'

        let params=ctx.request.body.params
        
        console.log('params',params)
        await db.insertData(table,params).then(res=>{
            ctx.body=util.res(res)
        }).catch(err=>{
            ctx.body=util.err(err)
        })
        
    },
    'PUT /disease/update': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let table='disease_classify'

        let sets=ctx.request.body.sets
        let where=ctx.request.body.where
        await db.updateData(table,sets,where).then(res=>{
            ctx.body=util.res(res)
        }).catch(err=>{
            ctx.body=util.err(err)
        })
        
    },
    'DELETE /disease/delete': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let table='disease_classify'
        // let where={
        //     name:'name100'
        // }
        let  where=ctx.request.body.where
        await db.deleteData(table,where).then(res=>{
            ctx.body=util.res(res)
        }).catch(err=>{
            ctx.body=util.err(err)
        })
        
    }
};