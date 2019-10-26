let util = require('../utils/util')
const db = require('../mysql/mysql.js')
var logger = require('log4js').getLogger("index");
let util_http = require('../utils/util_http')


module.exports = {

    /**
     * 根据数据表名查询全部
     */
    'GET /mysql/findAll': async (ctx, next) => {
        ctx.response.type = 'application/json';

        let table = ctx.request.query.table
        let sql = `select * from ${table}`
        await db.selectAll(sql).then(res => {
            ctx.body = util.res(res)
        }).catch(err => {
            ctx.body = util.err(err)
        })
    },
    /**
     * 根据数据表名和指定查询条件查询
     */
    'GET /mysql/findBy': async (ctx, next) => {
        ctx.response.type = 'application/json';
        ctx.append('Access-Control-Allow-Origin', '*')
        let table = ctx.request.body.table
        let where = ctx.request.body.where
        await db.selectBy(table, where).then(res => {
            ctx.body = util.res(res)

        }).catch(err => {
            ctx.body = util.err(err)
        })
    },
    /**
     * 根据数据表名和id查询
     */
    'GET /mysql/findById': async (ctx, next) => {
        ctx.response.type = 'application/json';
        ctx.append('Access-Control-Allow-Origin', '*')
        let table = ctx.request.query.table
        let id = ctx.request.query.id
        let sql = `select * from ${table} where id='${id}'`
        await db.selectAll(sql).then(res => {
            ctx.body = util.res(res)

        }).catch(err => {
            ctx.body = util.err(err)
        })
    },

    /**
     * 添加数据
     */
    'POST /mysql/add': async (ctx, next) => {
        // ctx.response.type = 'application/json'; 
        // ctx.res.header('Access-Control-Allow-Origin', '*');

        if (ctx.req.method == 'POST') {
            let data = await util_http.getPOSTRes(ctx.req)
            data = JSON.parse(data)
            let table = data.table
            let params = data.params
            await db.insertData(table, params).then(res => {
                ctx.body = util.res(res)
            }).catch(err => {
                ctx.body = util.err(err)
            })
        } else {
            ctx.body = util.err('请求错误')
        }


    },
    /**
     * 更新数据
     */
    'PUT /mysql/update': async (ctx, next) => {
        if (ctx.req.method == 'PUT') {
            let data = await util_http.getPOSTRes(ctx.req)
            data = JSON.parse(data)
            let table = data.table
            let sets = data.sets
            let where = data.where
           // console.log('sql', table, sets, where)
            await db.updateData(table, sets, where).then(res => {
                ctx.body = util.res(res)
            }).catch(err => {
                ctx.body = util.err(err)
            })
        } else {
            ctx.body = util.err('请求错误')
        }
    },
    // /**
    //  * 更新数据
    //  */
    // 'PATCH /mysql/patch': async (ctx, next) => {
    //     // ctx.response.type = 'application/json';
    //     console.log('patch init')
    //     ctx.body = '2222'
    //     //ctx.body=util.res('123')
    //     // console.log('request',ctx.request)
    //     // let table = ctx.request.body.table
    //     // console.log('table',table)
    //     // let sets = ctx.request.body.sets
    //     // let where = ctx.request.body.where
    //     // await db.updateData(table, sets, where).then(res => {
    //     //     ctx.body = util.res(res)
    //     // }).catch(err => {
    //     //     ctx.body = util.err(err)
    //     // })
    // },
    /**
     * 删除数据
     */
    'DELETE /mysql/delete': async (ctx, next) => {  
        let table = ctx.request.body.table
        let where = ctx.request.body.where
        await db.deleteData(table, where).then(res => {
            ctx.body = util.res(res)
        }).catch(err => {
            ctx.body = util.err(err)
        })
    },
    /**
     * 根据数据表名和id删除数据
     */
    'DELETE /mysql/deleteById': async (ctx, next) => {
        ctx.response.type = 'application/json';
        ctx.append('Access-Control-Allow-Origin', '*')
        let table = ctx.request.query.table
        let id = ctx.request.query.id
        let where = {
            id: id
        }
        await db.deleteData(table, where).then(res => {
            ctx.body = util.res(res)
        }).catch(err => {
            ctx.body = util.err(err)
        })
    }
};