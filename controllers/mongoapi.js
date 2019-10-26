let mongo=require('../mongodb/mongo')
let util=require('../utils/util')
var logger = require('log4js').getLogger("index");
module.exports = {
    'GET /mongo/connect': async (ctx, next) => {
       // ctx.response.type = 'application/json';
        logger.info('connect before')
        let result=''
//       await mongo.connect().then(res=>{
// result=res
//       }).catch(err=>{
//         result=err
//       })
result=await mongo.connect().then(db=>{
ctx.body='ok'
}).catch(err=>{
ctx.body=err
})
// //result=JSON.stringify(result.s)
// logger.info('result',result)
//        // let result='mongodb connect'
//         ctx.response.body = {
//             res: result
//         };
        
    },

    'GET /mongo/add': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let table='tbl'
        let json={
            title:'title'+util.randomNum(),
            name:'name 01'
        }
        let result=await mongo.add(table,json)
        console.log('conn',result)
        ctx.response.body = {
            res: result
        };
    },

    'GET /mongo/findAll': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let table='tbl'
        let result=await mongo.find(table)
        console.log('conn',result)
        ctx.response.body = {
            res: result
        };
        
    },

    'GET /mongo/find': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let table='tbl'
        let json={
            title:'title01',
        }
        let result=await mongo.find(table,json)
        console.log('conn',result)
        ctx.response.body = {
            res: result
        };
        
    }
};